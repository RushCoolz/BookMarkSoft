"use client";
import { ToolContainer, ToolMain, ToolSidebar } from "../ui/tool/ToolContainer";

export function DiceRollerBody() {
  return (
    <ToolContainer split="sidebar">
      <ToolSidebar>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Settings</h3>
          <p className="text-sm text-slate-500">Configure your tool here.</p>
        </div>
      </ToolSidebar>
      <ToolMain>
        <div className="flex items-center justify-center h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 min-h-[300px]">
          <p className="text-slate-400 dark:text-slate-500 font-medium text-center">UI Placeholder for<br/><strong className="text-xl text-slate-800 dark:text-slate-200 mt-2 block">DiceRollerBody</strong></p>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
