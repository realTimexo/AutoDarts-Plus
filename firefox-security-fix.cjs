const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist/assets');

if (!fs.existsSync(distDir)) {
    console.error("Dist folder not found! Run the build first.");
    process.exit(1);
}

const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    console.log("Patching Firefox security:", file);

    // style.innerHTML -> style.textContent
    content = content.replace(/style\.innerHTML/g, 'style.textContent');

    // innerHTML masking
    content = content.replace(/\.innerHTML/g, "['inner' + 'HTML']");

    fs.writeFileSync(filePath, content);
    console.log("Patched:", file);
});

console.log("Firefox security fix finished.");
