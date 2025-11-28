import { RegistryService } from "@/services/registry.service";
import { ComponentsSidebar } from "@/components/components/components-sidebar";

export default async function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all components for the sidebar
  const { components } = await RegistryService.getIndex({ limit: 500 });

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] shrink-0">
        <ComponentsSidebar components={components} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
