const { execSync } = require('node:child_process');

// Define the valid branch name pattern using a regular expression
const validBranchRegex =
  /^(main|develop|feature\/AZ-[0-9]+-[a-z0-9-]+|bugfix\/AZ-[0-9]+-[a-z0-9-]+|refractor\/AZ-[0-9]+-[a-z0-9-]+|chore\/AZ-[0-9]+-[a-z0-9-]+)$/;

// Get the current branch name using Git command
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();

// Validate the branch name against the defined regex pattern
if (!validBranchRegex.test(branchName)) {
  console.error(`
  🚫 Invalid branch name: "${branchName}".
  Branch names must follow these patterns:
  - main
  - develop
  - feature/AZ-<ticket-id>-<description>
  - bugfix/AZ-<ticket-id>-<description>
  - refractor/AZ-<ticket-id>-<description>
  - chore/AZ-<ticket-id>-<description>
    `);
  process.exit(1); // Exit with failure code to block the push
}

console.log(`✅ Branch name "${branchName}" is valid.`);