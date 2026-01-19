const fs = require('fs').promises; // utility for creating files
const path = require('path');

async function add(file){
    const repoPath = path.resolve(process.cwd(), ".myVCS");
    const stagingPath = path.join(repoPath, "staging");

    try{
    await fs.mkdir(stagingPath, {recursive: true});
    const fileName = path.basename(file);
    const destPath = path.join(stagingPath, fileName);
    await fs.copyFile(file, destPath);
    console.log(`File ${fileName} added to staging area.`);
} catch (err) {
    console.error("Error adding file to staging area: ", err);
}
}

module.exports = {add};