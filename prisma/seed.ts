import { PrismaClient, ComponentType, ComponentTier, ComponentCategory, ComponentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ============================================
  // BADGES
  // ============================================
  console.log('Creating badges...');

  const badges = [
    {
      name: 'First Upload',
      description: 'Uploaded your first component',
      icon: 'upload',
      criteria: { type: 'uploads', threshold: 1 },
    },
    {
      name: 'Popular Creator',
      description: 'Received 10 upvotes on a single component',
      icon: 'heart',
      criteria: { type: 'component_upvotes', threshold: 10 },
    },
    {
      name: 'Rising Star',
      description: 'Received 50 total upvotes',
      icon: 'star',
      criteria: { type: 'total_upvotes', threshold: 50 },
    },
    {
      name: 'Community Champion',
      description: 'Received 100 total upvotes',
      icon: 'trophy',
      criteria: { type: 'total_upvotes', threshold: 100 },
    },
    {
      name: 'Download Hero',
      description: 'Your components have been downloaded 100 times',
      icon: 'download',
      criteria: { type: 'total_downloads', threshold: 100 },
    },
    {
      name: 'Prolific Creator',
      description: 'Uploaded 10 components',
      icon: 'code',
      criteria: { type: 'uploads', threshold: 10 },
    },
    {
      name: 'Early Adopter',
      description: 'Joined during the beta period',
      icon: 'rocket',
      criteria: { type: 'early_adopter', threshold: 1 },
    },
    {
      name: 'Pro Member',
      description: 'Subscribed to OonkooUI Pro',
      icon: 'crown',
      criteria: { type: 'subscription', threshold: 1 },
    },
    {
      name: 'Verified Seller',
      description: 'Became a verified seller on the marketplace',
      icon: 'badge-check',
      criteria: { type: 'seller_verified', threshold: 1 },
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: badge,
      create: badge,
    });
  }
  console.log(`✅ Created ${badges.length} badges\n`);

  // ============================================
  // SAMPLE OFFICIAL COMPONENTS
  // ============================================
  console.log('Creating sample components...');

  // First, create or get an admin user for official components
  const adminUser = await prisma.user.upsert({
    where: { kindeId: 'admin_oonkoo_official' },
    update: {
      email: 'admin@oonkoo.dev',
      name: 'OonkooUI Team',
      bio: 'Official OonkooUI component library team',
      role: 'ADMIN',
      profileComplete: true,
    },
    create: {
      kindeId: 'admin_oonkoo_official',
      email: 'admin@oonkoo.dev',
      name: 'OonkooUI Team',
      bio: 'Official OonkooUI component library team',
      role: 'ADMIN',
      profileComplete: true,
    },
  });

  const sampleComponents = [
    // FREE Components
    {
      name: 'Gradient Hero',
      slug: 'hero-gradient',
      description: 'A stunning hero section with animated gradient background. Perfect for landing pages and marketing sites.',
      code: `"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroGradient() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-background to-emerald-900/20 animate-gradient" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          Build faster with
          <span className="text-primary block mt-2">beautiful components</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Production-ready React components that you can copy and paste into your apps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            View Components
          </Button>
        </motion.div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.HERO,
      tags: ['hero', 'gradient', 'animated', 'landing'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Feature Grid',
      slug: 'features-grid',
      description: 'A responsive feature grid with icons. Great for showcasing product features or services.',
      code: `"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Palette, Code2, Rocket, Heart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with minimal bundle size.",
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "Built with TypeScript for better developer experience.",
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Easily customize colors, spacing, and more.",
  },
  {
    icon: Code2,
    title: "Copy & Paste",
    description: "No dependencies. Just copy the code you need.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Battle-tested components used in real apps.",
  },
  {
    icon: Heart,
    title: "Open Source",
    description: "Free to use in personal and commercial projects.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.FEATURES,
      tags: ['features', 'grid', 'icons', 'animated'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Pricing Cards',
      slug: 'pricing-cards',
      description: 'A clean pricing section with three tiers. Includes popular badge and feature lists.',
      code: `"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for side projects",
    features: ["5 components", "Community support", "Basic analytics"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professional developers",
    features: ["Unlimited components", "Priority support", "Advanced analytics", "Custom themes", "API access"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams",
    features: ["Everything in Pro", "Dedicated support", "Custom integrations", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingCards() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Simple Pricing</h2>
          <p className="mt-4 text-muted-foreground">Choose the plan that works for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 rounded-2xl border bg-card",
                plan.popular && "border-primary shadow-lg scale-105"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-muted-foreground mt-2">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full mt-8" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.PRICING,
      tags: ['pricing', 'cards', 'subscription', 'saas'],
      dependencies: JSON.stringify(['lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    {
      name: 'FAQ Accordion',
      slug: 'faq-accordion',
      description: 'An accessible FAQ section using Radix accordion. Smooth animations included.',
      code: `"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this library free to use?",
    answer: "Yes! Our core components are completely free and open source. You can use them in personal and commercial projects without any restrictions.",
  },
  {
    question: "Do I need to install any dependencies?",
    answer: "Most components are built with React and Tailwind CSS. Some advanced components may require additional packages like Framer Motion or Radix UI primitives.",
  },
  {
    question: "Can I customize the components?",
    answer: "Absolutely! All components are designed to be easily customizable. You own the code, so you can modify colors, spacing, animations, and more to match your brand.",
  },
  {
    question: "Is TypeScript supported?",
    answer: "Yes, all components are written in TypeScript and include full type definitions for the best developer experience.",
  },
  {
    question: "How do I get support?",
    answer: "Free users can get help through our community Discord. Pro subscribers get priority email support and access to our private Slack channel.",
  },
];

export function FAQAccordion() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about our component library.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={\`item-\${index}\`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.FAQ,
      tags: ['faq', 'accordion', 'questions', 'support'],
      dependencies: JSON.stringify(['@radix-ui/react-accordion']),
      registryDeps: ['accordion'],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    {
      name: 'Simple Footer',
      slug: 'footer-simple',
      description: 'A clean, minimal footer with logo, links, and social icons.',
      code: `import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const links = {
  product: [
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Changelog", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const social = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function FooterSimple() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              YourBrand
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Building the future of web development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>

          <div className="flex gap-4">
            {social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.FOOTER,
      tags: ['footer', 'navigation', 'social', 'links'],
      dependencies: JSON.stringify(['lucide-react']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    // ========== HIGH QUALITY FREE COMPONENTS ==========
    {
      name: 'Aurora Background',
      slug: 'aurora-background',
      description: 'A mesmerizing animated aurora borealis background effect. Creates a stunning visual experience with flowing gradients.',
      code: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-zinc-950 text-slate-50 transition-bg overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            \`
            [--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--secondary)_15%,var(--primary)_20%,var(--accent)_25%,var(--primary)_30%)]
            [background-image:var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50
            will-change-transform
            \`,
            showRadialGradient &&
              \`[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]\`
          )}
          style={{
            "--primary": "hsl(280, 100%, 70%)",
            "--secondary": "hsl(200, 100%, 60%)",
            "--accent": "hsl(340, 100%, 70%)",
          } as React.CSSProperties}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Usage Example:
// <AuroraBackground>
//   <h1 className="text-4xl md:text-7xl font-bold text-center">
//     Aurora Background
//   </h1>
// </AuroraBackground>`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.HERO,
      tags: ['aurora', 'background', 'animated', 'gradient', 'hero', 'visual'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Spotlight Card',
      slug: 'spotlight-card',
      description: 'An interactive card component with a spotlight effect that follows the cursor. Creates an engaging hover experience.',
      code: `"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(120, 119, 198, 0.15)",
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-8",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 40%)\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Usage Example:
// <SpotlightCard>
//   <h3 className="text-xl font-semibold mb-2">Interactive Card</h3>
//   <p className="text-muted-foreground">
//     Hover over this card to see the spotlight effect follow your cursor.
//   </p>
// </SpotlightCard>`,
      type: ComponentType.ELEMENT,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['card', 'spotlight', 'hover', 'interactive', 'cursor'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Magnetic Button',
      slug: 'magnetic-button',
      description: 'A button with a magnetic cursor-following effect. The button subtly moves toward the cursor creating an engaging interaction.',
      code: `"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 40,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      setPosition({
        x: distanceX / strength,
        y: distanceY / strength,
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={cn("relative inline-block", className)}
    >
      <motion.button
        className={cn(
          "relative px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium",
          "hover:bg-primary/90 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

// Usage Example:
// <MagneticButton strength={30}>
//   Hover Me
// </MagneticButton>`,
      type: ComponentType.ELEMENT,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['button', 'magnetic', 'hover', 'interactive', 'cursor', 'animation'],
      dependencies: JSON.stringify(['framer-motion']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Text Scramble',
      slug: 'text-scramble',
      description: 'An animated text effect that scrambles through random characters before revealing the final text. Great for headlines and intros.',
      code: `"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
  trigger?: boolean;
}

export function TextScramble({
  text,
  className,
  speed = 50,
  characters = "!<>-_\\\\/[]{}—=+*^?#________",
  trigger = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return char;
            }
            if (char === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, characters, isAnimating]);

  useEffect(() => {
    if (trigger) {
      scramble();
    }
  }, [trigger, scramble]);

  return (
    <span
      className={cn("font-mono inline-block", className)}
      onMouseEnter={scramble}
    >
      {displayText || text}
    </span>
  );
}

// Usage Example:
// <TextScramble
//   text="Hover to Scramble"
//   className="text-4xl font-bold"
// />`,
      type: ComponentType.ELEMENT,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['text', 'scramble', 'animation', 'effect', 'typography', 'hover'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Gradient Mesh',
      slug: 'gradient-mesh',
      description: 'A beautiful animated gradient mesh background with smooth color transitions. Perfect for hero sections and modern designs.',
      code: `"use client";

import { cn } from "@/lib/utils";

interface GradientMeshProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
}

export function GradientMesh({
  children,
  className,
  colors = ["#ff0080", "#7928ca", "#0070f3", "#00d4ff"],
}: GradientMeshProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-zinc-950",
        className
      )}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          style={{ backgroundColor: colors[0] }}
        />
        <div
          className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          style={{ backgroundColor: colors[1] }}
        />
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          style={{ backgroundColor: colors[2] }}
        />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"
          style={{ backgroundColor: colors[3] }}
        />
      </div>

      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")\`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{\`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      \`}</style>
    </div>
  );
}

// Usage Example:
// <GradientMesh colors={["#ff0080", "#7928ca", "#0070f3", "#00d4ff"]}>
//   <div className="flex items-center justify-center min-h-screen">
//     <h1 className="text-6xl font-bold text-white">Beautiful Mesh</h1>
//   </div>
// </GradientMesh>`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.HERO,
      tags: ['gradient', 'mesh', 'background', 'animated', 'hero', 'visual'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Tilt Card',
      slug: 'tilt-card',
      description: 'A 3D tilt effect card that responds to mouse movement. Creates depth and interactivity with smooth perspective transforms.',
      code: `"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className,
  glareEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-xl border bg-card p-6",
        className
      )}
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>

      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([latestX, latestY]) =>
                \`radial-gradient(
                  600px circle at \${(Number(latestX) + 0.5) * 100}% \${(Number(latestY) + 0.5) * 100}%,
                  rgba(255, 255, 255, 0.1),
                  transparent 40%
                )\`
            ),
          }}
        />
      )}
    </motion.div>
  );
}

// Usage Example:
// <TiltCard className="max-w-sm">
//   <h3 className="text-xl font-bold mb-2">3D Tilt Effect</h3>
//   <p className="text-muted-foreground">
//     Move your mouse over this card to see the 3D tilt effect.
//   </p>
// </TiltCard>`,
      type: ComponentType.ELEMENT,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['card', 'tilt', '3d', 'hover', 'interactive', 'perspective'],
      dependencies: JSON.stringify(['framer-motion']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Glowing Border',
      slug: 'glowing-border',
      description: 'A container with an animated glowing border effect. The glow travels around the border creating a futuristic look.',
      code: `"use client";

import { cn } from "@/lib/utils";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

export function GlowingBorder({
  children,
  className,
  glowColor = "#7c3aed",
  duration = 3,
}: GlowingBorderProps) {
  return (
    <div className={cn("relative p-[1px] overflow-hidden rounded-xl", className)}>
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: \`linear-gradient(90deg, transparent, \${glowColor}, transparent)\`,
          animation: \`border-spin \${duration}s linear infinite\`,
        }}
      />

      {/* Static gradient for continuous coverage */}
      <div
        className="absolute inset-0 rounded-xl opacity-50"
        style={{
          background: \`conic-gradient(from 0deg, transparent, \${glowColor}, transparent)\`,
        }}
      />

      {/* Content container */}
      <div className="relative bg-background rounded-xl p-6 z-10">
        {children}
      </div>

      <style jsx>{\`
        @keyframes border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      \`}</style>
    </div>
  );
}

// Usage Example:
// <GlowingBorder glowColor="#7c3aed">
//   <h3 className="text-xl font-bold mb-2">Glowing Border</h3>
//   <p className="text-muted-foreground">
//     A beautiful animated glowing border effect.
//   </p>
// </GlowingBorder>`,
      type: ComponentType.ELEMENT,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['border', 'glow', 'animated', 'container', 'visual', 'neon'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Text Gradient',
      slug: 'text-gradient',
      description: 'Animated gradient text that flows through colors. Perfect for headlines and eye-catching typography.',
      code: `"use client";

import { cn } from "@/lib/utils";

interface TextGradientProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animate?: boolean;
  duration?: number;
}

export function TextGradient({
  children,
  className,
  colors = ["#ff0080", "#7928ca", "#0070f3", "#ff0080"],
  animate = true,
  duration = 5,
}: TextGradientProps) {
  const gradientStyle = {
    backgroundImage: \`linear-gradient(90deg, \${colors.join(", ")})\`,
    backgroundSize: animate ? "200% auto" : "100% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: animate ? \`gradient-shift \${duration}s linear infinite\` : "none",
  };

  return (
    <>
      <span
        className={cn("inline-block font-bold", className)}
        style={gradientStyle}
      >
        {children}
      </span>
      <style jsx>{\`
        @keyframes gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      \`}</style>
    </>
  );
}

// Usage Example:
// <TextGradient className="text-6xl">
//   Gradient Text
// </TextGradient>`,
      type: ComponentType.ELEMENT,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['text', 'gradient', 'animated', 'typography', 'headline'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Particle Field',
      slug: 'particle-field',
      description: 'An interactive particle field background with mouse interaction. Particles connect when close to each other.',
      code: `"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ParticleFieldProps {
  children?: React.ReactNode;
  className?: string;
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function ParticleField({
  children,
  className,
  particleCount = 80,
  particleColor = "rgba(255, 255, 255, 0.8)",
  lineColor = "rgba(255, 255, 255, 0.15)",
  speed = 0.5,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 1,
      });
    }
    particlesRef.current = particles;
  }, [particleCount, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - distance / 120;
            ctx.stroke();
          }
        }

        // Mouse interaction
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mDistance = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDistance < 100) {
          const force = (100 - mDistance) / 100;
          p.vx += (mdx / mDistance) * force * 0.2;
          p.vy += (mdy / mDistance) * force * 0.2;
        }

        // Limit velocity
        const maxSpeed = 2;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, particleColor, lineColor]);

  return (
    <div className={cn("relative min-h-screen bg-zinc-950", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Usage Example:
// <ParticleField>
//   <div className="flex items-center justify-center min-h-screen">
//     <h1 className="text-6xl font-bold text-white">Interactive Particles</h1>
//   </div>
// </ParticleField>`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.HERO,
      tags: ['particles', 'background', 'interactive', 'canvas', 'hero', 'animation'],
      dependencies: JSON.stringify([]),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    // Additional FREE Components
    {
      name: 'Testimonials Grid',
      slug: 'testimonials-grid',
      description: 'A responsive testimonials section with avatar, name, and quote. Perfect for social proof.',
      code: `"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    content: "These components saved me weeks of development time. The code quality is exceptional and easy to customize.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    content: "Beautiful, accessible, and well-documented. This is exactly what our team needed.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    content: "We launched our MVP in half the time thanks to these ready-to-use components.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    content: "The animations are smooth and the TypeScript support is excellent. Highly recommended!",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "UX Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    content: "Finally, a component library that prioritizes both aesthetics and accessibility.",
    rating: 5,
  },
  {
    name: "Alex Morgan",
    role: "Tech Lead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    content: "Our team's productivity increased significantly after adopting this library.",
    rating: 5,
  },
];

export function TestimonialsGrid() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Loved by Developers</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            See what others are saying about our component library.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border bg-card"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full bg-muted"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.TESTIMONIALS,
      tags: ['testimonials', 'reviews', 'social-proof', 'grid'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    {
      name: 'CTA Section',
      slug: 'cta-section',
      description: 'A compelling call-to-action section with gradient background. Drive conversions.',
      code: `import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-12 md:p-20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: \`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")\`,
            }} />
          </div>

          <div className="relative z-10 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Join thousands of developers building beautiful applications with our component library.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/60">
              No credit card required · 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.OTHER,
      tags: ['cta', 'call-to-action', 'conversion', 'gradient'],
      dependencies: JSON.stringify(['lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    {
      name: 'Navigation Header',
      slug: 'nav-header',
      description: 'A responsive navigation header with dropdown menus and mobile support.',
      code: `"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "#",
    children: [
      { name: "Analytics", href: "#", description: "Track your performance" },
      { name: "Automation", href: "#", description: "Streamline workflows" },
      { name: "Integrations", href: "#", description: "Connect your tools" },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export function NavHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Brand
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
                {item.children && <ChevronDown className="h-4 w-4" />}
              </Link>

              {item.children && openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-lg border bg-card p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
                    >
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-muted-foreground">{child.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Sign In</Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <div className="space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block py-1 text-sm text-muted-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.NAVIGATION,
      tags: ['navigation', 'header', 'navbar', 'responsive', 'dropdown'],
      dependencies: JSON.stringify(['lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    {
      name: 'Hero Split',
      slug: 'hero-split',
      description: 'A split-layout hero section with image and content. Great for product showcases.',
      code: `import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";

export function HeroSplit() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              New Release
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build products
              <span className="text-primary"> faster than ever</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Streamline your workflow with our intuitive platform. From idea to launch,
              we've got you covered with tools that just work.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold">10k+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">99%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-xl bg-card border shadow-2xl flex items-center justify-center">
                <span className="text-muted-foreground">Your Image Here</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.HERO,
      tags: ['hero', 'split', 'image', 'landing'],
      dependencies: JSON.stringify(['lucide-react']),
      registryDeps: ['button', 'badge'],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    {
      name: 'Features Alternating',
      slug: 'features-alternating',
      description: 'An alternating feature section with image and text blocks. Visual storytelling.',
      code: `"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Powerful Analytics",
    description: "Get deep insights into your application performance with our comprehensive analytics dashboard.",
    points: ["Real-time monitoring", "Custom reports", "Export to CSV/PDF"],
    imagePosition: "right" as const,
  },
  {
    title: "Team Collaboration",
    description: "Work together seamlessly with your team. Share projects, leave comments, and track changes.",
    points: ["Shared workspaces", "Comment threads", "Version history"],
    imagePosition: "left" as const,
  },
  {
    title: "Secure by Default",
    description: "Enterprise-grade security features to keep your data safe and compliant.",
    points: ["End-to-end encryption", "SOC 2 compliant", "Role-based access"],
    imagePosition: "right" as const,
  },
];

export function FeaturesAlternating() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you build, launch, and scale your products.
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={\`grid lg:grid-cols-2 gap-12 items-center \${
                feature.imagePosition === "left" ? "lg:flex-row-reverse" : ""
              }\`}
            >
              <div className={feature.imagePosition === "left" ? "lg:order-2" : ""}>
                <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-muted-foreground text-lg">{feature.description}</p>

                <ul className="mt-8 space-y-4">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={feature.imagePosition === "left" ? "lg:order-1" : ""}>
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border flex items-center justify-center">
                  <span className="text-muted-foreground">Feature Image {index + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.FREE,
      category: ComponentCategory.FEATURES,
      tags: ['features', 'alternating', 'showcase', 'animated'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: false,
    },
    // PRO Components
    {
      name: 'Particle Hero',
      slug: 'hero-particles',
      description: 'An eye-catching hero section with animated particle background. Premium animation effects.',
      code: `"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// PRO Component - Particle Hero
// This component creates an animated particle background effect

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(60, 179, 113, 0.6)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Introducing v2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Create stunning
            <span className="block bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              experiences
            </span>
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Build beautiful, animated interfaces with our premium component library.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Building
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.PRO,
      category: ComponentCategory.HERO,
      tags: ['hero', 'particles', 'animated', 'premium', 'canvas'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Stats Cards',
      slug: 'stats-cards-animated',
      description: 'Animated statistics cards with counting animation. Perfect for dashboards and landing pages.',
      code: `"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: 45231,
    prefix: "$",
    suffix: "",
    icon: DollarSign,
    change: "+20.1%",
    changeType: "positive" as const,
  },
  {
    label: "Active Users",
    value: 2350,
    prefix: "",
    suffix: "",
    icon: Users,
    change: "+18.2%",
    changeType: "positive" as const,
  },
  {
    label: "Total Sales",
    value: 12234,
    prefix: "",
    suffix: "",
    icon: ShoppingCart,
    change: "+12.5%",
    changeType: "positive" as const,
  },
  {
    label: "Growth Rate",
    value: 573,
    prefix: "",
    suffix: "%",
    icon: TrendingUp,
    change: "+4.3%",
    changeType: "positive" as const,
  },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsCardsAnimated() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
              </div>

              <div className="mt-2">
                <span className="text-sm text-emerald-500 font-medium">
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.PRO,
      category: ComponentCategory.DASHBOARD,
      tags: ['stats', 'dashboard', 'animated', 'cards', 'analytics'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    // Additional PRO Components
    {
      name: 'Command Palette',
      slug: 'command-palette',
      description: 'A keyboard-driven command palette like VS Code or Raycast. Navigate your app with keyboard shortcuts.',
      code: `"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Settings, User, Home, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const commands = [
  { id: "home", icon: Home, label: "Go to Home", shortcut: "G H", category: "Navigation" },
  { id: "settings", icon: Settings, label: "Open Settings", shortcut: "G S", category: "Navigation" },
  { id: "profile", icon: User, label: "View Profile", shortcut: "G P", category: "Navigation" },
  { id: "docs", icon: FileText, label: "Documentation", shortcut: "G D", category: "Navigation" },
  { id: "search", icon: Search, label: "Search Files", shortcut: "⌘ F", category: "Actions" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (!open) return;

      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        console.log("Selected:", filteredCommands[selectedIndex].label);
        setOpen(false);
      }
    },
    [open, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Search...</span>
        <kbd className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg z-50"
            >
              <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center px-4 border-b">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 px-3 py-4 bg-transparent outline-none"
                  />
                  <button onClick={() => setOpen(false)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Commands list */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {filteredCommands.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">No results found</p>
                  ) : (
                    filteredCommands.map((cmd, index) => (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          console.log("Selected:", cmd.label);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                          selectedIndex === index ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        )}
                      >
                        <cmd.icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{cmd.label}</span>
                        <kbd className="text-xs opacity-60">{cmd.shortcut}</kbd>
                      </button>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t bg-muted/50 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><ArrowRight className="h-3 w-3 rotate-[-90deg]" /> <ArrowRight className="h-3 w-3 rotate-90" /> Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.PRO,
      category: ComponentCategory.NAVIGATION,
      tags: ['command', 'palette', 'search', 'keyboard', 'navigation', 'premium'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: [],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Dashboard Layout',
      slug: 'dashboard-layout',
      description: 'A complete dashboard layout with sidebar, header, and content area. Ready for your app.',
      code: `"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <Link href="/" className="text-xl font-bold">
            Dashboard
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>

              {/* Search */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-muted">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-card shadow-lg py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-muted">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-muted">Settings</Link>
                    <hr className="my-1" />
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-red-500">Sign out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children || (
            <div className="rounded-xl border bg-card p-8 text-center">
              <p className="text-muted-foreground">Your content goes here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.PRO,
      category: ComponentCategory.DASHBOARD,
      tags: ['dashboard', 'layout', 'sidebar', 'admin', 'premium'],
      dependencies: JSON.stringify(['lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
    {
      name: 'Multi-Step Form',
      slug: 'multistep-form',
      description: 'A beautiful multi-step form wizard with progress indicator and validation states.',
      code: `"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, User, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Account", icon: User },
  { id: 2, title: "Profile", icon: Mail },
  { id: 3, title: "Security", icon: Lock },
  { id: 4, title: "Complete", icon: Sparkles },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                  currentStep > step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-24 h-0.5 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span
              key={step.id}
              className={cn(
                "text-sm",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="rounded-xl border bg-card p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Create your account</h2>
                <p className="text-muted-foreground">Enter your email to get started</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                <p className="text-muted-foreground">This helps us personalize your experience</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Secure your account</h2>
                <p className="text-muted-foreground">Choose a strong password</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
                <p className="text-muted-foreground mb-6">
                  Your account has been created successfully.
                </p>
                <Button size="lg">Go to Dashboard</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={nextStep}>
              {currentStep === 3 ? "Create Account" : "Continue"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}`,
      type: ComponentType.BLOCK,
      tier: ComponentTier.PRO,
      category: ComponentCategory.FORMS,
      tags: ['form', 'wizard', 'multi-step', 'onboarding', 'premium'],
      dependencies: JSON.stringify(['framer-motion', 'lucide-react']),
      registryDeps: ['button'],
      status: ComponentStatus.PUBLISHED,
      featured: true,
    },
  ];

  for (const component of sampleComponents) {
    await prisma.component.upsert({
      where: { slug: component.slug },
      update: {
        ...component,
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
      create: {
        ...component,
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
    });
  }
  console.log(`✅ Created ${sampleComponents.length} sample components\n`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
