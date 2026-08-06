# Sidepanel Extension Template (Plasmo)

A modern browser extension template with sidepanel support, built with Plasmo + Tailwind CSS 4.0 + shadcn/ui.

## Features

- 🖥️ **Sidepanel Interface** - Click extension icon to open browser sidepanel
- ⚡ **Plasmo Framework** - Batteries-included browser extension framework
- ⚛️ **React** - Modern UI framework with TypeScript support
- 🎨 **Tailwind CSS 4.0** - Latest utility-first CSS framework (via `@tailwindcss/postcss`)
- 🛠️ **shadcn/ui Ready** - Pre-configured for beautiful, accessible React components
- 🌙 **Theme Management** - System/Light/Dark theme support
- 💾 **Local Storage** - Persistent settings with `@plasmohq/storage` (`useStorage` hook)
- ⚙️ **Runtime Configuration** - Build-time config via `PLASMO_PUBLIC_*` env vars
- 🔧 **TypeScript** - Full type safety and developer experience
- 🎯 **Modern Development** - Hot reload, modern build tools

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

**Option A: CLI (recommended)**

```bash
npm create sidepanel-extension@latest my-extension
# or
pnpm create sidepanel-extension my-extension

cd my-extension
```

**Option B: GitHub template**

Click **Use this template** → **Create a new repository** on the
[repository page](https://github.com/evanlong-me/sidepanel-extension-template),
then clone your new repo. Or clone this repo directly:

```bash
git clone https://github.com/evanlong-me/sidepanel-extension-template.git my-extension
cd my-extension
```

**Then:**

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development**
   ```bash
   pnpm dev
   ```

3. **Load extension in browser**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked extension"
   - Select the `build/chrome-mv3-dev` folder

### Usage

1. Click the extension icon in the browser toolbar
2. The sidepanel will open on the right side
3. Start customizing the template for your needs

## Project Structure

```
sidepanel-extension-plasmo-template/
├── background.ts          # Background service worker
├── content.ts             # Content script (optional)
├── sidepanel/             # Sidepanel UI entry
│   ├── index.tsx          # Sidepanel page (Plasmo auto-generates sidepanel.html)
│   └── App.tsx            # Main React app
├── components/            # React components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
│   ├── utils.ts           # Common utilities (cn)
│   └── config.ts          # Runtime configuration (PLASMO_PUBLIC_* env vars)
├── hooks/                 # Custom React hooks
│   ├── use-theme.ts       # Theme management hook
│   └── use-settings.ts    # Settings storage hook (@plasmohq/storage)
├── assets/                # Static assets
│   ├── icon.png           # Extension icon (Plasmo auto-generates all sizes)
│   └── tailwind.css       # Tailwind CSS 4.0 entry (shadcn/ui theme variables)
├── .env.example           # Example PLASMO_PUBLIC_* environment variables
├── components.json        # shadcn/ui configuration
├── postcss.config.mjs     # PostCSS config (@tailwindcss/postcss)
├── tsconfig.json          # TypeScript configuration (~/* import alias)
└── package.json           # Dependencies, scripts and manifest overrides
```

Plasmo uses the project root as the source directory (or `src/` if it exists).
File names are conventions: `background.ts`, `content.ts`, `sidepanel/index.tsx`
are picked up automatically and written into the generated manifest.

## Adding shadcn/ui Components

This template is pre-configured for shadcn/ui. To add components:

```bash
# Example: Add a button component
pnpm dlx shadcn@latest add button

# Example: Add a dialog component
pnpm dlx shadcn@latest add dialog
```

The components will be automatically added to `components/ui/` with proper styling.

## Development Commands

```bash
# Development mode with hot reload (Chrome MV3 by default)
pnpm dev

# Build for production (outputs to build/chrome-mv3-prod)
pnpm build

# Create a zip bundle for store submission
pnpm package

# Type checking
pnpm compile
```

For other targets use Plasmo's `--target` flag, e.g. `plasmo dev --target=firefox-mv2`.
See the [Plasmo docs](https://docs.plasmo.com/framework/workflows/build) for details.

## Customization

### Styling

- Edit `assets/tailwind.css` for global styles and theme variables
- Tailwind CSS 4.0 is wired through PostCSS in `postcss.config.mjs` — no `tailwind.config.js` needed
- Modify component aliases in `components.json` (imports use the `~/*` alias, resolved to the project root)

### Extension Configuration

- Update manifest permissions/metadata via the `manifest` field in `package.json`
- Replace `assets/icon.png` — Plasmo generates all required icon sizes from it
- Add `PLASMO_PUBLIC_*` variables in `.env` (see `.env.example`) and read them in `lib/config.ts`

### Sidepanel Content

- Edit `sidepanel/App.tsx` for main UI
- Add new routes/pages as needed
- Extend with additional React components

## Browser Support

- ✅ **Chrome** (Manifest V3) - default target
- ✅ **Edge, Brave, Opera** (Chromium, Manifest V3) - same build output
- ⚠️ **Firefox / Safari** - build with `--target=firefox-mv2` / `--target=safari-mv3`; note the Side Panel API is Chrome-specific, so the sidepanel entry needs a fallback there

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License - feel free to use this template for your projects!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using [Plasmo](https://www.plasmo.com), [Tailwind CSS](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com)
