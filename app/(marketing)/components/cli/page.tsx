import Link from "next/link";
import { ArrowRight, Terminal, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/components/copy-button";

export const metadata = {
  title: "CLI - OonkooUI",
  description: "Use the OonkooUI CLI to add components to your project.",
};

export default function CLIPage() {
  const configExample = `{
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
  },
  "registryUrl": "https://oonkoo.dev/api/registry"
}`;

  return (
    <div className="py-8 px-6 lg:px-10 max-w-4xl">
      {/* Header */}
      <div className="space-y-4 mb-10">
        <h1 className="text-4xl font-bold tracking-tight">CLI</h1>
        <p className="text-xl text-muted-foreground">
          Use the OonkooUI CLI to add components to your project.
        </p>
      </div>

      {/* About */}
      <section className="mb-10">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              OonkooUI uses <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">shadcn/ui</a> as the foundation for base UI primitives (Button, Card, Dialog, etc.).
              The OonkooUI components are higher-level blocks built on top of these primitives, giving you production-ready sections like Hero, Pricing, Features, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Commands */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Commands</h2>

        {/* init */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            init
          </h3>
          <p className="text-muted-foreground mb-4">
            Initialize OonkooUI in your project. Creates the config file and sets up directories.
          </p>
          <div className="rounded-lg border overflow-hidden mb-3">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
              <span className="text-sm text-muted-foreground">Terminal</span>
              <CopyButton text="npx oonkoo init" variant="ghost" size="sm" />
            </div>
            <div className="bg-zinc-900 p-4">
              <code className="text-sm font-mono text-primary">npx oonkoo init</code>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Options: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">-y, --yes</code> - Skip prompts and use defaults
          </p>
        </div>

        {/* add */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            add
          </h3>
          <p className="text-muted-foreground mb-4">
            Add components to your project. Fetches the component code and installs dependencies.
          </p>
          <div className="space-y-3 mb-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Add a component</span>
                <CopyButton text="npx oonkoo add hero-gradient" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo add hero-gradient</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Add multiple components</span>
                <CopyButton text="npx oonkoo add hero-gradient pricing-cards features-grid" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo add hero-gradient pricing-cards features-grid</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Interactive component picker</span>
                <CopyButton text="npx oonkoo add" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo add</code>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Options: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">-a, --all</code> Add all components | <code className="bg-muted px-1.5 py-0.5 rounded text-xs">-o, --overwrite</code> Overwrite existing | <code className="bg-muted px-1.5 py-0.5 rounded text-xs">-y, --yes</code> Skip confirmations
          </p>
        </div>

        {/* list */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            list
          </h3>
          <p className="text-muted-foreground mb-4">
            List all available components from the registry.
          </p>
          <div className="space-y-3 mb-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">List all components</span>
                <CopyButton text="npx oonkoo list" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo list</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Filter by category</span>
                <CopyButton text="npx oonkoo list --category hero" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo list --category hero</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Filter by tier</span>
                <CopyButton text="npx oonkoo list --tier free" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo list --tier free</code>
              </div>
            </div>
          </div>
        </div>

        {/* auth */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            auth
          </h3>
          <p className="text-muted-foreground mb-4">
            Authenticate with OonkooUI to access Pro components. Supports browser-based login (recommended) or API key authentication.
          </p>
          <div className="space-y-3 mb-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Login (opens browser)</span>
                <CopyButton text="npx oonkoo auth" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo auth</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Login with API key</span>
                <CopyButton text="npx oonkoo auth --api-key" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo auth --api-key</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Logout</span>
                <CopyButton text="npx oonkoo auth --logout" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo auth --logout</code>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            You can also use <code className="bg-muted px-1.5 py-0.5 rounded text-xs">npx oonkoo login</code> as an alias for auth.
          </p>
        </div>

        {/* update */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            update
          </h3>
          <p className="text-muted-foreground mb-4">
            Check for and apply updates to installed components.
          </p>
          <div className="space-y-3 mb-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Interactive update</span>
                <CopyButton text="npx oonkoo update" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo update</code>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">Update all</span>
                <CopyButton text="npx oonkoo update --all" variant="ghost" size="sm" />
              </div>
              <div className="bg-zinc-900 p-4">
                <code className="text-sm font-mono text-primary">npx oonkoo update --all</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Configuration</h2>
        <p className="text-muted-foreground mb-4">
          The <code className="bg-muted px-1.5 py-0.5 rounded text-xs">oonkoo.config.json</code> file in your project root:
        </p>
        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
            <span className="text-sm font-mono text-muted-foreground">oonkoo.config.json</span>
            <CopyButton text={configExample} variant="ghost" size="sm" />
          </div>
          <div className="bg-zinc-900 p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300">{configExample}</pre>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>Node.js 18+</li>
          <li>React project with Tailwind CSS</li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        <h2 className="text-xl font-bold mb-2">Start Building</h2>
        <p className="text-muted-foreground mb-4">
          Browse the component library and start adding to your project.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/components/hero-gradient">
              Browse Components
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/components/installation">
              Installation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
