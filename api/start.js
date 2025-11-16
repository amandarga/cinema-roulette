import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: "ID do filme não fornecido" });
    return;
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    await notion.pages.update({
      page_id: id,
      properties: {
        Status: {
          status: {
            name: "Assistindo",
          },
        },
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Erro ao atualizar status:", error);
    console.error("Stack:", error.stack);
    res.status(500).json({ 
      error: "Erro ao atualizar status",
      message: error.message
    });
  }
}