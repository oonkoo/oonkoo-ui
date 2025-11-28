"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback, Fragment } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import {
  RefreshCw,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import all the components and icons that might be used in previews
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveComponentPreviewProps {
  code: string;
  name: string;
  className?: string;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

const viewportSizes: Record<ViewportSize, { width: string; icon: React.ReactNode; label: string }> = {
  desktop: { width: "100%", icon: <Monitor className="h-4 w-4" />, label: "Desktop" },
  tablet: { width: "768px", icon: <Tablet className="h-4 w-4" />, label: "Tablet" },
  mobile: { width: "375px", icon: <Smartphone className="h-4 w-4" />, label: "Mobile" },
};

// Mock components that are commonly used
const MockButton = ({ children, className = "", variant = "default", size = "default", asChild, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-[#3CB371] text-white hover:bg-[#3CB371]/90",
    outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    ghost: "hover:bg-zinc-800",
    link: "text-[#3CB371] underline-offset-4 hover:underline",
  };
  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };
  return (
    <button className={cn(baseStyles, variants[variant] || variants.default, sizes[size] || sizes.default, className)} {...props}>
      {children}
    </button>
  );
};

const MockBadge = ({ children, className = "", variant = "default", ...props }: any) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants: Record<string, string> = {
    default: "border-transparent bg-[#3CB371] text-white",
    secondary: "border-transparent bg-zinc-800 text-zinc-300",
    outline: "border-zinc-700 text-zinc-300",
  };
  return (
    <span className={cn(baseStyles, variants[variant] || variants.default, className)} {...props}>
      {children}
    </span>
  );
};

const MockCard = ({ children, className = "", ...props }: any) => (
  <div className={cn("rounded-lg border border-zinc-800 bg-zinc-900 text-white shadow-sm", className)} {...props}>
    {children}
  </div>
);

const MockCardHeader = ({ children, className = "", ...props }: any) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</div>
);

const MockCardTitle = ({ children, className = "", ...props }: any) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>{children}</h3>
);

const MockCardDescription = ({ children, className = "", ...props }: any) => (
  <p className={cn("text-sm text-zinc-400", className)} {...props}>{children}</p>
);

const MockCardContent = ({ children, className = "", ...props }: any) => (
  <div className={cn("p-6 pt-0", className)} {...props}>{children}</div>
);

const MockCardFooter = ({ children, className = "", ...props }: any) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props}>{children}</div>
);

const MockInput = ({ className = "", ...props }: any) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3CB371] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const MockTextarea = ({ className = "", ...props }: any) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3CB371] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const MockLabel = ({ children, className = "", ...props }: any) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props}>
    {children}
  </label>
);

const MockLink = ({ href, children, className, ...props }: any) => (
  <a href={href || "#"} className={className} onClick={(e) => e.preventDefault()} {...props}>
    {children}
  </a>
);

const MockImage = ({ src, alt, className, fill, width, height, ...props }: any) => {
  const style = fill ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const } : {};
  return <img src={src || "/placeholder.svg"} alt={alt || ""} className={className} style={style} {...props} />;
};

// Mock Accordion components
const MockAccordion = ({ children, type = "single", collapsible = true, className = "", defaultValue, ...props }: any) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue ? [defaultValue] : []);

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((item) => item !== value)
          : [...openItems, value]
      );
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen: openItems.includes((child.props as any).value),
            onToggle: () => toggleItem((child.props as any).value),
          });
        }
        return child;
      })}
    </div>
  );
};

const MockAccordionItem = ({ children, value, isOpen, onToggle, className = "", ...props }: any) => (
  <div className={cn("border-b border-zinc-800", className)} data-state={isOpen ? "open" : "closed"} {...props}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle });
      }
      return child;
    })}
  </div>
);

const MockAccordionTrigger = ({ children, isOpen, onToggle, className = "", ...props }: any) => (
  <button
    className={cn(
      "flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:underline text-left",
      className
    )}
    onClick={onToggle}
    {...props}
  >
    {children}
    <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
  </button>
);

const MockAccordionContent = ({ children, isOpen, className = "", ...props }: any) => (
  <div
    className={cn(
      "overflow-hidden text-sm transition-all",
      isOpen ? "animate-accordion-down pb-4" : "h-0"
    )}
    {...props}
  >
    {isOpen && <div className={cn("text-zinc-400", className)}>{children}</div>}
  </div>
);

// Mock Avatar components
const MockAvatar = ({ children, className = "", ...props }: any) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props}>
    {children}
  </div>
);

const MockAvatarImage = ({ src, alt, className = "", ...props }: any) => (
  <img src={src || "/placeholder.svg"} alt={alt || ""} className={cn("aspect-square h-full w-full", className)} {...props} />
);

const MockAvatarFallback = ({ children, className = "", ...props }: any) => (
  <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-zinc-800 text-zinc-300", className)} {...props}>
    {children}
  </div>
);

// Mock Separator
const MockSeparator = ({ orientation = "horizontal", className = "", ...props }: any) => (
  <div
    className={cn(
      "shrink-0 bg-zinc-800",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
);

// Mock Tabs components
const MockTabs = ({ children, defaultValue, className = "", ...props }: any) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const MockTabsList = ({ children, activeTab, setActiveTab, className = "", ...props }: any) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-zinc-800 p-1", className)} {...props}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
      }
      return child;
    })}
  </div>
);

const MockTabsTrigger = ({ children, value, activeTab, setActiveTab, className = "", ...props }: any) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
      activeTab === value ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-400 hover:text-white",
      className
    )}
    onClick={() => setActiveTab(value)}
    {...props}
  >
    {children}
  </button>
);

const MockTabsContent = ({ children, value, activeTab, className = "", ...props }: any) => {
  if (activeTab !== value) return null;
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
};

// Mock Select (simple version)
const MockSelect = ({ children, ...props }: any) => <div {...props}>{children}</div>;
const MockSelectTrigger = ({ children, className = "", ...props }: any) => (
  <button className={cn("flex h-10 w-full items-center justify-between rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm", className)} {...props}>
    {children}
  </button>
);
const MockSelectValue = ({ placeholder, ...props }: any) => <span className="text-zinc-400" {...props}>{placeholder}</span>;
const MockSelectContent = ({ children, ...props }: any) => null;
const MockSelectItem = ({ children, ...props }: any) => null;

// Mock ScrollArea
const MockScrollArea = ({ children, className = "", ...props }: any) => (
  <div className={cn("overflow-auto", className)} {...props}>{children}</div>
);

// Mock Switch
const MockSwitch = ({ checked, onCheckedChange, className = "", ...props }: any) => {
  const [isChecked, setIsChecked] = useState(checked || false);
  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={() => {
        setIsChecked(!isChecked);
        onCheckedChange?.(!isChecked);
      }}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        isChecked ? "bg-[#3CB371]" : "bg-zinc-700",
        className
      )}
      {...props}
    >
      <span className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform",
        isChecked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
};

// Mock Progress
const MockProgress = ({ value = 0, className = "", ...props }: any) => (
  <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-zinc-800", className)} {...props}>
    <div className="h-full bg-[#3CB371] transition-all" style={{ width: `${value}%` }} />
  </div>
);

// Mock Skeleton
const MockSkeleton = ({ className = "", ...props }: any) => (
  <div className={cn("animate-pulse rounded-md bg-zinc-800", className)} {...props} />
);

// All mock UI components object for require
const mockUIComponents = {
  Button: MockButton,
  Badge: MockBadge,
  Card: MockCard,
  CardHeader: MockCardHeader,
  CardTitle: MockCardTitle,
  CardDescription: MockCardDescription,
  CardContent: MockCardContent,
  CardFooter: MockCardFooter,
  Input: MockInput,
  Textarea: MockTextarea,
  Label: MockLabel,
  Accordion: MockAccordion,
  AccordionItem: MockAccordionItem,
  AccordionTrigger: MockAccordionTrigger,
  AccordionContent: MockAccordionContent,
  Avatar: MockAvatar,
  AvatarImage: MockAvatarImage,
  AvatarFallback: MockAvatarFallback,
  Separator: MockSeparator,
  Tabs: MockTabs,
  TabsList: MockTabsList,
  TabsTrigger: MockTabsTrigger,
  TabsContent: MockTabsContent,
  Select: MockSelect,
  SelectTrigger: MockSelectTrigger,
  SelectValue: MockSelectValue,
  SelectContent: MockSelectContent,
  SelectItem: MockSelectItem,
  ScrollArea: MockScrollArea,
  Switch: MockSwitch,
  Progress: MockProgress,
  Skeleton: MockSkeleton,
};

// Mock require function to prevent errors
const mockRequire = (module: string) => {
  // Return mock modules based on what's requested
  if (module === "react") {
    return {
      ...React,
      default: React,
      useState,
      useEffect,
      useRef,
      useMemo,
      useCallback,
      Fragment,
      createElement: React.createElement,
      cloneElement: React.cloneElement,
      Children: React.Children,
      isValidElement: React.isValidElement,
    };
  }
  if (module === "framer-motion") return { motion, AnimatePresence };
  if (module === "lucide-react") return LucideIcons;
  if (module.includes("@/lib/utils")) return { cn };
  if (module.includes("@/components/ui")) return mockUIComponents;
  if (module === "next/link") return { default: MockLink, Link: MockLink };
  if (module === "next/image") return { default: MockImage, Image: MockImage };
  // Return empty object for unknown modules
  return {};
};

// Mock module and exports for CommonJS compatibility
const mockModule = { exports: {} };
const mockExports = {};

// Scope object with all available components for the preview
const scope = {
  // Mock CommonJS globals to prevent ReferenceError
  require: mockRequire,
  module: mockModule,
  exports: mockExports,

  // React
  React,
  Fragment,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,

  // Framer Motion
  motion,
  AnimatePresence,

  // All Lucide icons
  ...LucideIcons,

  // Mock UI components
  Button: MockButton,
  Badge: MockBadge,
  Card: MockCard,
  CardHeader: MockCardHeader,
  CardTitle: MockCardTitle,
  CardDescription: MockCardDescription,
  CardContent: MockCardContent,
  CardFooter: MockCardFooter,
  Input: MockInput,
  Textarea: MockTextarea,
  Label: MockLabel,
  Link: MockLink,
  Image: MockImage,

  // Accordion
  Accordion: MockAccordion,
  AccordionItem: MockAccordionItem,
  AccordionTrigger: MockAccordionTrigger,
  AccordionContent: MockAccordionContent,

  // Avatar
  Avatar: MockAvatar,
  AvatarImage: MockAvatarImage,
  AvatarFallback: MockAvatarFallback,

  // Separator
  Separator: MockSeparator,

  // Tabs
  Tabs: MockTabs,
  TabsList: MockTabsList,
  TabsTrigger: MockTabsTrigger,
  TabsContent: MockTabsContent,

  // Select
  Select: MockSelect,
  SelectTrigger: MockSelectTrigger,
  SelectValue: MockSelectValue,
  SelectContent: MockSelectContent,
  SelectItem: MockSelectItem,

  // Other
  ScrollArea: MockScrollArea,
  Switch: MockSwitch,
  Progress: MockProgress,
  Skeleton: MockSkeleton,

  // Utility
  cn,
};

function transformCode(code: string): string {
  // Remove imports
  let transformed = code.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "");

  // Remove "use client" directive
  transformed = transformed.replace(/['"]use client['"];?\s*/g, "");

  // Remove require statements
  transformed = transformed.replace(/const\s+\w+\s*=\s*require\s*\([^)]+\);?\s*/g, "");
  transformed = transformed.replace(/require\s*\([^)]+\)/g, "null");

  // Remove export type statements
  transformed = transformed.replace(/^export\s+type\s+.*?;?\s*$/gm, "");

  // Remove interface exports
  transformed = transformed.replace(/^export\s+interface\s+\w+\s*\{[\s\S]*?\}\s*$/gm, "");

  // Find the main export and convert it to a render call
  // Match: export default function Name or export function Name
  const exportMatch = transformed.match(/export\s+(?:default\s+)?function\s+(\w+)/);

  if (exportMatch) {
    const componentName = exportMatch[1];

    // Remove the export keyword
    transformed = transformed.replace(/export\s+default\s+function/, "function");
    transformed = transformed.replace(/export\s+function/, "function");

    // Add render call at the end
    transformed = `${transformed}\n\nrender(<${componentName} />);`;
  } else {
    // Try to find arrow function export: export const Name = () => or export default () =>
    const arrowMatch = transformed.match(/export\s+(?:default\s+)?(?:const\s+)?(\w+)?\s*=?\s*\([^)]*\)\s*=>/);
    if (arrowMatch) {
      const componentName = arrowMatch[1] || "Component";
      transformed = transformed.replace(/export\s+default\s+/, "const DefaultComponent = ");
      transformed = transformed.replace(/export\s+const\s+/, "const ");
      transformed = `${transformed}\n\nrender(<${componentName !== "Component" ? componentName : "DefaultComponent"} />);`;
    }
  }

  return transformed;
}

export function LiveComponentPreview({ code, name, className }: LiveComponentPreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  const transformedCode = useMemo(() => transformCode(code), [code]);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden",
        isFullscreen && "fixed inset-4 z-50 shadow-2xl",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-1">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {/* Viewport toggles */}
          <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
            {(Object.keys(viewportSizes) as ViewportSize[]).map((size) => (
              <Button
                key={size}
                variant={viewport === size ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewport(size)}
                title={viewportSizes[size].label}
              >
                {viewportSizes[size].icon}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleRefresh}
            title="Refresh preview"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div
        className={cn(
          "bg-zinc-950 overflow-auto flex justify-center",
          isFullscreen ? "h-[calc(100%-48px)]" : "min-h-[400px]"
        )}
      >
        <div
          className="h-full w-full transition-all duration-300 flex items-center justify-center p-4"
          style={{ maxWidth: viewportSizes[viewport].width }}
        >
          <LiveProvider
            key={key}
            code={transformedCode}
            scope={scope}
            noInline={true}
          >
            <div className="w-full">
              <LiveError className="text-red-400 bg-red-950/50 border border-red-900 rounded-lg p-4 mb-4 text-sm font-mono" />
              <LivePreview className="w-full" />
            </div>
          </LiveProvider>
        </div>
      </div>

      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10"
          onClick={handleFullscreen}
        />
      )}
    </div>
  );
}
