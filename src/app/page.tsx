import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <Hero />
      <Suspense fallback={<div>Loading tools...</div>}>
        <ToolsGrid />
      </Suspense>
    </div>
  );
}
