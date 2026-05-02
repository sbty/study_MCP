import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// サーバーの初期化
const server = new Server(
  {
    name: "study-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {}, // リソース機能を使用することを宣言
      prompts: {},   // プロンプト機能を使用することを宣言
    },
  }
);

// --- Resources (リソース) の実装 ---
// クライアント（Inspector等）に、どんなリソースがあるか一覧を教える
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "study://mcp/greeting",
        name: "Greeting Message",
        mimeType: "text/plain",
        description: "MCP学習用の挨拶メッセージ",
      },
    ],
  };
});

// クライアントから要求された特定のリソースの中身を返す
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "study://mcp/greeting") {
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "text/plain",
          text: "Hello, MCP World! これはMCPサーバーから提供されたリソース（静的データ）です。",
        },
      ],
    };
  }

  throw new Error("リソースが見つかりません: " + request.params.uri);
});
// -----------------------------------

// --- Prompts (プロンプト) の実装 ---
// クライアントに、どんなプロンプト（テンプレート）があるか一覧を教える
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "code_review",
        description: "コードレビューを依頼するためのプロンプトテンプレート",
        arguments: [
          {
            name: "language",
            description: "プログラミング言語 (例: TypeScript, Python)",
            required: true,
          },
        ],
      },
    ],
  };
});

// クライアントから要求されたプロンプトの具体的なメッセージを生成して返す
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === "code_review") {
    const lang = request.params.arguments?.language || "不明な言語";
    return {
      description: "コードレビュー用プロンプト",
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `あなたは熟練の ${lang} エンジニアです。以下のコードをレビューし、パフォーマンスの改善点やバグの可能性を指摘してください。\n\n\`\`\`${lang}\n// ここにコードを貼り付けます\n\`\`\``,
          },
        },
      ],
    };
  }

  throw new Error("プロンプトが見つかりません: " + request.params.name);
});
// -----------------------------------

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
