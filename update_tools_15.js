const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src', 'data', 'tools.tsx');
let content = fs.readFileSync(file, 'utf8');

// Add imports
const newImports = `
import { Calculator as Calc2, Zap, Cable, Car, CarFront, Fuel, ScanBarcode, Wind, Leaf, Sun, Shield } from "lucide-react";
`;
content = content.replace('import React from "react";', newImports + 'import React from "react";');

// Define new categories text
const newCategories = `
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
`;

// Insert new categories at the end of the array (before "];")
content = content.replace('];\r\n', newCategories + '];\n').replace('];\n', newCategories + '];\n');

// Append to Health & Fitness
const healthTools = `
      { title: "Barcode Scanner", subtitle: "Lookup food barcode nutrition.", icon: <ScanBarcode className="w-12 h-12" />, iconColor: "text-green-600", rating: 5, isBeta: false, isNew: true },
`;
content = content.replace(
  'id: "health-fitness",\n    title: "Health & Fitness",\n    tools: [',
  'id: "health-fitness",\n    title: "Health & Fitness",\n    tools: [\n' + healthTools
);
content = content.replace(
  'id: "health-fitness",\r\n    title: "Health & Fitness",\r\n    tools: [',
  'id: "health-fitness",\r\n    title: "Health & Fitness",\r\n    tools: [\r\n' + healthTools
);

// Append to Network & IT
const networkTools = `
      { title: "Is It Down?", subtitle: "Check if a website is online.", icon: <Globe className="w-12 h-12" />, iconColor: "text-blue-500", rating: 5, isBeta: false, isNew: true },
      { title: "What Is My IP", subtitle: "Find your public IP and location.", icon: <MapPin className="w-12 h-12" />, iconColor: "text-red-500", rating: 5, isBeta: false, isNew: true },
      { title: "Browser Fingerprint", subtitle: "See what data your browser leaks.", icon: <Fingerprint className="w-12 h-12" />, iconColor: "text-purple-500", rating: 5, isBeta: false, isNew: true },
`;
content = content.replace(
  'id: "network-it",\n    title: "Network & IT",\n    tools: [',
  'id: "network-it",\n    title: "Network & IT",\n    tools: [\n' + networkTools
);
content = content.replace(
  'id: "network-it",\r\n    title: "Network & IT",\r\n    tools: [',
  'id: "network-it",\r\n    title: "Network & IT",\r\n    tools: [\r\n' + networkTools
);

fs.writeFileSync(file, content);
console.log("Updated tools.tsx successfully!");
