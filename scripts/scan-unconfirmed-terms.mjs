#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const roots = process.argv.slice(2)
const searchRoots = roots.length > 0 ? roots : ['games']
const placeholder = /\[\[待定译名:([^|\[\]]+)\|([^\[\]]+)\]\]/g

async function* markdownFiles(root) {
  let info
  try {
    info = await stat(root)
  } catch {
    return
  }

  if (info.isFile()) {
    if (root.endsWith('.md')) yield root
    return
  }

  if (!info.isDirectory()) return

  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.vitepress' || entry.name === '.git') continue
    const fullPath = join(root, entry.name)
    if (entry.isDirectory()) yield* markdownFiles(fullPath)
    if (entry.isFile() && entry.name.endsWith('.md')) yield fullPath
  }
}

let count = 0
for (const root of searchRoots) {
  for await (const file of markdownFiles(root)) {
    const text = await readFile(file, 'utf8')
    const lines = text.split(/\r?\n/)
    lines.forEach((line, index) => {
      for (const match of line.matchAll(placeholder)) {
        count += 1
        console.log(`${file}:${index + 1}\t${match[1]}\t${match[2]}`)
      }
    })
  }
}

if (count > 0) {
  console.log(`\n共 ${count} 个未定译名占位。`)
} else {
  console.log('未发现未定译名占位。')
}


