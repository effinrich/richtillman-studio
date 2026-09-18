import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { loadConfig } from "./config.js"
import { createTools } from "./tools.js"

type Tools = ReturnType<typeof createTools>

function isKnownTool(tools: Tools, name: string): name is keyof Tools {
  return Object.hasOwn(tools, name)
}

export async function startStorybookMcp(metaUrl: string): Promise<void> {
  const { repoRoot, config } = loadConfig(metaUrl)
  const tools = createTools({ repoRoot, config })
  const server = new Server(
    {
      name: "@richtillman/storybook-mcp",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    },
  )

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: Object.entries(tools).map(([name, tool]) => ({
      name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }))

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const name = request.params.name
    if (!isKnownTool(tools, name)) {
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      }
    }
    return tools[name].handler(request.params.arguments)
  })

  const transport = new StdioServerTransport()
  await server.connect(transport)
}
