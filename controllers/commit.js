const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

async function commit(message) {
    const repoPath = path.resolve(process.cwd(), ".myVCS");
    const stagingPath = path.join(repoPath, "staging");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitID = uuidv4();
        const commitDir = path.join(commitsPath, commitID);

        await fs.mkdir(commitDir, { recursive: true });

        // Read staged files
        const files = await fs.readdir(stagingPath);

        // Copy each file from staging → commitDir
        for (const file of files) {
            await fs.copyFile(
                path.join(stagingPath, file),
                path.join(commitDir, file)
            );
        }

        // Save commit metadata
        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({
                message,
                date: new Date().toISOString()
            })
        );

        console.log(`Commit ${commitID} created with message: ${message}`);

    } catch (err) {
        console.error("Error committing changes:", err);
    }
}

module.exports = { commit };
