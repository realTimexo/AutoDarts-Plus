// Post-build safety check for the Firefox package.
//
// NOTE: This used to rewrite `.innerHTML` to `['inner' + 'HTML']` across the
// built files to dodge Firefox's automated add-on scanner. That did not fix
// anything - it just hid the exact same property access from static
// analysis, which is precisely the kind of "obfuscated/disguised
// functionality" Mozilla's AMO review guidelines reject submissions for.
//
// The real fixes now live in the source (see src/ui/*.js, src/core/*.js):
//   - all innerHTML uses that carry dynamic user data (player names, board
//     names, modal text, custom SVG skins) are escaped via
//     window.adTourney.escapeHtml() / a local escHtml() before insertion
//   - CSS-only `style.innerHTML = ...` assignments were changed to
//     `style.textContent = ...`, which is semantically identical for a
//     <style> element and removes them from the innerHTML-usage class
//     entirely instead of hiding them
//
// This script just verifies the dist build doesn't contain the old masking
// pattern or other obviously dangerous constructs, and fails loudly if it
// does, instead of silently rewriting code.

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist/assets');

if (!fs.existsSync(distDir)) {
    console.error('dist/assets not found - run the build first.');
    process.exit(1);
}

const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));
const dangerousPatterns = [
    { name: 'obfuscated innerHTML access', re: /\[\s*['"]inner['"]\s*\+\s*['"]HTML['"]\s*\]/ },
    { name: 'eval(', re: /\beval\s*\(/ },
    { name: 'new Function(', re: /new\s+Function\s*\(/ },
    { name: 'document.write(', re: /document\.write\s*\(/ },
];

let problems = 0;
for (const file of files) {
    const filePath = path.join(distDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    for (const { name, re } of dangerousPatterns) {
        if (re.test(content)) {
            console.error(`[firefox-security-check] ${file}: found ${name}`);
            problems++;
        }
    }
}

if (problems > 0) {
    console.error(`\nfirefox-security-check failed with ${problems} issue(s). Fix the source and rebuild.`);
    process.exit(1);
}

console.log('firefox-security-check: no known-dangerous patterns found in dist/assets.');
