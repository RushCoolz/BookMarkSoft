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

// Country Info
replaceFileContent('src/components/tools/CountryInfoBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\(`https:\/\/restcountries\.com\/v3\.1\/name\/\${encodeURIComponent\(query\.trim\(\)\)}\?fullText=true`\);/g,
    'const res = await fetch(`/api/proxy?url=${encodeURIComponent(`https://restcountries.com/v3.1/name/${encodeURIComponent(query.trim())}?fullText=true`)}`);'
  ).replace(
    /const resPartial = await fetch\(`https:\/\/restcountries\.com\/v3\.1\/name\/\${encodeURIComponent\(query\.trim\(\)\)}`\);/g,
    'const resPartial = await fetch(`/api/proxy?url=${encodeURIComponent(`https://restcountries.com/v3.1/name/${encodeURIComponent(query.trim())}`)}`);'
  );
});

// Mac Lookup
replaceFileContent('src/components/tools/MacLookupBody.tsx', (content) => {
  return content.replace(
    /const res = await fetch\(`https:\/\/api\.maclookup\.app\/v2\/macs\/\${mac}`\);/g,
    'const res = await fetch(`/api/proxy?url=${encodeURIComponent(`https://api.maclookup.app/v2/macs/${mac}`)}`);'
  );
});
