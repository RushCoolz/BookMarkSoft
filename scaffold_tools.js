const fs = require('fs');
const path = require('path');

const tools = [
  // Finance & Money
  'MortgageCalcBody', 'AutoLoanCalcBody', 'SalaryConverterBody', 'TipCalcBody', 'CompoundInterestBody',
  // Social Media & Creators
  'YtThumbnailBody', 'LineBreakGenBody', 'TweetToImageBody',
  // Webmaster & SEO
  'MetaTagGenBody', 'OpenGraphPreviewBody', 'RobotsTxtGenBody', 'CssMinifierBody',
  // Random Generators
  'RandomNumberBody', 'DiceRollerBody', 'FakeDataGenBody',
  // Network & IT
  'SubnetCalcBody', 'MacLookupBody',
  // Health & Fitness
  'BmiCalcBody', 'BmrCalcBody', 'MacroCalcBody', 'BacCalcBody',
  // Mobile & Devices
  'ScreenResolutionBody', 'DeviceInfoBody', 'ImeiCheckerBody', 'BatteryCalcBody',
  // Document Converters
  'WordToPdfBody', 'ExcelToPdfBody', 'PptToPdfBody'
];

const template = (name) => `"use client";
import { ToolContainer, ToolMain, ToolSidebar } from "../ui/tool/ToolContainer";

export function ${name}() {
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
          <p className="text-slate-400 dark:text-slate-500 font-medium text-center">UI Placeholder for<br/><strong className="text-xl text-slate-800 dark:text-slate-200 mt-2 block">${name}</strong></p>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
`;

const targetDir = path.join(__dirname, 'src', 'components', 'tools');

tools.forEach(tool => {
  const filePath = path.join(targetDir, `${tool}.tsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template(tool));
    console.log(`Created ${tool}.tsx`);
  } else {
    console.log(`Skipped ${tool}.tsx (already exists)`);
  }
});
console.log('Done scaffolding tools!');
