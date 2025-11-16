const { Client } = require("@notionhq/client");

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTION_DATABASE_ID;

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Assistir",
        },
      },
    });

    const movies = response.results
      .map((page) => {
        const titleProp = page.properties["Title"];
        const title = titleProp?.title?.[0]?.plain_text ?? "Sem título";

        const escolhidoPorProp = page.properties["Escolhido por"];
        const escolhidoPor = escolhidoPorProp?.select?.name ?? "Desconhecido";

        return {
          id: page.id,
          title,
          escolhidoPor,
        };
      })
      .filter((m) => m.title && m.title.trim().length > 0);

    res.status(200).json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes no Notion:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};