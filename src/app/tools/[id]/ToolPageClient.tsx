"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { SeoContentBlock } from "@/components/SeoContentBlock";

const PasswordGeneratorBody = dynamic(() => import('@/components/tools/PasswordGeneratorBody').then(mod => mod.PasswordGeneratorBody), { ssr: false });
const JsonFormatterBody = dynamic(() => import('@/components/tools/JsonFormatterBody').then(mod => mod.JsonFormatterBody), { ssr: false });
const Base64ToolBody = dynamic(() => import('@/components/tools/Base64ToolBody').then(mod => mod.Base64ToolBody), { ssr: false });
const UrlEncodeToolBody = dynamic(() => import('@/components/tools/UrlEncodeToolBody').then(mod => mod.UrlEncodeToolBody), { ssr: false });
const UuidGeneratorBody = dynamic(() => import('@/components/tools/UuidGeneratorBody').then(mod => mod.UuidGeneratorBody), { ssr: false });
const MarkdownToHtmlBody = dynamic(() => import('@/components/tools/MarkdownToHtmlBody').then(mod => mod.MarkdownToHtmlBody), { ssr: false });
const HtmlFormatterBody = dynamic(() => import('@/components/tools/HtmlFormatterBody').then(mod => mod.HtmlFormatterBody), { ssr: false });
const CssFormatterBody = dynamic(() => import('@/components/tools/CssFormatterBody').then(mod => mod.CssFormatterBody), { ssr: false });
const XmlFormatterBody = dynamic(() => import('@/components/tools/XmlFormatterBody').then(mod => mod.XmlFormatterBody), { ssr: false });
const SqlFormatterBody = dynamic(() => import('@/components/tools/SqlFormatterBody').then(mod => mod.SqlFormatterBody), { ssr: false });
const WordCounterBody = dynamic(() => import('@/components/tools/WordCounterBody').then(mod => mod.WordCounterBody), { ssr: false });
const CaseConverterBody = dynamic(() => import('@/components/tools/CaseConverterBody').then(mod => mod.CaseConverterBody), { ssr: false });
const RemoveDuplicatesBody = dynamic(() => import('@/components/tools/RemoveDuplicatesBody').then(mod => mod.RemoveDuplicatesBody), { ssr: false });
const SortLinesBody = dynamic(() => import('@/components/tools/SortLinesBody').then(mod => mod.SortLinesBody), { ssr: false });
const LoremIpsumBody = dynamic(() => import('@/components/tools/LoremIpsumBody').then(mod => mod.LoremIpsumBody), { ssr: false });
const StrengthCheckerBody = dynamic(() => import('@/components/tools/StrengthCheckerBody').then(mod => mod.StrengthCheckerBody), { ssr: false });
const AesEncryptBody = dynamic(() => import('@/components/tools/AesEncryptBody').then(mod => mod.AesEncryptBody), { ssr: false });
const HashGeneratorBody = dynamic(() => import('@/components/tools/HashGeneratorBody').then(mod => mod.HashGeneratorBody), { ssr: false });
const IpAddressBody = dynamic(() => import('@/components/tools/IpAddressBody').then(mod => mod.IpAddressBody), { ssr: false });
const Base64ImageBody = dynamic(() => import('@/components/tools/Base64ImageBody').then(mod => mod.Base64ImageBody), { ssr: false });
const ColorPickerBody = dynamic(() => import('@/components/tools/ColorPickerBody').then(mod => mod.ColorPickerBody), { ssr: false });
const ImageResizerBody = dynamic(() => import('@/components/tools/ImageResizerBody').then(mod => mod.ImageResizerBody), { ssr: false });
const SvgToPngBody = dynamic(() => import('@/components/tools/SvgToPngBody').then(mod => mod.SvgToPngBody), { ssr: false });
const JsonToCsvBody = dynamic(() => import('@/components/tools/JsonToCsvBody').then(mod => mod.JsonToCsvBody), { ssr: false });
const CsvToJsonBody = dynamic(() => import('@/components/tools/CsvToJsonBody').then(mod => mod.CsvToJsonBody), { ssr: false });
const YamlToJsonBody = dynamic(() => import('@/components/tools/YamlToJsonBody').then(mod => mod.YamlToJsonBody), { ssr: false });
const XmlToJsonBody = dynamic(() => import('@/components/tools/XmlToJsonBody').then(mod => mod.XmlToJsonBody), { ssr: false });
const PercentageCalculatorBody = dynamic(() => import('@/components/tools/PercentageCalculatorBody').then(mod => mod.PercentageCalculatorBody), { ssr: false });
const RoiCalculatorBody = dynamic(() => import('@/components/tools/RoiCalculatorBody').then(mod => mod.RoiCalculatorBody), { ssr: false });
const MarginCalculatorBody = dynamic(() => import('@/components/tools/MarginCalculatorBody').then(mod => mod.MarginCalculatorBody), { ssr: false });
const RuleOf72Body = dynamic(() => import('@/components/tools/RuleOf72Body').then(mod => mod.RuleOf72Body), { ssr: false });
const MortgageCalcBody = dynamic(() => import('@/components/tools/MortgageCalcBody').then(mod => mod.MortgageCalcBody), { ssr: false });
const AutoLoanCalcBody = dynamic(() => import('@/components/tools/AutoLoanCalcBody').then(mod => mod.AutoLoanCalcBody), { ssr: false });
const SalaryConverterBody = dynamic(() => import('@/components/tools/SalaryConverterBody').then(mod => mod.SalaryConverterBody), { ssr: false });
const TipCalcBody = dynamic(() => import('@/components/tools/TipCalcBody').then(mod => mod.TipCalcBody), { ssr: false });
const CompoundInterestBody = dynamic(() => import('@/components/tools/CompoundInterestBody').then(mod => mod.CompoundInterestBody), { ssr: false });
const LineBreakGenBody = dynamic(() => import('@/components/tools/LineBreakGenBody').then(mod => mod.LineBreakGenBody), { ssr: false });
const MetaTagGenBody = dynamic(() => import('@/components/tools/MetaTagGenBody').then(mod => mod.MetaTagGenBody), { ssr: false });
const RobotsTxtGenBody = dynamic(() => import('@/components/tools/RobotsTxtGenBody').then(mod => mod.RobotsTxtGenBody), { ssr: false });
const CssMinifierBody = dynamic(() => import('@/components/tools/CssMinifierBody').then(mod => mod.CssMinifierBody), { ssr: false });
const RandomNumberBody = dynamic(() => import('@/components/tools/RandomNumberBody').then(mod => mod.RandomNumberBody), { ssr: false });
const DiceRollerBody = dynamic(() => import('@/components/tools/DiceRollerBody').then(mod => mod.DiceRollerBody), { ssr: false });
const FakeDataGenBody = dynamic(() => import('@/components/tools/FakeDataGenBody').then(mod => mod.FakeDataGenBody), { ssr: false });
const SubnetCalcBody = dynamic(() => import('@/components/tools/SubnetCalcBody').then(mod => mod.SubnetCalcBody), { ssr: false });
const BmiCalcBody = dynamic(() => import('@/components/tools/BmiCalcBody').then(mod => mod.BmiCalcBody), { ssr: false });
const BmrCalcBody = dynamic(() => import('@/components/tools/BmrCalcBody').then(mod => mod.BmrCalcBody), { ssr: false });
const MacroCalcBody = dynamic(() => import('@/components/tools/MacroCalcBody').then(mod => mod.MacroCalcBody), { ssr: false });
const BacCalcBody = dynamic(() => import('@/components/tools/BacCalcBody').then(mod => mod.BacCalcBody), { ssr: false });
const ScreenResolutionBody = dynamic(() => import('@/components/tools/ScreenResolutionBody').then(mod => mod.ScreenResolutionBody), { ssr: false });
const DeviceInfoBody = dynamic(() => import('@/components/tools/DeviceInfoBody').then(mod => mod.DeviceInfoBody), { ssr: false });
const BatteryCalcBody = dynamic(() => import('@/components/tools/BatteryCalcBody').then(mod => mod.BatteryCalcBody), { ssr: false });
const HtmlEntitiesBody = dynamic(() => import('@/components/tools/HtmlEntitiesBody').then(mod => mod.HtmlEntitiesBody), { ssr: false });
const DiffCheckerBody = dynamic(() => import('@/components/tools/DiffCheckerBody').then(mod => mod.DiffCheckerBody), { ssr: false });
const RegexTesterBody = dynamic(() => import('@/components/tools/RegexTesterBody').then(mod => mod.RegexTesterBody), { ssr: false });
const MergePdfBody = dynamic(() => import('@/components/tools/MergePdfBody').then(mod => mod.MergePdfBody), { ssr: false });
const SplitPdfBody = dynamic(() => import('@/components/tools/SplitPdfBody').then(mod => mod.SplitPdfBody), { ssr: false });
const ProtectPdfBody = dynamic(() => import('@/components/tools/ProtectPdfBody').then(mod => mod.ProtectPdfBody), { ssr: false });
const SignatureGenBody = dynamic(() => import('@/components/tools/SignatureGenBody').then(mod => mod.SignatureGenBody), { ssr: false });
const LiveMarkdownBody = dynamic(() => import('@/components/tools/LiveMarkdownBody').then(mod => mod.LiveMarkdownBody), { ssr: false });
const WebpToPngJpgBody = dynamic(() => import('@/components/tools/WebpToPngJpgBody').then(mod => mod.WebpToPngJpgBody), { ssr: false });
const AddWatermarkBody = dynamic(() => import('@/components/tools/AddWatermarkBody').then(mod => mod.AddWatermarkBody), { ssr: false });
const PaletteGenBody = dynamic(() => import('@/components/tools/PaletteGenBody').then(mod => mod.PaletteGenBody), { ssr: false });
const IcoGeneratorBody = dynamic(() => import('@/components/tools/IcoGeneratorBody').then(mod => mod.IcoGeneratorBody), { ssr: false });
const UnitConverterBody = dynamic(() => import('@/components/tools/UnitConverterBody').then(mod => mod.UnitConverterBody), { ssr: false });
const UnixTimestampBody = dynamic(() => import('@/components/tools/UnixTimestampBody').then(mod => mod.UnixTimestampBody), { ssr: false });
const DaysBetweenBody = dynamic(() => import('@/components/tools/DaysBetweenBody').then(mod => mod.DaysBetweenBody), { ssr: false });
const TimezoneConvBody = dynamic(() => import('@/components/tools/TimezoneConvBody').then(mod => mod.TimezoneConvBody), { ssr: false });


const CurrencyConverterBody = dynamic(() => import('@/components/tools/CurrencyConverterBody').then(mod => mod.CurrencyConverterBody), { ssr: false });
const CryptoTrackerBody = dynamic(() => import('@/components/tools/CryptoTrackerBody').then(mod => mod.CryptoTrackerBody), { ssr: false });
const MacLookupBody = dynamic(() => import('@/components/tools/MacLookupBody').then(mod => mod.MacLookupBody), { ssr: false });
const DnsLookupBody = dynamic(() => import('@/components/tools/DnsLookupBody').then(mod => mod.DnsLookupBody), { ssr: false });
const WhoisLookupBody = dynamic(() => import('@/components/tools/WhoisLookupBody').then(mod => mod.WhoisLookupBody), { ssr: false });
const WeatherDashboardBody = dynamic(() => import('@/components/tools/WeatherDashboardBody').then(mod => mod.WeatherDashboardBody), { ssr: false });
const CountryInfoBody = dynamic(() => import('@/components/tools/CountryInfoBody').then(mod => mod.CountryInfoBody), { ssr: false });
const HolidaysFinderBody = dynamic(() => import('@/components/tools/HolidaysFinderBody').then(mod => mod.HolidaysFinderBody), { ssr: false });
const DictionaryBody = dynamic(() => import('@/components/tools/DictionaryBody').then(mod => mod.DictionaryBody), { ssr: false });
const GithubProfileBody = dynamic(() => import('@/components/tools/GithubProfileBody').then(mod => mod.GithubProfileBody), { ssr: false });
const NpmExplorerBody = dynamic(() => import('@/components/tools/NpmExplorerBody').then(mod => mod.NpmExplorerBody), { ssr: false });
const ApiTesterBody = dynamic(() => import('@/components/tools/ApiTesterBody').then(mod => mod.ApiTesterBody), { ssr: false });
const QuoteGeneratorBody = dynamic(() => import('@/components/tools/QuoteGeneratorBody').then(mod => mod.QuoteGeneratorBody), { ssr: false });
const JokeGeneratorBody = dynamic(() => import('@/components/tools/JokeGeneratorBody').then(mod => mod.JokeGeneratorBody), { ssr: false });
const AnimalPictureBody = dynamic(() => import('@/components/tools/AnimalPictureBody').then(mod => mod.AnimalPictureBody), { ssr: false });

const ResistorCalculatorBody = dynamic(() => import('@/components/tools/ResistorCalculatorBody').then(mod => mod.ResistorCalculatorBody), { ssr: false });
const OhmsLawBody = dynamic(() => import('@/components/tools/OhmsLawBody').then(mod => mod.OhmsLawBody), { ssr: false });
const AwgConverterBody = dynamic(() => import('@/components/tools/AwgConverterBody').then(mod => mod.AwgConverterBody), { ssr: false });
const VinDecoderBody = dynamic(() => import('@/components/tools/VinDecoderBody').then(mod => mod.VinDecoderBody), { ssr: false });
const CarModelLookupBody = dynamic(() => import('@/components/tools/CarModelLookupBody').then(mod => mod.CarModelLookupBody), { ssr: false });
const FuelCostCalculatorBody = dynamic(() => import('@/components/tools/FuelCostCalculatorBody').then(mod => mod.FuelCostCalculatorBody), { ssr: false });
const AqiRadarBody = dynamic(() => import('@/components/tools/AqiRadarBody').then(mod => mod.AqiRadarBody), { ssr: false });
const CarbonFootprintBody = dynamic(() => import('@/components/tools/CarbonFootprintBody').then(mod => mod.CarbonFootprintBody), { ssr: false });
const SunlightCalculatorBody = dynamic(() => import('@/components/tools/SunlightCalculatorBody').then(mod => mod.SunlightCalculatorBody), { ssr: false });
const BarcodeScannerBody = dynamic(() => import('@/components/tools/BarcodeScannerBody').then(mod => mod.BarcodeScannerBody), { ssr: false });
const IsItDownBody = dynamic(() => import('@/components/tools/IsItDownBody').then(mod => mod.IsItDownBody), { ssr: false });
const WhatIsMyIpBody = dynamic(() => import('@/components/tools/WhatIsMyIpBody').then(mod => mod.WhatIsMyIpBody), { ssr: false });
const BrowserFingerprintBody = dynamic(() => import('@/components/tools/BrowserFingerprintBody').then(mod => mod.BrowserFingerprintBody), { ssr: false });
const MacroCalculatorBody = dynamic(() => import('@/components/tools/MacroCalculatorBody').then(mod => mod.MacroCalculatorBody), { ssr: false });
const BmiCalculatorBody = dynamic(() => import('@/components/tools/BmiCalculatorBody').then(mod => mod.BmiCalculatorBody), { ssr: false });
const JwtDecoderBody = dynamic(() => import('@/components/tools/JwtDecoderBody').then(mod => mod.JwtDecoderBody), { ssr: false });
const GlassmorphismGenBody = dynamic(() => import('@/components/tools/GlassmorphismGenBody').then(mod => mod.GlassmorphismGenBody), { ssr: false });
const BoxShadowGenBody = dynamic(() => import('@/components/tools/BoxShadowGenBody').then(mod => mod.BoxShadowGenBody), { ssr: false });
const CssClipPathBody = dynamic(() => import('@/components/tools/CssClipPathBody').then(mod => mod.CssClipPathBody), { ssr: false });
const SvgBlobGenBody = dynamic(() => import('@/components/tools/SvgBlobGenBody').then(mod => mod.SvgBlobGenBody), { ssr: false });
const TypeScaleCalcBody = dynamic(() => import('@/components/tools/TypeScaleCalcBody').then(mod => mod.TypeScaleCalcBody), { ssr: false });

const UtmLinkBuilderBody = dynamic(() => import('@/components/tools/UtmLinkBuilderBody').then(mod => mod.UtmLinkBuilderBody), { ssr: false });
const SlugConverterBody = dynamic(() => import('@/components/tools/SlugConverterBody').then(mod => mod.SlugConverterBody), { ssr: false });
const PomodoroTimerBody = dynamic(() => import('@/components/tools/PomodoroTimerBody').then(mod => mod.PomodoroTimerBody), { ssr: false });
const SeoSerpPreviewBody = dynamic(() => import('@/components/tools/SeoSerpPreviewBody').then(mod => mod.SeoSerpPreviewBody), { ssr: false });
const EmailSignatureGenBody = dynamic(() => import('@/components/tools/EmailSignatureGenBody').then(mod => mod.EmailSignatureGenBody), { ssr: false });
const LocalKanbanBody = dynamic(() => import('@/components/tools/LocalKanbanBody').then(mod => mod.LocalKanbanBody), { ssr: false });
const CronJobGenBody = dynamic(() => import('@/components/tools/CronJobGenBody').then(mod => mod.CronJobGenBody), { ssr: false });

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
  const router = useRouter();

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
    if (toolId.includes("mortgage-calc")) return <MortgageCalcBody />;
    if (toolId.includes("auto-loan")) return <AutoLoanCalcBody />;
    if (toolId.includes("salary-conv")) return <SalaryConverterBody />;
    if (toolId.includes("tip-calc")) return <TipCalcBody />;
    if (toolId.includes("compound-int")) return <CompoundInterestBody />;
    if (toolId.includes("bmi-calculator")) return <BmiCalculatorBody />;
    if (toolId.includes("bmr")) return <BmrCalcBody />;
    if (toolId.includes("macro-calc")) return <MacroCalculatorBody />;
    if (toolId.includes("bac-calc")) return <BacCalcBody />;
    if (toolId.includes("meta-tag")) return <MetaTagGenBody />;
    if (toolId.includes("css-minifier")) return <CssMinifierBody />;
    if (toolId.includes("robots-txt")) return <RobotsTxtGenBody />;
    if (toolId.includes("line-break")) return <LineBreakGenBody />;
    if (toolId.includes("random-number")) return <RandomNumberBody />;
    if (toolId.includes("dice-roller")) return <DiceRollerBody />;
    if (toolId.includes("fake-data")) return <FakeDataGenBody />;
    if (toolId.includes("subnet-calc")) return <SubnetCalcBody />;
    if (toolId.includes("screen-res")) return <ScreenResolutionBody />;
    if (toolId.includes("device-info")) return <DeviceInfoBody />;
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
    

    if (toolId.includes("currency-conv")) return <CurrencyConverterBody />;
    if (toolId.includes("crypto-tracker")) return <CryptoTrackerBody />;
    if (toolId.includes("mac-lookup")) return <MacLookupBody />;
    if (toolId.includes("dns-lookup")) return <DnsLookupBody />;
    if (toolId.includes("whois-lookup")) return <WhoisLookupBody />;
    if (toolId.includes("weather-dash")) return <WeatherDashboardBody />;
    if (toolId.includes("country-info")) return <CountryInfoBody />;
    if (toolId.includes("public-holidays")) return <HolidaysFinderBody />;
    if (toolId.includes("dictionary")) return <DictionaryBody />;
    if (toolId.includes("github-profile")) return <GithubProfileBody />;
    if (toolId.includes("npm-explorer")) return <NpmExplorerBody />;
    if (toolId.includes("api-tester")) return <ApiTesterBody />;
    if (toolId.includes("quote-gen")) return <QuoteGeneratorBody />;
    if (toolId.includes("joke-gen")) return <JokeGeneratorBody />;
    if (toolId.includes("animal-pics")) return <AnimalPictureBody />;

    
    // New 15 niche tools
    if (toolId.includes("resistor-calc")) return <ResistorCalculatorBody />;
    if (toolId.includes("ohm-s-law")) return <OhmsLawBody />;
    if (toolId.includes("awg-converter")) return <AwgConverterBody />;
    if (toolId.includes("vin-decoder")) return <VinDecoderBody />;
    if (toolId.includes("car-models")) return <CarModelLookupBody />;
    if (toolId.includes("fuel-cost")) return <FuelCostCalculatorBody />;
    if (toolId.includes("aqi-radar")) return <AqiRadarBody />;
    if (toolId.includes("carbon-footprint")) return <CarbonFootprintBody />;
    if (toolId.includes("sunlight-calc")) return <SunlightCalculatorBody />;
    if (toolId.includes("barcode-scanner")) return <BarcodeScannerBody />;
    if (toolId.includes("is-it-down")) return <IsItDownBody />;
    if (toolId.includes("what-is-my-ip")) return <WhatIsMyIpBody />;
    if (toolId.includes("browser-fingerprint")) return <BrowserFingerprintBody />;

    // Phase 1 UI Generators
    if (toolId.includes("jwt-decoder")) return <JwtDecoderBody />;
    if (toolId.includes("glassmorphism-gen")) return <GlassmorphismGenBody />;
    if (toolId.includes("box-shadow-gen")) return <BoxShadowGenBody />;
    if (toolId.includes("css-clip-path")) return <CssClipPathBody />;
    if (toolId.includes("svg-blob-gen")) return <SvgBlobGenBody />;
    if (toolId.includes("type-scale-calc")) return <TypeScaleCalcBody />;

    // Phase 2 Marketing & Productivity
    if (toolId.includes("utm-link-builder")) return <UtmLinkBuilderBody />;
    if (toolId.includes("slug-converter")) return <SlugConverterBody />;
    if (toolId.includes("pomodoro-timer")) return <PomodoroTimerBody />;
    if (toolId.includes("seo-serp-preview")) return <SeoSerpPreviewBody />;
    if (toolId.includes("email-signature-gen")) return <EmailSignatureGenBody />;
    if (toolId.includes("local-kanban")) return <LocalKanbanBody />;
    if (toolId.includes("cron-job-gen")) return <CronJobGenBody />;

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
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
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
