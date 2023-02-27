# GitHub CI/CD Actions for Salesforce by UST
A collection of Continuous Integration and Delivery GitHub Actions that validate, test, package or deploy your Salesforce project.

These are the included Actions and their intended use:
- validate-feature - This will run on a feature branch which should only contain commits for one user story.
  1. Run a lint utility on LWC and Aura Javascript
  2. Run the Salesforce Code Analyzer on the codebase
  3. Authenticate to a DevHub org
  4. Build a scratch org that lasts for 1 day
  5. Deploy metadata to the scratch org to verify it deploys correctly
  6. Run unit tests to check that they pass
  7. Check that each apex class and trigger has at least 85% coverage
  8. Delete the scratch org

- build-test-org-scratch - This will run on a development branch where feature branch Pull Requests are merged into.
  1. Run a lint utility on LWC and Aura Javascript
  2. Run the Salesforce Code Analyzer on the codebase
  3. Authenticate to a DevHub org
  4. Build a scratch org that lasts for 10 days
  5. Deploy metadata to the scratch org
  6. Run unit tests to check that they pass
  7. Check that each apex class and trigger has at least 85% coverage
  8. Load test records if needed
  9. Output login credentials so the QA team can login to test

- build-test-org-sandbox - This will run on a development branch where feature branch Pull Requests are merged into.
  1. Run a lint utility on LWC and Aura Javascript
  2. Run the Salesforce Code Analyzer on the codebase
  3. Authenticate to a sandbox org
  4. Deploy metadata to the sandbox org
  5. Run unit tests to check that they pass
  6. Check that each apex class and trigger has at least 85% coverage


## Installation
1. Move the github-actions.zip into the root of your Salesforce project.
2. Unzip the file - if using the Windows Extract All tool, be sure to remove the "github-actions" directory at the end of the extract path. This will unzip the metadata files into the force-app directory in the correct location.
3. Verify that your existing package.json file contains a `lint` script and that the devDependencies contains the dependencies listed in the included package-example-for-lint.json file.
4. After you update the package.json, run this command to generate a package-lock.json which will be used in GitHub: `npm i --package-lock-only`
5. Also run this command so you can run ESLint locally: `npm ci`
6. Verify that ESLint is setup by running this command on your computer: `npm run lint`

If you do not use the standard force-app directory name, you will need to manually copy the metadata from the unzipped force-app into your custom named package directory.


## Files Included
The zip directory contains:
- GitHub Action yml files in the .github\workflows directory
- ruleset.xml in the pmd directory that is used by the sfdx-scanner. This file can be modified to scan for only the rules you want.
- check-test-coverage.apex file in the scripts directory that verifies all Apex classes have at least 85% code coverage. The coverage threshold can be edited to whatever percent you want.
- package-example-for-lint.json file that is for reference only. 
- force-app/main/default/lwc/.eslintrc.json which tells ESLint which rules to run or ignore.


## Configuration for JWT Bearer Flow Authorization
In order to Authenticate to a DevHub, sandbox or production org, you'll need to follow the first 3 steps documented by Salesforce here: https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_jwt_flow.htm#sfdx_dev_auth_jwt_flow

Once you are done with step 1, copy the server.key file into the root of your Salesforce project directory.

Once you complete the first 3 steps are complete, you'll need to create the following Repository secrets in GitHub. Here are the steps:
1. In GitHub, click on the Settings tab for your repository and click on the Secrets and variables and then Actions.
2. Click the New repository secret button and enter:
   Name = HUB_ORG_USER
   Secret = the Salesforce Username you'll use to authenticate - that can be for a DevHub, sandbox or production org
3. Click the Add Secret button to save.
4. Click the New repository secret button and enter:
   Name = HUB_ORG_CLIENTID
   Secret = the Consumer Key value from step 2 - create a connected app goes here
5. Click the Add Secret button to save.


## GitHub Action Configuration
You may want to make the following edits to any of the yml files:
- change the branch names that trigger the action
- change permission set names

