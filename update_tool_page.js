const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src', 'app', 'tools', '[id]', 'ToolPageClient.tsx');
let content = fs.readFileSync(file, 'utf8');

// Add new imports below the existing ones
const newImports = `
import { ResistorCalculatorBody } from "@/components/tools/ResistorCalculatorBody";
import { OhmsLawBody } from "@/components/tools/OhmsLawBody";
import { AwgConverterBody } from "@/components/tools/AwgConverterBody";
import { VinDecoderBody } from "@/components/tools/VinDecoderBody";
import { CarModelLookupBody } from "@/components/tools/CarModelLookupBody";
import { FuelCostCalculatorBody } from "@/components/tools/FuelCostCalculatorBody";
import { AqiRadarBody } from "@/components/tools/AqiRadarBody";
import { CarbonFootprintBody } from "@/components/tools/CarbonFootprintBody";
import { SunlightCalculatorBody } from "@/components/tools/SunlightCalculatorBody";
import { BarcodeScannerBody } from "@/components/tools/BarcodeScannerBody";
import { IsItDownBody } from "@/components/tools/IsItDownBody";
import { WhatIsMyIpBody } from "@/components/tools/WhatIsMyIpBody";
import { BrowserFingerprintBody } from "@/components/tools/BrowserFingerprintBody";
import { MacroCalculatorBody } from "@/components/tools/MacroCalculatorBody";
import { BmiCalculatorBody } from "@/components/tools/BmiCalculatorBody";
`;

content = content.replace(
  'import { AnimalPictureBody } from "@/components/tools/AnimalPictureBody";',
  'import { AnimalPictureBody } from "@/components/tools/AnimalPictureBody";\n' + newImports
);

// Add new route logic
const newRoutes = `
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
`;

content = content.replace(
  '// Default fallback',
  newRoutes + '\n    // Default fallback'
);

// Change the old routing if they exist to point to the new ones, or just let them match the old ones
// Since we have "what-is-my-ip" and "my-ip-address", they have different toolIds.
// "macro-calculator" vs "macro-calc".
// My new Tools.tsx specifies "Macro Calculator" (id: macro-calculator).
// Since the newRoutes check includes it, we should be fine, but let's override Bmi and Macro.
content = content.replace(
  'if (toolId.includes("bmi-calculator")) return <BmiCalcBody />;',
  'if (toolId.includes("bmi-calculator")) return <BmiCalculatorBody />;'
);
content = content.replace(
  'if (toolId.includes("macro-calc")) return <MacroCalcBody />;',
  'if (toolId.includes("macro-calc")) return <MacroCalculatorBody />;'
);

fs.writeFileSync(file, content);
console.log("Updated ToolPageClient.tsx successfully!");
