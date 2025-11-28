"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Lock,
  ExternalLink,
  Twitter,
  Package,
  Terminal,
  FileCode,
  Layers,
  Wand2,
  LayoutGrid,
  ChevronDown,
  Rocket,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { RegistryIndexItem } from "@/types/registry";

interface ComponentsSidebarProps {
  components: RegistryIndexItem[];
}

// Group components by category
const categoryConfig: Record<string, { label: string; icon: React.ElementType }> = {
  hero: { label: "Hero Sections", icon: Sparkles },
  features: { label: "Features", icon: LayoutGrid },
  pricing: { label: "Pricing", icon: Package },
  testimonials: { label: "Testimonials", icon: FileCode },
  faq: { label: "FAQ", icon: FileCode },
  footer: { label: "Footer", icon: Layers },
  navigation: { label: "Navigation", icon: Layers },
  dashboard: { label: "Dashboard", icon: LayoutGrid },
  forms: { label: "Forms", icon: FileCode },
  cards: { label: "Cards", icon: LayoutGrid },
  buttons: { label: "Buttons", icon: Package },
  animations: { label: "Animations", icon: Wand2 },
  other: { label: "Other", icon: FileCode },
};

// Get Started navigation
const getStartedNav = [
  { title: "Introduction", href: "/components", icon: BookOpen },
  { title: "Installation", href: "/components/installation", icon: Package },
  { title: "CLI", href: "/components/cli", icon: Terminal },
];

export function ComponentsSidebar({ components }: ComponentsSidebarProps) {
  const pathname = usePathname();

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    const category = component.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {} as Record<string, RegistryIndexItem[]>);

  // Sort categories by the order in categoryConfig
  const sortedCategories = Object.keys(categoryConfig).filter(
    (cat) => groupedComponents[cat]?.length > 0
  );

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <ScrollArea className="flex-1 py-4">
        {/* Follow Section */}
        <div className="px-4 pb-4">
          <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Follow for updates
          </h3>
          <Link
            href="https://twitter.com/chaboriau"
            target="_blank"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-4 w-4" />
            Twitter @chaboriau
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Link>
        </div>

        {/* Get Started Section */}
        <div className="px-2 pb-4 border-t pt-4">
          <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Rocket className="h-3.5 w-3.5" />
            Get Started
          </h3>
          <div className="space-y-0.5">
            {getStartedNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Components by Category */}
        <div className="px-2 border-t pt-4">
          <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Components
          </h3>

          {sortedCategories.map((category) => {
            const config = categoryConfig[category];
            const categoryComponents = groupedComponents[category];
            const Icon = config?.icon || FileCode;

            return (
              <Collapsible key={category} defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{config?.label || category}</span>
                  <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-4 border-l pl-2 mt-1 space-y-0.5">
                    {categoryComponents.map((component) => {
                      const isActive = pathname === `/components/${component.slug}`;
                      const isPro = component.tier === "pro";
                      const isNew = false; // TODO: Add "new" flag based on publishedAt

                      return (
                        <Link
                          key={component.slug}
                          href={`/components/${component.slug}`}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <span className="truncate flex-1">{component.name}</span>
                          {isPro && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-purple-500/10 text-purple-500 border-0">
                              <Lock className="h-2.5 w-2.5 mr-0.5" />
                              Pro
                            </Badge>
                          )}
                          {isNew && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-green-500/10 text-green-500 border-0">
                              New
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
