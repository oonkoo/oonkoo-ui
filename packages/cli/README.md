# oonkoo

CLI for installing [OonkooUI](https://oonkoo.dev) components into your React projects.

## Installation

```bash
npx oonkoo init
```

Or install globally:

```bash
npm install -g oonkoo
```

## Usage

### Initialize your project

```bash
npx oonkoo init
```

This creates an `oonkoo.config.json` file with your project settings.

### Authenticate

```bash
# Browser-based login (recommended)
npx oonkoo auth

# Or use API key
npx oonkoo auth --api-key

# Logout
npx oonkoo auth --logout
```

Browser-based login opens your browser for secure authentication via OAuth. API key authentication requires creating a key at [oonkoo.dev/settings/api-keys](https://oonkoo.dev/settings/api-keys).

### Add components

```bash
# Add a single component
npx oonkoo add hero-gradient

# Add multiple components
npx oonkoo add hero-gradient features-grid pricing-cards

# Interactive component picker
npx oonkoo add
```

### List available components

```bash
# List all components
npx oonkoo list

# Filter by category
npx oonkoo list --category hero

# Filter by tier
npx oonkoo list --tier free
```

### Update components

```bash
# Check for updates and update interactively
npx oonkoo update

# Update all components
npx oonkoo update --all
```

## Configuration

The `oonkoo.config.json` file supports:

```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "hooks": "@/hooks"
  }
}
```

## About

OonkooUI uses [shadcn/ui](https://ui.shadcn.com) as the foundation for base UI primitives (Button, Card, Dialog, etc.). The OonkooUI components are higher-level blocks built on top of these primitives, giving you production-ready sections like Hero, Pricing, Features, and more.

## Requirements

- Node.js 18+
- React project with Tailwind CSS

## Links

- [Documentation](https://oonkoo.dev/components)
- [Components](https://oonkoo.dev/components)
- [GitHub](https://github.com/oonkoo/oonkoo-ui)

## License

MIT
