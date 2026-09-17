#!/usr/bin/env node
import { startStorybookMcp } from "./index.js"

await startStorybookMcp(import.meta.url)
