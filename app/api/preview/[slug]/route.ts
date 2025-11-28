import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const component = await prisma.component.findUnique({
      where: { slug },
      select: {
        name: true,
        code: true,
        tier: true,
      },
    });

    if (!component) {
      return new NextResponse("Component not found", { status: 404 });
    }

    // For pro components, return a placeholder
    const isPro = component.tier === "PRO" || component.tier === "COMMUNITY_PAID";

    // Generate preview HTML
    const html = generatePreviewHTML(component.name, component.code, isPro);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Preview error:", error);
    return new NextResponse("Error generating preview", { status: 500 });
  }
}

function generatePreviewHTML(name: string, code: string, isPro: boolean): string {
  // Extract the main component function name from the code
  const exportMatch = code.match(/export\s+(?:default\s+)?function\s+(\w+)/);
  const componentName = exportMatch ? exportMatch[1] : "Component";

  // For pro components, show a locked preview
  if (isPro) {
    return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#3CB371',
              foreground: '#ffffff',
            },
            background: '#0a0a0a',
            foreground: '#fafafa',
            card: '#171717',
            'card-foreground': '#fafafa',
            muted: '#262626',
            'muted-foreground': '#a1a1aa',
            border: '#262626',
          }
        }
      }
    }
  </script>
  <style>
    body {
      background: #0a0a0a;
      color: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body>
  <div class="text-center p-8">
    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
      <svg class="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
    <h2 class="text-xl font-semibold mb-2">Pro Component</h2>
    <p class="text-muted-foreground">Upgrade to Pro to preview this component</p>
  </div>
</body>
</html>`;
  }

  // Create a simplified preview for free components
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#3CB371',
              foreground: '#ffffff',
            },
            background: '#0a0a0a',
            foreground: '#fafafa',
            card: '#171717',
            'card-foreground': '#fafafa',
            muted: '#262626',
            'muted-foreground': '#a1a1aa',
            border: '#262626',
          }
        }
      }
    }
  </script>
  <style>
    body {
      background: #0a0a0a;
      color: #fafafa;
      min-height: 100vh;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    /* Basic component styles */
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-2xl { border-radius: 1rem; }
    .rounded-3xl { border-radius: 1.5rem; }
    .rounded-full { border-radius: 9999px; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    // Mock components and utilities
    const cn = (...classes) => classes.filter(Boolean).join(' ');

    // Mock lucide-react icons
    const createIcon = (name, path) => ({ className = "h-6 w-6", ...props }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        {path}
      </svg>
    );

    const ArrowRight = createIcon('ArrowRight', <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />);
    const Check = createIcon('Check', <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />);
    const Star = createIcon('Star', <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />);
    const CheckCircle = createIcon('CheckCircle', <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />);
    const Zap = createIcon('Zap', <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />);
    const Shield = createIcon('Shield', <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />);
    const Palette = createIcon('Palette', <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />);
    const Code2 = createIcon('Code2', <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />);
    const Rocket = createIcon('Rocket', <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m6.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.84-2.58m5.84 2.58a14.926 14.926 0 005.84-2.58M15 12a3 3 0 11-6 0 3 3 0 016 0z" />);
    const Heart = createIcon('Heart', <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />);
    const Play = createIcon('Play', <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />);
    const Github = createIcon('Github', <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />);
    const Twitter = createIcon('Twitter', <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />);
    const Linkedin = createIcon('Linkedin', <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />);
    const Menu = createIcon('Menu', <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />);
    const X = createIcon('X', <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />);
    const ChevronDown = createIcon('ChevronDown', <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />);

    // Mock Link component
    const Link = ({ href, children, className, ...props }) => (
      <a href={href} className={className} {...props}>{children}</a>
    );

    // Mock Image component
    const Image = ({ src, alt, className, fill, ...props }) => (
      <img src={src} alt={alt} className={className} style={fill ? { position: 'absolute', inset: 0, objectFit: 'cover' } : {}} {...props} />
    );

    // Mock Button component
    const Button = ({ children, className = "", variant = "default", size = "default", asChild, ...props }) => {
      const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
      const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-transparent hover:bg-muted",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        ghost: "hover:bg-muted",
      };
      const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      };
      return <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>{children}</button>;
    };

    // Mock Badge component
    const Badge = ({ children, className = "", variant = "default", ...props }) => {
      const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
      const variants = {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border text-foreground",
      };
      return <span className={cn(baseStyles, variants[variant], className)} {...props}>{children}</span>;
    };

    // Mock motion component
    const motion = {
      div: ({ initial, animate, whileInView, transition, viewport, children, ...props }) => <div {...props}>{children}</div>,
      h1: ({ initial, animate, transition, children, ...props }) => <h1 {...props}>{children}</h1>,
      p: ({ initial, animate, transition, children, ...props }) => <p {...props}>{children}</p>,
    };

    // Mock Accordion components
    const Accordion = ({ children, ...props }) => <div {...props}>{children}</div>;
    const AccordionItem = ({ children, value, ...props }) => <div className="border-b" {...props}>{children}</div>;
    const AccordionTrigger = ({ children, className, ...props }) => (
      <button className={cn("flex flex-1 items-center justify-between py-4 font-medium hover:underline", className)} {...props}>
        {children}
        <ChevronDown className="h-4 w-4" />
      </button>
    );
    const AccordionContent = ({ children, className, ...props }) => (
      <div className={cn("pb-4 pt-0", className)} {...props}>{children}</div>
    );

    // User component code (cleaned)
    ${cleanCodeForPreview(code)}

    // Render component
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<${componentName} />);
  </script>
</body>
</html>`;
}

function cleanCodeForPreview(code: string): string {
  // Remove imports
  let cleaned = code.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "");

  // Remove "use client" directive
  cleaned = cleaned.replace(/['"]use client['"];?\s*/g, "");

  // Replace @/ imports references that might remain
  cleaned = cleaned.replace(/@\/lib\/utils/g, "");
  cleaned = cleaned.replace(/@\/components\/ui\//g, "");

  return cleaned.trim();
}
