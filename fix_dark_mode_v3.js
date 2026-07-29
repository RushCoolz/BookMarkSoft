const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'tools');
const files = fs.readdirSync(dir);
let count = 0;

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    let changed = false;

    // A flag to know if we are inside a <select> tag that spans multiple lines
    let inSelect = false;
    let inDate = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes('<select')) inSelect = true;
      if (line.includes('type="date"')) inDate = true;
      if (line.includes('<input') && line.includes('type="date"')) {
        inDate = true;
      }
      
      // If we are on a line related to select or date input, inject dark mode classes
      if (inSelect || inDate || line.includes('<select') || line.includes('type="date"')) {
        if (line.includes('className="') && !line.includes('dark:bg-slate-800') && !line.includes('dark:bg-slate-700') && !line.includes('dark:bg-slate-900')) {
          // It has a className but no explicit dark background
          // Insert it right after className="
          lines[i] = line.replace(/className=\"([^\"]*)\"/, 'className="$1 dark:bg-slate-800 dark:text-white dark:border-slate-700"');
          changed = true;
        }
      }

      if (line.includes('>')) {
        inSelect = false;
        inDate = false;
      }
    }

    if (changed) {
      fs.writeFileSync(fullPath, lines.join('\n'));
      console.log("Updated", file);
      count++;
    }
  }
}
console.log("Total updated:", count);
