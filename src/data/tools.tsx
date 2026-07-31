import { 
  Code2, FileJson, Hash, Braces, Binary, Globe, 
  FileText, Type, AlignLeft, SplitSquareHorizontal, LayoutTemplate, 
  Image as ImageIcon, Shrink, Maximize, Crop, Palette,
  Key, Fingerprint, 
  Percent, ArrowLeftRight, Clock,
  Cloud, Layers, Combine, Scissors, Lock, Paintbrush, 
  Table, ImagePlus, ShieldAlert, Network, Search,
  Banknote, CalendarDays, Edit3, Terminal, FileCode2,
  Database, Link, FileSearch, PenTool, Image, Activity, ShieldCheck,
  Calculator as CalcIcon, LineChart, MoveHorizontal,
  HeartPulse, Share2, Smartphone, Dices, FileSpreadsheet, Presentation, Flame, PieChart, Wine, Tags, Video, Minimize2, MonitorSmartphone, Info, Battery
} from "lucide-react";
import { Bitcoin, Earth, MapPin, CalendarDays as CalendarDays2, BookOpen, GitBranch, Package, TerminalSquare, Quote, Smile, Camera } from "lucide-react";

import { Calculator as Calc2, Zap, Cable, Car, CarFront, Fuel, ScanBarcode, Wind, Leaf, Sun, Shield } from "lucide-react";
import React from "react";

export function generateToolId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export const toolCategories = [
  {
    id: "developer-code",
    title: "Developer & Code Tools",
    tools: [
      { title: "JSON Formatter", subtitle: "Validate, format, and beautify JSON data.", icon: <Braces className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: false },
      { title: "XML Formatter", subtitle: "Format and indent XML documents.", icon: <FileCode2 className="w-12 h-12" />, iconColor: "text-orange-500", rating: 4, isBeta: false },
      { title: "HTML Formatter", subtitle: "Clean and beautify HTML code.", icon: <Code2 className="w-12 h-12" />, iconColor: "text-orange-600", rating: 4, isBeta: false },
      { title: "CSS Formatter", subtitle: "Format and minify CSS style sheets.", icon: <Paintbrush className="w-12 h-12" />, iconColor: "text-pink-500", rating: 4, isBeta: false },
      { title: "SQL Formatter", subtitle: "Beautify SQL queries for readability.", icon: <Database className="w-12 h-12" />, iconColor: "text-blue-600", rating: 4, isBeta: false },
      { title: "JS Formatter", subtitle: "Format JavaScript/TypeScript code.", icon: <Terminal className="w-12 h-12" />, iconColor: "text-yellow-500", rating: 5, isBeta: false },
      { title: "Base64 Encode/Decode", subtitle: "Encode and decode Base64 strings.", icon: <Binary className="w-12 h-12" />, iconColor: "text-purple-500", rating: 5, isBeta: false },
      { title: "URL Encode/Decode", subtitle: "Safely encode URLs for web requests.", icon: <Globe className="w-12 h-12" />, iconColor: "text-sky-500", rating: 4, isBeta: false },
      { title: "HTML Entities", subtitle: "Encode characters into HTML entities.", icon: <Code2 className="w-12 h-12" />, iconColor: "text-slate-500", rating: 3, isBeta: false },
      { title: "UUID/GUID Generator", subtitle: "Generate random v4 UUID strings.", icon: <Fingerprint className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 5, isBeta: false },
      { title: "Hash Generator", subtitle: "MD5, SHA-1, SHA-256, and bcrypt hashes.", icon: <Hash className="w-12 h-12" />, iconColor: "text-rose-500", rating: 5, isBeta: false },
      { title: "Diff Checker", subtitle: "Compare two text blocks line by line.", icon: <SplitSquareHorizontal className="w-12 h-12" />, iconColor: "text-amber-500", rating: 4, isBeta: false },
      { title: "Regex Tester", subtitle: "Test and debug regular expressions.", icon: <FileSearch className="w-12 h-12" />, iconColor: "text-emerald-500", rating: 5, isBeta: false },
      { title: "CSS Gradient Gen", subtitle: "Create beautiful CSS gradients visually.", icon: <Palette className="w-12 h-12" />, iconColor: "text-pink-400", rating: 4, isBeta: true, isNew: true },
      { title: "JSON to CSV", subtitle: "Convert JSON arrays into CSV format.", icon: <Table className="w-12 h-12" />, iconColor: "text-green-600", rating: 4, isBeta: false },
      { title: "CSV to JSON", subtitle: "Convert CSV data into JSON arrays.", icon: <FileJson className="w-12 h-12" />, iconColor: "text-blue-500", rating: 4, isBeta: false },
      { title: "YAML to JSON", subtitle: "Convert YAML configs to JSON.", icon: <FileCode2 className="w-12 h-12" />, iconColor: "text-indigo-400", rating: 3, isBeta: true },
      { title: "XML to JSON", subtitle: "Convert XML data into JSON format.", icon: <FileJson className="w-12 h-12" />, iconColor: "text-indigo-600", rating: 4, isBeta: false },
      { title: "GitHub Profile", subtitle: "Find GitHub user data and repos.", icon: <GitBranch className="w-12 h-12" />, iconColor: "text-slate-800 dark:text-slate-200", rating: 5, isBeta: false, isNew: true },
      { title: "NPM Explorer", subtitle: "Search and explore NPM packages.", icon: <Package className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: false, isNew: true },
      { title: "API Tester", subtitle: "Test REST API endpoints directly.", icon: <TerminalSquare className="w-12 h-12" />, iconColor: "text-orange-500", rating: 5, isBeta: false, isNew: true },
      { title: "JWT Decoder", subtitle: "Decode JSON Web Tokens securely.", icon: <Key className="w-12 h-12" />, iconColor: "text-emerald-500", rating: 5, isBeta: true, isNew: true },
    ]
  },
  {
    id: "ui-design-generators",
    title: "UI & Design Generators",
    tools: [
      { title: "Glassmorphism Gen", subtitle: "Generate frosted glass UI CSS.", icon: <Layers className="w-12 h-12" />, iconColor: "text-cyan-400", rating: 5, isBeta: true, isNew: true },
      { title: "Box Shadow Gen", subtitle: "Create smooth CSS box shadows.", icon: <LayoutTemplate className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 5, isBeta: true, isNew: true },
      { title: "CSS Clip Path", subtitle: "Draw and export CSS polygon shapes.", icon: <Scissors className="w-12 h-12" />, iconColor: "text-pink-500", rating: 5, isBeta: true, isNew: true },
      { title: "SVG Blob Gen", subtitle: "Generate organic SVG background blobs.", icon: <Paintbrush className="w-12 h-12" />, iconColor: "text-rose-500", rating: 5, isBeta: true, isNew: true },
      { title: "Type Scale Calc", subtitle: "Responsive typography scale generator.", icon: <Type className="w-12 h-12" />, iconColor: "text-slate-800 dark:text-slate-200", rating: 5, isBeta: true, isNew: true },
    ]
  },
  {
    id: "document-text",
    title: "Document & Text Tools",
    tools: [
      { title: "PDF to JPG", subtitle: "Convert PDF pages to high-quality images.", icon: <Image className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: false },
      { title: "Merge PDF", subtitle: "Combine multiple PDFs into a single file.", icon: <Combine className="w-12 h-12" />, iconColor: "text-red-600", rating: 5, isBeta: false },
      { title: "Split PDF", subtitle: "Extract specific pages from PDF files.", icon: <Scissors className="w-12 h-12" />, iconColor: "text-red-400", rating: 4, isBeta: false },
      { title: "Compress PDF", subtitle: "Reduce PDF file size for sharing.", icon: <Shrink className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: false },
      { title: "Password Protect", subtitle: "Add passwords to secure your PDFs.", icon: <Lock className="w-12 h-12" />, iconColor: "text-slate-700", rating: 4, isBeta: false },
      { title: "Word & Char Counter", subtitle: "Count words, characters, and sentences.", icon: <Type className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: false },
      { title: "Case Converter", subtitle: "UPPERCASE, lowercase, camelCase.", icon: <AlignLeft className="w-12 h-12" />, iconColor: "text-emerald-500", rating: 4, isBeta: false },
      { title: "Remove Duplicates", subtitle: "Remove duplicate lines from text.", icon: <Layers className="w-12 h-12" />, iconColor: "text-orange-500", rating: 4, isBeta: false },
      { title: "Sort Lines", subtitle: "Sort text lines alphabetically.", icon: <MoveHorizontal className="w-12 h-12" />, iconColor: "text-cyan-500", rating: 3, isBeta: false },
      { title: "Lorem Ipsum", subtitle: "Generate placeholder text for designs.", icon: <LayoutTemplate className="w-12 h-12" />, iconColor: "text-slate-400", rating: 4, isBeta: false },
      { title: "Signature Gen", subtitle: "Draw and download digital signatures.", icon: <PenTool className="w-12 h-12" />, iconColor: "text-purple-500", rating: 5, isBeta: true, isNew: true },
      { title: "Live Markdown", subtitle: "Live Markdown Editor and Viewer.", icon: <Edit3 className="w-12 h-12" />, iconColor: "text-slate-800", rating: 5, isBeta: false },
      { title: "Markdown to HTML", subtitle: "Convert MD to raw HTML code.", icon: <FileCode2 className="w-12 h-12" />, iconColor: "text-blue-600", rating: 4, isBeta: false },
      { title: "Word to PDF", subtitle: "Convert DOCX to PDF.", icon: <FileText className="w-12 h-12" />, iconColor: "text-blue-600", rating: 5, isBeta: true },
      { title: "Excel to PDF", subtitle: "Convert XLSX to PDF.", icon: <FileSpreadsheet className="w-12 h-12" />, iconColor: "text-green-600", rating: 5, isBeta: true },
      { title: "PPT to PDF", subtitle: "Convert PPTX to PDF.", icon: <Presentation className="w-12 h-12" />, iconColor: "text-orange-600", rating: 5, isBeta: true },
    ]
  },
  {
    id: "image-media",
    title: "Image & Media Tools",
    tools: [
      { title: "WebP to PNG/JPG", subtitle: "Convert modern WebP to standard formats.", icon: <ImagePlus className="w-12 h-12" />, iconColor: "text-sky-500", rating: 5, isBeta: false },
      { title: "SVG to PNG", subtitle: "Convert vector graphics to raster images.", icon: <ImagePlus className="w-12 h-12" />, iconColor: "text-purple-600", rating: 4, isBeta: false },
      { title: "HEIC to JPG", subtitle: "Convert Apple HEIC photos to JPG.", icon: <ImagePlus className="w-12 h-12" />, iconColor: "text-blue-500", rating: 4, isBeta: true },
      { title: "Image Compressor", subtitle: "Reduce file size without losing quality.", icon: <Shrink className="w-12 h-12" />, iconColor: "text-green-600", rating: 5, isBeta: false },
      { title: "Image Cropper", subtitle: "Crop and adjust image aspect ratios.", icon: <Crop className="w-12 h-12" />, iconColor: "text-orange-500", rating: 4, isBeta: false },
      { title: "Image Resizer", subtitle: "Resize images by exact pixels.", icon: <Maximize className="w-12 h-12" />, iconColor: "text-blue-600", rating: 4, isBeta: false },
      { title: "Add Watermark", subtitle: "Protect images with text or logos.", icon: <Layers className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 4, isBeta: true },
      { title: "Color Picker", subtitle: "Extract colors from any image.", icon: <Palette className="w-12 h-12" />, iconColor: "text-pink-500", rating: 5, isBeta: false },
      { title: "Palette Gen", subtitle: "Generate beautiful color palettes.", icon: <Paintbrush className="w-12 h-12" />, iconColor: "text-rose-400", rating: 4, isBeta: false },
      { title: "ICO Generator", subtitle: "Convert images to Favicon/ICO format.", icon: <ImageIcon className="w-12 h-12" />, iconColor: "text-amber-500", rating: 4, isBeta: false },
      { title: "Base64 Image", subtitle: "Convert images to Base64 strings.", icon: <Binary className="w-12 h-12" />, iconColor: "text-purple-500", rating: 3, isBeta: false },
    ]
  },
  {
    id: "security-privacy",
    title: "Security & Privacy Tools",
    tools: [
      { title: "Password Gen", subtitle: "Create highly secure, random passwords.", icon: <Key className="w-12 h-12" />, iconColor: "text-emerald-600", rating: 5, isBeta: false },
      { title: "Strength Checker", subtitle: "Analyze password time-to-crack.", icon: <Activity className="w-12 h-12" />, iconColor: "text-amber-500", rating: 4, isBeta: false },
      { title: "AES Encrypt", subtitle: "Simple AES Text Encrypt/Decrypt.", icon: <ShieldCheck className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: false },
      { title: "My IP Address", subtitle: "Find your public IP and location data.", icon: <Network className="w-12 h-12" />, iconColor: "text-sky-500", rating: 5, isBeta: false },
      { title: "DNS Lookup", subtitle: "Check DNS records for any domain.", icon: <Search className="w-12 h-12" />, iconColor: "text-slate-600", rating: 4, isBeta: false },
      { title: "WHOIS Lookup", subtitle: "Find domain registration details.", icon: <Globe className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 4, isBeta: true },
    ]
  },
  {
    id: "math-finance",
    title: "Math & Finance",
    tools: [
      { title: "Percentage Calc", subtitle: "Calculate percentages and margins.", icon: <Percent className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: false },
      { title: "Margin Calc", subtitle: "Calculate markup and profit margins.", icon: <LineChart className="w-12 h-12" />, iconColor: "text-emerald-500", rating: 4, isBeta: false },
      { title: "Rule of 72", subtitle: "Calculate years to double your money.", icon: <LineChart className="w-12 h-12" />, iconColor: "text-amber-500", rating: 5, isBeta: false, isNew: true },
      { title: "ROI Calculator", subtitle: "Calculate Return on Investment easily.", icon: <Banknote className="w-12 h-12" />, iconColor: "text-green-600", rating: 4, isBeta: false },
      { title: "Mortgage Calc", subtitle: "Calculate monthly mortgage payments.", icon: <Banknote className="w-12 h-12" />, iconColor: "text-blue-600", rating: 5, isBeta: true, isNew: true },
      { title: "Auto Loan Calc", subtitle: "Calculate car loan payments.", icon: <Banknote className="w-12 h-12" />, iconColor: "text-purple-600", rating: 4, isBeta: true },
      { title: "Salary Conv", subtitle: "Salary to hourly wage converter.", icon: <Banknote className="w-12 h-12" />, iconColor: "text-emerald-600", rating: 5, isBeta: true },
      { title: "Tip Calc", subtitle: "Split bills and calculate tips.", icon: <Banknote className="w-12 h-12" />, iconColor: "text-sky-500", rating: 4, isBeta: true },
      { title: "Compound Int.", subtitle: "Compound interest calculator.", icon: <LineChart className="w-12 h-12" />, iconColor: "text-orange-500", rating: 5, isBeta: true },
      { title: "Unit Converter", subtitle: "Convert length, weight, and temperature.", icon: <ArrowLeftRight className="w-12 h-12" />, iconColor: "text-orange-500", rating: 5, isBeta: false },
      { title: "Unix Timestamp", subtitle: "Convert epochs to readable dates.", icon: <Clock className="w-12 h-12" />, iconColor: "text-slate-600", rating: 4, isBeta: false },
      { title: "Days Between", subtitle: "Calculate exact days between two dates.", icon: <CalendarDays className="w-12 h-12" />, iconColor: "text-purple-500", rating: 4, isBeta: false },
      { title: "Timezone Conv", subtitle: "Convert times across world zones.", icon: <Globe className="w-12 h-12" />, iconColor: "text-sky-600", rating: 3, isBeta: true },
      { title: "Currency Conv.", subtitle: "Live fiat exchange rates.", icon: <Banknote className="w-12 h-12" />, iconColor: "text-emerald-500", rating: 5, isBeta: false, isNew: true },
      { title: "Crypto Tracker", subtitle: "Live crypto prices & market caps.", icon: <Bitcoin className="w-12 h-12" />, iconColor: "text-amber-500", rating: 5, isBeta: false, isNew: true },
    ]
  },
  {
    id: "global-data",
    title: "Global & Data Tools",
    tools: [
      { title: "Weather Dash", subtitle: "Global 7-day weather forecast.", icon: <Earth className="w-12 h-12" />, iconColor: "text-cyan-500", rating: 5, isBeta: false, isNew: true },
      { title: "Country Info", subtitle: "Look up details for any country.", icon: <MapPin className="w-12 h-12" />, iconColor: "text-sky-500", rating: 5, isBeta: false, isNew: true },
      { title: "Public Holidays", subtitle: "Find holidays for any country and year.", icon: <CalendarDays2 className="w-12 h-12" />, iconColor: "text-fuchsia-500", rating: 5, isBeta: false, isNew: true },
      { title: "Dictionary", subtitle: "Word definitions, synonyms & audio.", icon: <BookOpen className="w-12 h-12" />, iconColor: "text-rose-500", rating: 5, isBeta: false, isNew: true },
    ]
  },
  {
    id: "health-fitness",
    title: "Health & Fitness",
    tools: [

      { title: "Barcode Scanner", subtitle: "Lookup food barcode nutrition.", icon: <ScanBarcode className="w-12 h-12" />, iconColor: "text-green-600", rating: 5, isBeta: false, isNew: true },

      { title: "BMI Calculator", subtitle: "Calculate Body Mass Index.", icon: <HeartPulse className="w-12 h-12" />, iconColor: "text-rose-500", rating: 5, isBeta: true, isNew: true },
      { title: "BMR & TDEE", subtitle: "Calculate daily energy expenditure.", icon: <Flame className="w-12 h-12" />, iconColor: "text-orange-500", rating: 5, isBeta: true },
      { title: "Macro Calculator", subtitle: "Calculate daily macronutrients.", icon: <PieChart className="w-12 h-12" />, iconColor: "text-green-500", rating: 4, isBeta: true },
      { title: "BAC Calculator", subtitle: "Estimate blood alcohol content.", icon: <Wine className="w-12 h-12" />, iconColor: "text-purple-500", rating: 4, isBeta: true },
    ]
  },
  {
    id: "web-seo-social",
    title: "Web, SEO & Social",
    tools: [
      { title: "Meta Tag Gen", subtitle: "Generate SEO meta tags.", icon: <Tags className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: true, isNew: true },
      { title: "Open Graph", subtitle: "Preview social media links.", icon: <Share2 className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 5, isBeta: true },
      { title: "YT Thumbnail", subtitle: "Download YouTube thumbnails.", icon: <Video className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: true },
      { title: "CSS Minifier", subtitle: "Minify CSS code for production.", icon: <Minimize2 className="w-12 h-12" />, iconColor: "text-sky-500", rating: 4, isBeta: true },
      { title: "Robots.txt Gen", subtitle: "Generate a robots.txt file.", icon: <FileCode2 className="w-12 h-12" />, iconColor: "text-slate-600", rating: 4, isBeta: true },
      { title: "Line Break Gen", subtitle: "Instagram line break generator.", icon: <Edit3 className="w-12 h-12" />, iconColor: "text-pink-500", rating: 4, isBeta: true },
      { title: "Tweet to Image", subtitle: "Convert tweets into beautiful images.", icon: <ImagePlus className="w-12 h-12" />, iconColor: "text-sky-400", rating: 5, isBeta: true },
    ]
  },
  {
    id: "random-generators",
    title: "Random Generators",
    tools: [
      { title: "Random Number", subtitle: "Generate random numbers instantly.", icon: <Dices className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 5, isBeta: true, isNew: true },
      { title: "Dice Roller", subtitle: "Roll virtual 3D dice.", icon: <Dices className="w-12 h-12" />, iconColor: "text-rose-500", rating: 4, isBeta: true },
      { title: "Fake Data Gen", subtitle: "Generate JSON test data for devs.", icon: <Database className="w-12 h-12" />, iconColor: "text-blue-600", rating: 5, isBeta: true },
      { title: "Quote Gen", subtitle: "Generate random inspirational quotes.", icon: <Quote className="w-12 h-12" />, iconColor: "text-purple-500", rating: 5, isBeta: false, isNew: true },
      { title: "Joke Gen", subtitle: "Generate programming and dad jokes.", icon: <Smile className="w-12 h-12" />, iconColor: "text-amber-500", rating: 5, isBeta: false, isNew: true },
      { title: "Animal Pics", subtitle: "Fetch random cute dogs and cats.", icon: <Camera className="w-12 h-12" />, iconColor: "text-lime-500", rating: 5, isBeta: false, isNew: true },
    ]
  },
  {
    id: "network-it",
    title: "Network & IT",
    tools: [

      { title: "Is It Down?", subtitle: "Check if a website is online.", icon: <Globe className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: false, isNew: true },
      { title: "What Is My IP", subtitle: "Find your public IP and location.", icon: <MapPin className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: false, isNew: true },
      { title: "Browser Fingerprint", subtitle: "See what data your browser leaks.", icon: <Fingerprint className="w-12 h-12" />, iconColor: "text-purple-500", rating: 5, isBeta: false, isNew: true },

      { title: "Subnet Calc", subtitle: "IP Subnet and CIDR calculator.", icon: <Network className="w-12 h-12" />, iconColor: "text-emerald-600", rating: 5, isBeta: true, isNew: true },
      { title: "MAC Lookup", subtitle: "Find MAC address vendor details.", icon: <Search className="w-12 h-12" />, iconColor: "text-slate-600", rating: 4, isBeta: true },
    ]
  },
  {
    id: "mobile-devices",
    title: "Mobile & Devices",
    tools: [
      { title: "Screen Res", subtitle: "Test device screen resolutions.", icon: <MonitorSmartphone className="w-12 h-12" />, iconColor: "text-indigo-600", rating: 5, isBeta: true, isNew: true },
      { title: "Device Info", subtitle: "View your user agent and device info.", icon: <Info className="w-12 h-12" />, iconColor: "text-slate-600", rating: 4, isBeta: true },
      { title: "IMEI Checker", subtitle: "Check mobile device IMEI formats.", icon: <Smartphone className="w-12 h-12" />, iconColor: "text-emerald-500", rating: 4, isBeta: true },
      { title: "Battery Calc", subtitle: "Estimate device battery life.", icon: <Battery className="w-12 h-12" />, iconColor: "text-green-500", rating: 3, isBeta: true },
    ]
  },
  {
    id: "electrical-electronics",
    title: "Electrical & Electronics",
    tools: [
      { title: "Resistor Calc", subtitle: "Resistor color code calculator.", icon: <Calc2 className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: false, isNew: true },
      { title: "Ohm's Law", subtitle: "Voltage, current, resistance calculator.", icon: <Zap className="w-12 h-12" />, iconColor: "text-yellow-500", rating: 5, isBeta: false, isNew: true },
      { title: "AWG Converter", subtitle: "AWG wire size to metric converter.", icon: <Cable className="w-12 h-12" />, iconColor: "text-slate-500", rating: 4, isBeta: false, isNew: true },
    ]
  },
  {
    id: "cars-vehicles",
    title: "Cars & Vehicles",
    tools: [
      { title: "VIN Decoder", subtitle: "Decode vehicle ID numbers.", icon: <Car className="w-12 h-12" />, iconColor: "text-indigo-500", rating: 5, isBeta: false, isNew: true },
      { title: "Car Models", subtitle: "Find all models by car brand.", icon: <CarFront className="w-12 h-12" />, iconColor: "text-red-500", rating: 4, isBeta: false, isNew: true },
      { title: "Fuel Cost Calc", subtitle: "Calculate exact road trip fuel costs.", icon: <Fuel className="w-12 h-12" />, iconColor: "text-green-500", rating: 5, isBeta: false, isNew: true },
    ]
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly & Sustainability",
    tools: [
      { title: "Live AQI Radar", subtitle: "Check real-time air pollution globally.", icon: <Wind className="w-12 h-12" />, iconColor: "text-teal-500", rating: 5, isBeta: false, isNew: true },
      { title: "Carbon Footprint", subtitle: "Estimate your CO2 emissions.", icon: <Leaf className="w-12 h-12" />, iconColor: "text-green-500", rating: 5, isBeta: false, isNew: true },
      { title: "Sunlight Calc", subtitle: "Calculate daylight hours & sunrise.", icon: <Sun className="w-12 h-12" />, iconColor: "text-yellow-500", rating: 4, isBeta: false, isNew: true },
    ]
  },
];
