const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'ToolModalShell.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

const newImports = \`
import { MortgageCalcBody } from "./tools/MortgageCalcBody";
import { AutoLoanCalcBody } from "./tools/AutoLoanCalcBody";
import { SalaryConverterBody } from "./tools/SalaryConverterBody";
import { TipCalcBody } from "./tools/TipCalcBody";
import { CompoundInterestBody } from "./tools/CompoundInterestBody";
import { YtThumbnailBody } from "./tools/YtThumbnailBody";
import { LineBreakGenBody } from "./tools/LineBreakGenBody";
import { TweetToImageBody } from "./tools/TweetToImageBody";
import { MetaTagGenBody } from "./tools/MetaTagGenBody";
import { OpenGraphPreviewBody } from "./tools/OpenGraphPreviewBody";
import { RobotsTxtGenBody } from "./tools/RobotsTxtGenBody";
import { CssMinifierBody } from "./tools/CssMinifierBody";
import { RandomNumberBody } from "./tools/RandomNumberBody";
import { DiceRollerBody } from "./tools/DiceRollerBody";
import { FakeDataGenBody } from "./tools/FakeDataGenBody";
import { SubnetCalcBody } from "./tools/SubnetCalcBody";
import { MacLookupBody } from "./tools/MacLookupBody";
import { BmiCalcBody } from "./tools/BmiCalcBody";
import { BmrCalcBody } from "./tools/BmrCalcBody";
import { MacroCalcBody } from "./tools/MacroCalcBody";
import { BacCalcBody } from "./tools/BacCalcBody";
import { ScreenResolutionBody } from "./tools/ScreenResolutionBody";
import { DeviceInfoBody } from "./tools/DeviceInfoBody";
import { ImeiCheckerBody } from "./tools/ImeiCheckerBody";
import { BatteryCalcBody } from "./tools/BatteryCalcBody";
import { WordToPdfBody } from "./tools/WordToPdfBody";
import { ExcelToPdfBody } from "./tools/ExcelToPdfBody";
import { PptToPdfBody } from "./tools/PptToPdfBody";
\`;

content = content.replace(/(import \{ RuleOf72Body \} from "\.\/tools\/RuleOf72Body";)/, \`$1\${newImports}\`);

const newStatements = \`
    if (toolId.includes("word-to-pdf")) return <WordToPdfBody />;
    if (toolId.includes("excel-to-pdf")) return <ExcelToPdfBody />;
    if (toolId.includes("ppt-to-pdf")) return <PptToPdfBody />;
    if (toolId.includes("mortgage-calc")) return <MortgageCalcBody />;
    if (toolId.includes("auto-loan")) return <AutoLoanCalcBody />;
    if (toolId.includes("salary-conv")) return <SalaryConverterBody />;
    if (toolId.includes("tip-calc")) return <TipCalcBody />;
    if (toolId.includes("compound-int")) return <CompoundInterestBody />;
    if (toolId.includes("bmi-calculator")) return <BmiCalcBody />;
    if (toolId.includes("bmr")) return <BmrCalcBody />;
    if (toolId.includes("macro-calc")) return <MacroCalcBody />;
    if (toolId.includes("bac-calc")) return <BacCalcBody />;
    if (toolId.includes("meta-tag")) return <MetaTagGenBody />;
    if (toolId.includes("open-graph")) return <OpenGraphPreviewBody />;
    if (toolId.includes("yt-thumbnail")) return <YtThumbnailBody />;
    if (toolId.includes("css-minifier")) return <CssMinifierBody />;
    if (toolId.includes("robots-txt")) return <RobotsTxtGenBody />;
    if (toolId.includes("line-break")) return <LineBreakGenBody />;
    if (toolId.includes("tweet-to-image")) return <TweetToImageBody />;
    if (toolId.includes("random-number")) return <RandomNumberBody />;
    if (toolId.includes("dice-roller")) return <DiceRollerBody />;
    if (toolId.includes("fake-data")) return <FakeDataGenBody />;
    if (toolId.includes("subnet-calc")) return <SubnetCalcBody />;
    if (toolId.includes("mac-lookup")) return <MacLookupBody />;
    if (toolId.includes("screen-res")) return <ScreenResolutionBody />;
    if (toolId.includes("device-info")) return <DeviceInfoBody />;
    if (toolId.includes("imei-checker")) return <ImeiCheckerBody />;
    if (toolId.includes("battery-calc")) return <BatteryCalcBody />;
\`;

content = content.replace(/(if \\(toolId\.includes\\("rule-of-72"\\)\\) \\{\\s*return <RuleOf72Body \/>;\\s*\\})/, \`$1\${newStatements}\`);

fs.writeFileSync(targetPath, content);
console.log('Done updating ToolModalShell.tsx');
