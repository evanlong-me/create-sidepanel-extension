#!/usr/bin/env node
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { downloadTemplate } from 'giget'

// Env override exists so forks can point the CLI at their own repo.
const REPO =
  process.env.CREATE_SIDEPANEL_EXTENSION_REPO ||
  'gh:evanlong-me/create-sidepanel-extension'

const FRAMEWORKS = [
  { id: 'wxt', label: 'WXT', hint: 'Vite-based, multi-browser' },
  { id: 'plasmo', label: 'Plasmo', hint: 'React-first, batteries included' }
]

const toPackageName = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[._-]+/, '')
    .replace(/-+/g, '-')

function parseArgs(argv) {
  let name, framework
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '-f' || arg === '--framework') framework = argv[++i]
    else if (arg.startsWith('--framework=')) framework = arg.slice('--framework='.length)
    else if (!arg.startsWith('-') && !name) name = arg
  }
  return { name, framework }
}

async function main() {
  const argv = process.argv.slice(2)
  if (argv.includes('-h') || argv.includes('--help')) {
    console.log(`Usage: create-sidepanel-extension [name] [--framework <wxt|plasmo>]

Scaffold a browser sidepanel extension with Tailwind CSS + shadcn/ui.

Options:
  -f, --framework   Extension framework: ${FRAMEWORKS.map((f) => f.id).join(', ')}
  -h, --help        Show this help`)
    return
  }

  let { name, framework } = parseArgs(argv)
  const rl = createInterface({ input: stdin, output: stdout })

  if (!name) name = (await rl.question('Project name: ')).trim()

  if (!framework) {
    console.log('Framework:')
    FRAMEWORKS.forEach((f, i) => console.log(`  ${i + 1}) ${f.label} — ${f.hint}`))
    const answer = (await rl.question(`Choose [1-${FRAMEWORKS.length}] (default 1): `)).trim()
    framework = FRAMEWORKS[Number(answer) - 1]?.id ?? answer
  }
  rl.close()

  const pkgName = toPackageName(name)
  if (!pkgName) {
    console.error('✖ Project name is required (letters, numbers, "-", "_", ".").')
    process.exit(1)
  }

  const tpl = FRAMEWORKS.find((f) => f.id === framework.trim().toLowerCase())
  if (!tpl) {
    console.error(
      `✖ Unknown framework "${framework}". Available: ${FRAMEWORKS.map((f) => f.id).join(', ')}`
    )
    process.exit(1)
  }

  const dir = path.resolve(process.cwd(), pkgName)
  if (existsSync(dir) && (await fs.readdir(dir)).length > 0) {
    console.error(`✖ Directory "${pkgName}" already exists and is not empty.`)
    process.exit(1)
  }

  console.log(`▸ Downloading ${tpl.label} template...`)
  await downloadTemplate(`${REPO}/templates/${tpl.id}`, { dir })

  const pkgPath = path.join(dir, 'package.json')
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'))
  pkg.name = pkgName
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  console.log(`✔ Created ${pkgName} (${tpl.label} + Tailwind CSS + shadcn/ui) at ${dir}

Next steps:
  cd ${pkgName}
  pnpm install
  pnpm dev

Then load the generated extension in chrome://extensions (Developer mode → Load unpacked).`)
}

main().catch((err) => {
  console.error(`✖ ${err.message}`)
  process.exit(1)
})
