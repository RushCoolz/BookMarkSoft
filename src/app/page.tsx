import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <Hero />
      <ToolsGrid />
    </div>
  );
}
