import { Client } from "@notionhq/client";

const notion = new Client({ auth: "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" });
const PROJECT_PAGE_ID = "33b7b656-0b58-800f-9e1c-edeaacb7186e"; // Carro seguidor de linea

async function main() {
  try {
    const projChildren = await notion.blocks.children.list({
      block_id: PROJECT_PAGE_ID,
    });
    
    console.log(JSON.stringify(projChildren, null, 2));
  } catch(e) {
    console.log(e);
  }
}

main();
