const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'tools');
const files = fs.readdirSync(dir);

let count = 0;

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    // Fix <select> elements missing dark:bg-slate-800 or similar
    // We look for className="..." inside <select ...>
    content = content.replace(/<select([^>]*?)className="([^"]*?bg-slate-50[^"]*?)"([^>]*?)>/g, (match, p1, classes, p2) => {
      if (!classes.includes('dark:bg-slate-800') && !classes.includes('dark:bg-slate-900')) {
        changed = true;
        return `<select${p1}className="${classes} dark:bg-slate-800 dark:text-white dark:border-slate-700"${p2}>`;
      }
      return match;
    });

    content = content.replace(/<select([^>]*?)className="([^"]*?bg-white[^"]*?)"([^>]*?)>/g, (match, p1, classes, p2) => {
      if (!classes.includes('dark:bg-slate-800') && !classes.includes('dark:bg-slate-900') && !classes.includes('dark:bg-slate-700')) {
        changed = true;
        return `<select${p1}className="${classes} dark:bg-slate-800 dark:text-white dark:border-slate-700"${p2}>`;
      }
      return match;
    });

    // Fix <input type="date">
    content = content.replace(/<input([^>]*?)type="date"([^>]*?)className="([^"]*?)"([^>]*?)>/g, (match, p1, p2, classes, p3) => {
      if (!classes.includes('dark:bg-slate-800') && !classes.includes('dark:bg-slate-900')) {
        changed = true;
        return `<input${p1}type="date"${p2}className="${classes} dark:bg-slate-800 dark:text-white dark:border-slate-700"${p3}>`;
      }
      return match;
    });

    // Handle single line input date
    content = content.replace(/type="date"([^>]*?)className="([^"]*?bg-white[^"]*?)"/g, (match, p1, classes) => {
      if (!classes.includes('dark:bg-slate-800') && !classes.includes('dark:bg-slate-900') && !classes.includes('dark:bg-slate-700')) {
         changed = true;
         return `type="date"${p1}className="${classes} dark:bg-slate-800 dark:text-white dark:border-slate-700"`;
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(fullPath, content);
      count++;
    }
  }
}

console.log(`Updated ${count} files with dark mode selects/dates.`);
