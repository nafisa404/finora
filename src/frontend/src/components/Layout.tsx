import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

interface LayoutProps {
  showSidebar?: boolean;
}

export function DashboardLayout({ showSidebar = true }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      {showSidebar && (
        <div className="hidden md:flex flex-shrink-0">
          <Sidebar />
        </div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 flex md:hidden bg-transparent p-0 max-w-none max-h-none w-full h-full m-0"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
          <div className="relative flex w-64 flex-col">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </dialog>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header
          showMenu={showSidebar}
          onMenuToggle={() => setMobileOpen(true)}
        />
        <main
          className="flex-1 overflow-y-auto bg-background"
          data-ocid="main_content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn("max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6", className)}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border shadow-card p-6 transition-smooth hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
