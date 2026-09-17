import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { loadConfig } from "./config.js"
import { createTools } from "./tools.js"

export async function startStorybookMcp(metaUrl: string): Promise<void> {
  const { repoRoot, config } = loadConfig(metaUrl)
  const tools = createTools({ repoRoot, config })
  const server = new Server(
    {
      name: "@richtillman/mcp-storybook",
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
    const tool = Object.hasOwn(tools, name)
      ? tools[name as keyof typeof tools]
      : undefined
    if (!tool) {
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      }
    }
    return tool.handler(request.params.arguments)
  })

  const transport = new StdioServerTransport()
  await server.connect(transport)
}
