#!/usr/bin/env node
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const [source, confirmed, ...roots] = process.argv.slice(2)

if (!source || !confirmed) {
  console.error('用法：node scripts/replace-unconfirmed-term.mjs "English Source" "确认译名" [路径...]')
  process.exit(1)
}

const searchRoots = roots.length > 0 ? roots : ['games']
const prefix = `[[待定译名:${source}|`

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

function replaceConfirmedTerm(text) {
  let result = ''
  let cursor = 0
  let count = 0

  while (true) {
    const start = text.indexOf(prefix, cursor)
    if (start === -1) break

    const end = text.indexOf(']]', start + prefix.length)
    if (end === -1) break

    result += text.slice(cursor, start) + confirmed
    cursor = end + 2
    count += 1
  }

  return { text: result + text.slice(cursor), count }
}

let replacements = 0
for (const root of searchRoots) {
  for await (const file of markdownFiles(root)) {
    const before = await readFile(file, 'utf8')
    const replaced = replaceConfirmedTerm(before)

    if (replaced.count > 0) {
      await writeFile(file, replaced.text)
      replacements += replaced.count
      console.log(`${file}\t${replaced.count}`)
    }
  }
}

console.log(`共替换 ${replacements} 处。`)
