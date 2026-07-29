"use client";
import { X, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { PasswordGeneratorBody } from "./tools/PasswordGeneratorBody";
import { JsonFormatterBody } from "./tools/JsonFormatterBody";
import { Base64ToolBody } from "./tools/Base64ToolBody";
import { UrlEncodeToolBody } from "./tools/UrlEncodeToolBody";
import { UuidGeneratorBody } from "./tools/UuidGeneratorBody";
import { MarkdownToHtmlBody } from "./tools/MarkdownToHtmlBody";
import { HtmlFormatterBody } from "./tools/HtmlFormatterBody";
import { CssFormatterBody } from "./tools/CssFormatterBody";
import { XmlFormatterBody } from "./tools/XmlFormatterBody";
import { SqlFormatterBody } from "./tools/SqlFormatterBody";
import { WordCounterBody } from "./tools/WordCounterBody";
import { CaseConverterBody } from "./tools/CaseConverterBody";
import { RemoveDuplicatesBody } from "./tools/RemoveDuplicatesBody";
import { SortLinesBody } from "./tools/SortLinesBody";
import { LoremIpsumBody } from "./tools/LoremIpsumBody";
import { StrengthCheckerBody } from "./tools/StrengthCheckerBody";
import { AesEncryptBody } from "./tools/AesEncryptBody";
import { HashGeneratorBody } from "./tools/HashGeneratorBody";
import { IpAddressBody } from "./tools/IpAddressBody";
import { Base64ImageBody } from "./tools/Base64ImageBody";
import { ColorPickerBody } from "./tools/ColorPickerBody";
import { ImageResizerBody } from "./tools/ImageResizerBody";
import { SvgToPngBody } from "./tools/SvgToPngBody";
import { JsonToCsvBody } from "./tools/JsonToCsvBody";
import { CsvToJsonBody } from "./tools/CsvToJsonBody";
import { YamlToJsonBody } from "./tools/YamlToJsonBody";
import { XmlToJsonBody } from "./tools/XmlToJsonBody";
import { PercentageCalculatorBody } from "./tools/PercentageCalculatorBody";
import { RoiCalculatorBody } from "./tools/RoiCalculatorBody";
import { MarginCalculatorBody } from "./tools/MarginCalculatorBody";
import { RuleOf72Body } from "./tools/RuleOf72Body";
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

interface ToolModalShellProps {
  tool: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconColor: string;
    isBeta?: boolean;
    isNew?: boolean;
  };
  onClose: () => void;
}

export function ToolModalShell({ tool, onClose }: ToolModalShellProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toolId = tool.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const renderToolBody = () => {
    // We map tool IDs to their specific bodies
    if (toolId.includes("password-generator") || toolId.includes("password")) {
      return <PasswordGeneratorBody />;
    }
    if (toolId.includes("json-formatter")) {
      return <JsonFormatterBody />;
    }
    if (toolId.includes("base64-image")) {
      return <Base64ImageBody />;
    }
    if (toolId.includes("base64")) {
      return <Base64ToolBody />;
    }
    if (toolId.includes("url-encode")) {
      return <UrlEncodeToolBody />;
    }
    if (toolId.includes("uuid")) {
      return <UuidGeneratorBody />;
    }
    if (toolId.includes("markdown")) {
      return <MarkdownToHtmlBody />;
    }
    if (toolId.includes("html-formatter")) {
      return <HtmlFormatterBody />;
    }
    if (toolId.includes("css-formatter")) {
      return <CssFormatterBody />;
    }
    if (toolId.includes("xml-formatter")) {
      return <XmlFormatterBody />;
    }
    if (toolId.includes("sql-formatter")) {
      return <SqlFormatterBody />;
    }
    if (toolId.includes("word-char")) {
      return <WordCounterBody />;
    }
    if (toolId.includes("case-converter")) {
      return <CaseConverterBody />;
    }
    if (toolId.includes("remove-duplicates")) {
      return <RemoveDuplicatesBody />;
    }
    if (toolId.includes("sort-lines")) {
      return <SortLinesBody />;
    }
    if (toolId.includes("lorem-ipsum")) {
      return <LoremIpsumBody />;
    }
    if (toolId.includes("strength-checker")) {
      return <StrengthCheckerBody />;
    }
    if (toolId.includes("aes-encrypt")) {
      return <AesEncryptBody />;
    }
    if (toolId.includes("hash-generator")) {
      return <HashGeneratorBody />;
    }
    if (toolId.includes("my-ip-address")) {
      return <IpAddressBody />;
    }

    if (toolId.includes("color-picker")) {
      return <ColorPickerBody />;
    }
    if (toolId.includes("image-resizer")) {
      return <ImageResizerBody />;
    }
    if (toolId.includes("svg-to-png")) {
      return <SvgToPngBody />;
    }
    if (toolId.includes("json-to-csv")) {
      return <JsonToCsvBody />;
    }
    if (toolId.includes("csv-to-json")) {
      return <CsvToJsonBody />;
    }
    if (toolId.includes("yaml-to-json")) {
      return <YamlToJsonBody />;
    }
    if (toolId.includes("xml-to-json")) {
      return <XmlToJsonBody />;
    }
    if (toolId.includes("percentage-calc")) {
      return <PercentageCalculatorBody />;
    }
    if (toolId.includes("roi-calculator")) {
      return <RoiCalculatorBody />;
    }
    if (toolId.includes("margin-calc")) {
      return <MarginCalculatorBody />;
    }
    if (toolId.includes("rule-of-72")) {
      return <RuleOf72Body />;
    }
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
    
    // Default fallback for tools not built yet
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 dark:text-slate-400">
        <div className={`mb-6 ${tool.iconColor} opacity-50 scale-150`}>{tool.icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">Tool Under Construction</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center">The {tool.title} interface is currently being built. Check back soon!</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800">
        
        {/* Standard Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center ${tool.iconColor}`}>
              {tool.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{tool.title}</h2>
                {tool.isBeta && <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded uppercase tracking-wider">BETA</span>}
                {tool.isNew && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded uppercase tracking-wider">NEW</span>}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{tool.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
              <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">Open Full Page</span>
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-6 md:p-8 custom-scrollbar">
          {renderToolBody()}
        </div>
      </div>
    </div>
  );
}
