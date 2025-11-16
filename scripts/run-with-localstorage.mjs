#!/usr/bin/env node

import { spawn } from "node:child_process"
import { mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"

const cliArgs = process.argv.slice(2)
const command = cliArgs[0] ?? "next"
const commandArgs = cliArgs.length > 0 ? cliArgs.slice(1) : ["dev"]

const localStoragePath = resolve(process.cwd(), ".next/node-localstorage.json")
mkdirSync(dirname(localStoragePath), { recursive: true })

const optionPattern = /(^|\s)--localstorage-file(\s|=)/
const env = { ...process.env }
env.NODE_OPTIONS = env.NODE_OPTIONS?.trim() ?? ""

if (!optionPattern.test(env.NODE_OPTIONS)) {
  const prefix = env.NODE_OPTIONS ? `${env.NODE_OPTIONS} ` : ""
  env.NODE_OPTIONS = `${prefix}--localstorage-file=${localStoragePath}`
}

const child = spawn(command, commandArgs, {
  stdio: "inherit",
  env,
  shell: true,
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
  } else {
    process.exit(code ?? 0)
  }
})

child.on("error", (error) => {
  console.error(error)
  process.exit(1)
})
