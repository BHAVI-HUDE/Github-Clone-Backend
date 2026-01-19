const fs = require('fs');
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revert(commitID){
    const repoPath = path.resolve(process.cwd(), ".myVCS");
    const commitsPath = path.join(repoPath, "commits");

    try{
        const commitDir = path.join(commitsPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for(const file of files){
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));
        }
    } catch(error){
        console.error("Unable to revert: ",error);
    }
}
module.exports = {revert};