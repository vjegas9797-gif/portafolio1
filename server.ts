import express from "express";
import { Client } from "@notionhq/client";
import path from "path";

const notion = new Client({ auth: process.env.NOTION_API_KEY || "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" });
const PAGE_ID = process.env.NOTION_PORTFOLIO_PAGE_ID || "33b7b6560b58806aba2be02bda483b4b";

// Helper to extract texts
function extractRichText(richTextArray: any[]) {
  if (!richTextArray) return "";
  return richTextArray.map((t: any) => t.plain_text).join("");
}

async function getBlocksData(blockId: string) {
  const response = await notion.blocks.children.list({ block_id: blockId });
  const blocks = response.results;
  
  return blocks.map((block: any) => {
    switch (block.type) {
      case "paragraph": return { type: "p", text: extractRichText(block.paragraph.rich_text) };
      case "heading_1": return { type: "h1", text: extractRichText(block.heading_1.rich_text) };
      case "heading_2": return { type: "h2", text: extractRichText(block.heading_2.rich_text) };
      case "heading_3": return { type: "h3", text: extractRichText(block.heading_3.rich_text) };
      case "bulleted_list_item": return { type: "li", text: extractRichText(block.bulleted_list_item.rich_text) };
      case "divider": return { type: "hr" };
      case "video": return { type: "video", url: block.video.file?.url || block.video.external?.url };
      case "image": return { type: "image", url: block.image.file?.url || block.image.external?.url };
      default: return { type: "unsupported", originalType: block.type };
    }
  }).filter((b: any) => b.type !== "unsupported" && (b.text !== "" || b.type === "hr" || b.type === "video" || b.type === "image"));
}

const app = express();

// Cache data so we don't hit rate limits on every reload
let notionCache: any = null;
let lastFetch = 0;

// Register API route SYNCHRONOUSLY
app.get("/api/notion-data", async (req, res) => {
  try {
    if (req.query.refresh === 'true') {
      notionCache = null;
    }

    const portafolioChildren = await notion.blocks.children.list({ block_id: PAGE_ID });
    const pages = portafolioChildren.results.filter((b: any) => b.type === "child_page");
    const result: Record<string, any> = {};

    for (const pageBlock of pages) {
      const title = (pageBlock as any).child_page.title.toLowerCase();
      const pageId = pageBlock.id;
      
      if (title.includes("inicio")) {
        result.inicio = await getBlocksData(pageId);
      } else if (title.includes("sobre mi") || title.includes("sobre_mi")) {
        result.sobre_mi = await getBlocksData(pageId);
      } else if (title.includes("contacto") || title.includes("contact")) {
        result.contacto = await getBlocksData(pageId);
      } else if (title.includes("proyecto")) {
        const projectsBlocks = await notion.blocks.children.list({ block_id: pageId });
        const projectPages = projectsBlocks.results.filter((b: any) => b.type === "child_page");
        
        result.proyectos = [];
        for (const proj of projectPages) {
          const projId = proj.id;
          const projTitle = (proj as any).child_page.title;
          const projData = await getBlocksData(projId);
          
          const pageMetadata = await notion.pages.retrieve({ page_id: projId }) as any;
          const coverUrl = pageMetadata.cover?.file?.url || pageMetadata.cover?.external?.url || null;

          result.proyectos.push({ id: projId, title: projTitle, data: projData, cover: coverUrl });
        }
      }
    }

    notionCache = result;
    lastFetch = Date.now();
    res.json({ status: "success", data: result });
  } catch (error: any) {
    console.error("Notion API Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== "production") {
    // Dynamic import to prevent crash on Vercel
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
