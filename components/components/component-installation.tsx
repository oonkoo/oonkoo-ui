"use client";

import { useState } from "react";
import { Copy, Check, Terminal, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentInstallationProps {
  slug: string;
  code: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  isPro: boolean;
}

export function ComponentInstallation({
  slug,
  code,
  dependencies = [],
  devDependencies = [],
  registryDependencies = [],
  isPro,
}: ComponentInstallationProps) {
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedManual, setCopiedManual] = useState(false);
  const [copiedDeps, setCopiedDeps] = useState(false);

  const cliCommand = `npx oonkoo add ${slug}`;
  const depsCommand = dependencies.length > 0 ? `npm install ${dependencies.join(" ")}` : "";

  const handleCopyCli = async () => {
    await navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyManual = async () => {
    if (isPro && !code) return;
    await navigator.clipboard.writeText(code);
    setCopiedManual(true);
    setTimeout(() => setCopiedManual(false), 2000);
  };

  const handleCopyDeps = async () => {
    await navigator.clipboard.writeText(depsCommand);
    setCopiedDeps(true);
    setTimeout(() => setCopiedDeps(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Installation</h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList>
            <TabsTrigger value="cli" className="gap-1.5">
              <Terminal className="h-4 w-4" />
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-1.5">
              <FileCode className="h-4 w-4" />
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Run the following command:
              </p>
              <div className="flex items-center gap-2 bg-muted rounded-lg border">
                <code className="flex-1 px-4 py-3 font-mono text-sm text-primary">
                  {cliCommand}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyCli}
                  className="mr-2 h-8 w-8"
                >
                  {copiedCli ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {dependencies.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Install dependencies:
                </p>
                <div className="flex items-center gap-2 bg-muted rounded-lg border">
                  <code className="flex-1 px-4 py-3 font-mono text-sm">
                    {depsCommand}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyDeps}
                    className="mr-2 h-8 w-8"
                  >
                    {copiedDeps ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            {code ? (
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Copy the following code to{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    components/oonkoo/{slug}.tsx
                  </code>
                </p>
                <div className="relative rounded-lg border overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                    <span className="text-sm font-mono text-muted-foreground">
                      {slug}.tsx
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyManual}
                      className="h-7 gap-1.5"
                    >
                      {copiedManual ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="overflow-auto max-h-[400px] p-4 text-sm bg-[#0d1117]">
                    <code className="text-gray-300">{code}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  Upgrade to Pro to access the source code.
                </p>
              </div>
            )}

            {dependencies.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Install required dependencies:
                </p>
                <div className="flex items-center gap-2 bg-muted rounded-lg border">
                  <code className="flex-1 px-4 py-3 font-mono text-sm">
                    {depsCommand}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyDeps}
                    className="mr-2 h-8 w-8"
                  >
                    {copiedDeps ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {registryDependencies && registryDependencies.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Required Components</h3>
          <p className="text-sm text-muted-foreground mb-2">
            This component requires the following OonkooUI components:
          </p>
          <div className="flex flex-wrap gap-2">
            {registryDependencies.map((dep) => (
              <a
                key={dep}
                href={`/components/${dep}`}
                className="inline-flex items-center px-3 py-1 rounded-md bg-muted hover:bg-muted/80 text-sm font-mono transition-colors"
              >
                {dep}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
