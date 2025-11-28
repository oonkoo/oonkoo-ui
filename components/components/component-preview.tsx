"use client";

import { useState } from "react";
import { Copy, Check, Eye, Code2, ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveComponentPreview } from "./live-component-preview";

interface ComponentPreviewProps {
  name: string;
  slug: string;
  code: string;
  highlightedCode: string;
  isPro: boolean;
  previewImage?: string;
}

export function ComponentPreview({
  name,
  slug,
  code,
  highlightedCode,
  isPro,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (isPro && !code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="preview" className="gap-1.5">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5">
              <Code2 className="h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            {code && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy code
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="preview" className="mt-4">
          {code ? (
            <LiveComponentPreview code={code} name={name} />
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro Component</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                This component requires an OonkooUI Pro subscription to preview and access the source code.
              </p>
              <Button asChild>
                <a href="/pricing">Upgrade to Pro</a>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          {code ? (
            <div className="relative rounded-xl border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                <span className="text-sm font-medium text-zinc-400">
                  {slug}.tsx
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 gap-1.5"
                >
                  {copied ? (
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
              <div
                className="overflow-auto max-h-[600px] p-4 text-sm bg-[#0d1117]"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Code2 className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro Component</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                This component requires an OonkooUI Pro subscription to view the source code.
              </p>
              <Button asChild>
                <a href="/pricing">Upgrade to Pro</a>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
