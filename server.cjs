require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { Client } = require("@notionhq/client");

const app = express();
app.use(cors());
app.use(express.json());

// Validar variáveis de ambiente
if (!process.env.NOTION_API_KEY) {
  console.error("❌ ERRO: NOTION_API_KEY não encontrada no .env");
  process.exit(1);
}

if (!process.env.NOTION_DATABASE_ID) {
  console.error("❌ ERRO: NOTION_DATABASE_ID não encontrada no .env");
  process.exit(1);
}

console.log("✅ Variáveis de ambiente carregadas:");
console.log(`   NOTION_API_KEY: ${process.env.NOTION_API_KEY.substring(0, 10)}...`);
console.log(`   DATABASE_ID: ${process.env.NOTION_DATABASE_ID.substring(0, 10)}...`);

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// Debug: verificar se o client foi criado corretamente
console.log("🔍 Debug do Notion Client:");
console.log(`   notion é do tipo: ${typeof notion}`);
console.log(`   notion.databases existe? ${!!notion.databases}`);
if (notion.databases) {
  console.log(`   notion.databases.query existe? ${typeof notion.databases.query}`);
  console.log("   Métodos disponíveis em notion.databases:");
  console.log("   ", Object.keys(notion.databases));
  console.log("   Todos os métodos (incluindo herdados):");
  const allMethods = [];
  for (let key in notion.databases) {
    if (typeof notion.databases[key] === 'function') {
      allMethods.push(key);
    }
  }
  console.log("   ", allMethods);
} else {
  console.error("❌ ERRO: notion.databases é undefined!");
  console.log("   Propriedades disponíveis:", Object.keys(notion));
}

// 1) Buscar filmes com Status = "Assistir"
app.get("/api/movies", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Assistir",
        },
      },
    });

    console.log("📊 Resposta do Notion:");
    console.log(`   Total de resultados: ${response.results.length}`);
    
    if (response.results.length === 0) {
      console.log("   ⚠️ Nenhum filme encontrado com Status = 'Assistir'");
      console.log("   Tentando buscar TODOS os filmes (sem filtro) para debug...");
      
      const allResponse = await notion.databases.query({
        database_id: databaseId,
      });
      
      console.log(`   Total de filmes no database: ${allResponse.results.length}`);
      if (allResponse.results.length > 0) {
        const firstPage = allResponse.results[0];
        console.log("   Propriedades do primeiro filme:");
        console.log("   ", Object.keys(firstPage.properties));
        console.log("   Status do primeiro filme:");
        console.log("   ", JSON.stringify(firstPage.properties.Status, null, 2));
      }
    }

    const movies = response.results
      .map((page) => {
        const titleProp = page.properties["Title"];
        const title =
          titleProp?.title?.[0]?.plain_text ?? "Sem título";

        const escolhidoPorProp = page.properties["Escolhido por"];
        const escolhidoPor =
          escolhidoPorProp?.select?.name ?? "Desconhecido";

        return {
          id: page.id,
          title,
          escolhidoPor,
        };
      })
      .filter((m) => m.title && m.title.trim().length > 0);

    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes no Notion:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// 2) Atualizar um filme para Status = "Assistindo"
app.post("/api/start", async (req, res) => {
  const pageId = req.query.id;

  if (!pageId) {
    res.status(400).json({ error: "ID do filme não fornecido" });
    return;
  }

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Status: {
          status: {
            name: "Assistindo",
          },
        },
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar status no Notion:", error);
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`API do Notion rodando em http://localhost:${port}`);
});