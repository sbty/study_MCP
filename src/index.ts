import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// サーバーの初期化
const server = new Server(
  {
    name: "study-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {},
  }
);

// サーバー起動処理
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Study MCP Server running on stdio"); // stdioを使用するため、ログは必ずstderrに出力します
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
