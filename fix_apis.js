const fs = require('fs');
const path = require('path');

function replaceFileContent(filePath, replacerFn) {
  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  const newContent = replacerFn(content);
  if (content !== newContent) {
    fs.writeFileSync(fullPath, newContent);
    console.log("Updated", filePath);
  }
}

// 1. Currency Converter (Switch to JSDelivr)
replaceFileContent('src/components/tools/CurrencyConverterBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\(`https:\/\/api\.exchangerate-api\.com\/v4\/latest\/\${base}`\);/g,
    'const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base.toLowerCase()}.json`);'
  ).replace(
    /setRates\(data\.rates\);/g,
    'setRates(data[base.toLowerCase()]);'
  );
});

// 2. Holidays Finder (Use Proxy)
replaceFileContent('src/components/tools/HolidaysFinderBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\(`https:\/\/date\.nager\.at\/api\/v3\/PublicHolidays\/\${year}\/\${countryCode}`\);/g,
    'const res = await fetch(`/api/proxy?url=${encodeURIComponent(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)}`);'
  );
});

// 3. What Is My IP (Use Proxy)
replaceFileContent('src/components/tools/WhatIsMyIpBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\("https:\/\/ipinfo\.io\/json"\);/g,
    'const res = await fetch(`/api/proxy?url=${encodeURIComponent("https://ipinfo.io/json")}`);'
  );
});

// 4. Country Info (Use Proxy)
replaceFileContent('src/components/tools/CountryInfoBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\(`https:\/\/restcountries\.com\/v3\.1\/name\/\${encodeURIComponent\(search\)}`\);/g,
    'const res = await fetch(`/api/proxy?url=${encodeURIComponent(`https://restcountries.com/v3.1/name/${search}`)}`);'
  );
});

// 5. Mac Lookup (Use Proxy)
replaceFileContent('src/components/tools/MacLookupBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\(`https:\/\/api\.maclookup\.app\/v2\/macs\/\${encodeURIComponent\(cleanMac\)}`\);/g,
    'const res = await fetch(`/api/proxy?url=${encodeURIComponent(`https://api.maclookup.app/v2/macs/${cleanMac}`)}`);'
  );
});
