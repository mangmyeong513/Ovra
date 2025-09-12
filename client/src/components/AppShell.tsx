// src/components/AppShell.tsx
import React from "react";
import SideNav from "./SideNav";
import RightRail from "./RightRail";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur">
        <div className="mx-auto max-w-[1400px] flex items-center gap-3 px-6 h-14">
          <TopBar />
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] grid grid-cols-[260px_minmax(680px,1fr)_360px] gap-6 px-6 py-6">
        <aside>
          <SideNav />
        </aside>
        <section className="max-w-[820px] mx-auto w-full">{children}</section>
        <aside className="hidden xl:block">
          <RightRail />
        </aside>
      </main>
    </div>
  );
}
