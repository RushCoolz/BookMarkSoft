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

    // We want to make sure ANY <select> or <input type="date"> has a dark mode background and text color explicitly set
    // so that the browser renders the popup in dark mode properly if it inherits from the element.
    // We will append `dark:bg-slate-800 dark:text-white dark:border-slate-700` to the className of these elements.

    const regexSelect = /<select([^>]*?)className=\"([^\"]+)\"([^>]*?)>/gi;
    content = content.replace(regexSelect, (match, p1, classes, p2) => {
      if (!classes.includes('dark:bg-')) {
        changed = true;
        // if it has bg-transparent, replace it or keep it?
        // if bg-transparent, the popup might become transparent or white. Let's add dark:bg-slate-800 to override transparent in dark mode
        const newClasses = classes + ' dark:bg-slate-800 dark:text-white dark:border-slate-700';
        return `<select${p1}className="${newClasses}"${p2}>`;
      }
      return match;
    });

    const regexDate = /<input([^>]*?)type=\"date\"([^>]*?)className=\"([^\"]+)\"([^>]*?)>/gi;
    content = content.replace(regexDate, (match, p1, p2, classes, p3) => {
      if (!classes.includes('dark:bg-')) {
        changed = true;
        const newClasses = classes + ' dark:bg-slate-800 dark:text-white dark:border-slate-700';
        return `<input${p1}type="date"${p2}className="${newClasses}"${p3}>`;
      }
      return match;
    });

    // Handle reversed order: className="..." type="date"
    const regexDateRev = /<input([^>]*?)className=\"([^\"]+)\"([^>]*?)type=\"date\"([^>]*?)>/gi;
    content = content.replace(regexDateRev, (match, p1, classes, p2, p3) => {
      if (!classes.includes('dark:bg-')) {
        changed = true;
        const newClasses = classes + ' dark:bg-slate-800 dark:text-white dark:border-slate-700';
        return `<input${p1}className="${newClasses}"${p2}type="date"${p3}>`;
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(fullPath, content);
      console.log("Updated", file);
      count++;
    }
  }
}
console.log("Total updated:", count);
