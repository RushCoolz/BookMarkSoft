"use client";
import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SeoContentBlock } from "@/components/SeoContentBlock";

import { PasswordGeneratorBody } from "@/components/tools/PasswordGeneratorBody";
import { JsonFormatterBody } from "@/components/tools/JsonFormatterBody";
import { Base64ToolBody } from "@/components/tools/Base64ToolBody";
import { UrlEncodeToolBody } from "@/components/tools/UrlEncodeToolBody";
import { UuidGeneratorBody } from "@/components/tools/UuidGeneratorBody";
import { MarkdownToHtmlBody } from "@/components/tools/MarkdownToHtmlBody";
import { HtmlFormatterBody } from "@/components/tools/HtmlFormatterBody";
import { CssFormatterBody } from "@/components/tools/CssFormatterBody";
import { XmlFormatterBody } from "@/components/tools/XmlFormatterBody";
import { SqlFormatterBody } from "@/components/tools/SqlFormatterBody";
import { WordCounterBody } from "@/components/tools/WordCounterBody";
import { CaseConverterBody } from "@/components/tools/CaseConverterBody";
import { RemoveDuplicatesBody } from "@/components/tools/RemoveDuplicatesBody";
import { SortLinesBody } from "@/components/tools/SortLinesBody";
import { LoremIpsumBody } from "@/components/tools/LoremIpsumBody";
import { StrengthCheckerBody } from "@/components/tools/StrengthCheckerBody";
import { AesEncryptBody } from "@/components/tools/AesEncryptBody";
import { HashGeneratorBody } from "@/components/tools/HashGeneratorBody";
import { IpAddressBody } from "@/components/tools/IpAddressBody";
import { Base64ImageBody } from "@/components/tools/Base64ImageBody";
import { ColorPickerBody } from "@/components/tools/ColorPickerBody";
import { ImageResizerBody } from "@/components/tools/ImageResizerBody";
import { SvgToPngBody } from "@/components/tools/SvgToPngBody";
import { JsonToCsvBody } from "@/components/tools/JsonToCsvBody";
import { CsvToJsonBody } from "@/components/tools/CsvToJsonBody";
import { YamlToJsonBody } from "@/components/tools/YamlToJsonBody";
import { XmlToJsonBody } from "@/components/tools/XmlToJsonBody";
import { PercentageCalculatorBody } from "@/components/tools/PercentageCalculatorBody";
import { RoiCalculatorBody } from "@/components/tools/RoiCalculatorBody";
import { MarginCalculatorBody } from "@/components/tools/MarginCalculatorBody";
import { RuleOf72Body } from "@/components/tools/RuleOf72Body";
import { MortgageCalcBody } from "@/components/tools/MortgageCalcBody";
import { AutoLoanCalcBody } from "@/components/tools/AutoLoanCalcBody";
import { SalaryConverterBody } from "@/components/tools/SalaryConverterBody";
import { TipCalcBody } from "@/components/tools/TipCalcBody";
import { CompoundInterestBody } from "@/components/tools/CompoundInterestBody";
import { YtThumbnailBody } from "@/components/tools/YtThumbnailBody";
import { LineBreakGenBody } from "@/components/tools/LineBreakGenBody";
import { TweetToImageBody } from "@/components/tools/TweetToImageBody";
import { MetaTagGenBody } from "@/components/tools/MetaTagGenBody";
import { OpenGraphPreviewBody } from "@/components/tools/OpenGraphPreviewBody";
import { RobotsTxtGenBody } from "@/components/tools/RobotsTxtGenBody";
import { CssMinifierBody } from "@/components/tools/CssMinifierBody";
import { RandomNumberBody } from "@/components/tools/RandomNumberBody";
import { DiceRollerBody } from "@/components/tools/DiceRollerBody";
import { FakeDataGenBody } from "@/components/tools/FakeDataGenBody";
import { SubnetCalcBody } from "@/components/tools/SubnetCalcBody";
import { MacLookupBody } from "@/components/tools/MacLookupBody";
import { BmiCalcBody } from "@/components/tools/BmiCalcBody";
import { BmrCalcBody } from "@/components/tools/BmrCalcBody";
import { MacroCalcBody } from "@/components/tools/MacroCalcBody";
import { BacCalcBody } from "@/components/tools/BacCalcBody";
import { ScreenResolutionBody } from "@/components/tools/ScreenResolutionBody";
import { DeviceInfoBody } from "@/components/tools/DeviceInfoBody";
import { ImeiCheckerBody } from "@/components/tools/ImeiCheckerBody";
import { BatteryCalcBody } from "@/components/tools/BatteryCalcBody";
import { WordToPdfBody } from "@/components/tools/WordToPdfBody";
import { ExcelToPdfBody } from "@/components/tools/ExcelToPdfBody";
import { PptToPdfBody } from "@/components/tools/PptToPdfBody";
import { HtmlEntitiesBody } from "@/components/tools/HtmlEntitiesBody";
import { DiffCheckerBody } from "@/components/tools/DiffCheckerBody";
import { RegexTesterBody } from "@/components/tools/RegexTesterBody";
import { MergePdfBody } from "@/components/tools/MergePdfBody";
import { SplitPdfBody } from "@/components/tools/SplitPdfBody";
import { ProtectPdfBody } from "@/components/tools/ProtectPdfBody";
import { SignatureGenBody } from "@/components/tools/SignatureGenBody";
import { LiveMarkdownBody } from "@/components/tools/LiveMarkdownBody";
import { WebpToPngJpgBody } from "@/components/tools/WebpToPngJpgBody";
import { AddWatermarkBody } from "@/components/tools/AddWatermarkBody";
import { PaletteGenBody } from "@/components/tools/PaletteGenBody";
import { IcoGeneratorBody } from "@/components/tools/IcoGeneratorBody";
import { UnitConverterBody } from "@/components/tools/UnitConverterBody";
import { UnixTimestampBody } from "@/components/tools/UnixTimestampBody";
import { DaysBetweenBody } from "@/components/tools/DaysBetweenBody";
import { TimezoneConvBody } from "@/components/tools/TimezoneConvBody";

interface ToolPageClientProps {
  tool: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconColor: string;
    isBeta?: boolean;
    isNew?: boolean;
  };
  toolId: string;
}

export function ToolPageClient({ tool, toolId }: ToolPageClientProps) {

  const renderToolBody = () => {
    if (toolId.includes("password-generator") || toolId.includes("password")) return <PasswordGeneratorBody />;
    if (toolId.includes("json-formatter")) return <JsonFormatterBody />;
    if (toolId.includes("base64-image")) return <Base64ImageBody />;
    if (toolId.includes("base64")) return <Base64ToolBody />;
    if (toolId.includes("url-encode")) return <UrlEncodeToolBody />;
    if (toolId.includes("uuid")) return <UuidGeneratorBody />;
    if (toolId.includes("markdown")) return <MarkdownToHtmlBody />;
    if (toolId.includes("html-formatter")) return <HtmlFormatterBody />;
    if (toolId.includes("css-formatter")) return <CssFormatterBody />;
    if (toolId.includes("xml-formatter")) return <XmlFormatterBody />;
    if (toolId.includes("sql-formatter")) return <SqlFormatterBody />;
    if (toolId.includes("word-char")) return <WordCounterBody />;
    if (toolId.includes("case-converter")) return <CaseConverterBody />;
    if (toolId.includes("remove-duplicates")) return <RemoveDuplicatesBody />;
    if (toolId.includes("sort-lines")) return <SortLinesBody />;
    if (toolId.includes("lorem-ipsum")) return <LoremIpsumBody />;
    if (toolId.includes("strength-checker")) return <StrengthCheckerBody />;
    if (toolId.includes("aes-encrypt")) return <AesEncryptBody />;
    if (toolId.includes("hash-generator")) return <HashGeneratorBody />;
    if (toolId.includes("my-ip-address")) return <IpAddressBody />;
    if (toolId.includes("color-picker")) return <ColorPickerBody />;
    if (toolId.includes("image-resizer")) return <ImageResizerBody />;
    if (toolId.includes("svg-to-png")) return <SvgToPngBody />;
    if (toolId.includes("json-to-csv")) return <JsonToCsvBody />;
    if (toolId.includes("csv-to-json")) return <CsvToJsonBody />;
    if (toolId.includes("yaml-to-json")) return <YamlToJsonBody />;
    if (toolId.includes("xml-to-json")) return <XmlToJsonBody />;
    if (toolId.includes("percentage-calc")) return <PercentageCalculatorBody />;
    if (toolId.includes("roi-calculator")) return <RoiCalculatorBody />;
    if (toolId.includes("margin-calc")) return <MarginCalculatorBody />;
    if (toolId.includes("rule-of-72")) return <RuleOf72Body />;
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

    // New 16 Tools
    if (toolId.includes("html-entities")) return <HtmlEntitiesBody />;
    if (toolId.includes("diff-checker")) return <DiffCheckerBody />;
    if (toolId.includes("regex-tester")) return <RegexTesterBody />;
    if (toolId.includes("merge-pdf")) return <MergePdfBody />;
    if (toolId.includes("split-pdf")) return <SplitPdfBody />;
    if (toolId.includes("password-protect")) return <ProtectPdfBody />;
    if (toolId.includes("signature-gen")) return <SignatureGenBody />;
    if (toolId.includes("live-markdown")) return <LiveMarkdownBody />;
    if (toolId.includes("webp-to-png-jpg")) return <WebpToPngJpgBody />;
    if (toolId.includes("add-watermark")) return <AddWatermarkBody />;
    if (toolId.includes("palette-gen")) return <PaletteGenBody />;
    if (toolId.includes("ico-generator")) return <IcoGeneratorBody />;
    if (toolId.includes("unit-converter")) return <UnitConverterBody />;
    if (toolId.includes("unix-timestamp")) return <UnixTimestampBody />;
    if (toolId.includes("days-between")) return <DaysBetweenBody />;
    if (toolId.includes("timezone-conv")) return <TimezoneConvBody />;
    
    // Default fallback
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 dark:text-slate-400">
        <div className={`mb-6 ${tool.iconColor} opacity-50 scale-150`}>{tool.icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">Tool Under Construction</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center">The {tool.title} interface is currently being built. Check back soon!</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pt-4 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 px-2">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className={`w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center ${tool.iconColor}`}>
          {tool.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{tool.title}</h1>
            {tool.isBeta && <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded uppercase tracking-wider">BETA</span>}
            {tool.isNew && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded uppercase tracking-wider">NEW</span>}
          </div>
          <p className="text-slate-500 dark:text-slate-400">{tool.subtitle}</p>
        </div>
      </div>

      {/* Tool Body Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 min-h-[60vh]">
        {renderToolBody()}
      </div>

      <SeoContentBlock title={tool.title} subtitle={tool.subtitle} />
    </div>
  );
}
