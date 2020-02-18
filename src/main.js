const chalk = require('chalk');
const execa = require('execa');
const fs = require('fs');
const gitignore = require('gitignore');
const Listr = require('listr');
const ncp = require('ncp');
const path = require('path');
const { projectInstall } = require('pkg-install');
const license = require('spdx-license-list/licenses/MIT');
const { promisify } = require('util');

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, { clobber: false });
}

async function createGitignore(options) {
  const file = fs.createWriteStream(path.join(options.targetDirectory, '.gitignore'), { flags: 'a' });

  return writeGitignore({
    type: 'Node',
    file,
  });
}

async function createLicense(options) {
  const targetPath = path.join(options.targetDirectory, 'LICENSE.md');
  const licenseContent = license.licenseText.replace('<year>', new Date().getFullYear()).replace('<copyright holders>', `${options.name} (${options.email})`);

  return writeFile(targetPath, licenseContent, 'utf8');
}

async function initGit(options) {
  const result = await execa('git', ['init'], { cwd: options.targetDirectory });

  if (!result.failed) {
    return Promise.resolve(result);
  }

  return Promise.reject(new Error('Failed to initialize git'));
}

async function addRepository(options) {
  const result = await execa.shell(`git remote add origin ${options.repository}`);

  if (!result.failed) {
    return Promise.resolve(result);
  }

  return Promise.reject(new Error('Failed to add repository'));
}

async function setInfos(options) {
  const file = fs.readFileSync(path.join(options.targetDirectory, 'package.json'));
  const packageFile = JSON.parse(file);

  console.log(options);
  packageFile.repository.url = options.repository;
  packageFile.bugs.url = options.repository;
  packageFile.homepage = options.repository;

  console.log(packageFile.name);

  fs.writeFileSync(path.join(options.targetDirectory, 'package.json'), JSON.stringify(packageFile));
}

async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
    email: options.email || '',
    name: options.name || '',
  };

  const templateDir = path.resolve(`${__dirname}'../../templates`, options.template);

  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));

    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: 'Copy project files',
        task: () => copyTemplateFiles(options),
      }, {
        title: 'Create gitignore',
        task: () => createGitignore(options),
      }, {
        title: 'Create License',
        task: () => createLicense(options),
      }, {
        title: 'Initialize git',
        task: () => initGit(options),
        enabled: () => options.git,
      }, {
        title: 'Add repository',
        task: () => addRepository(options),
        enabled: () => options.git && !options.skipPrompts && options.repository !== '',
      }, {
        title: 'Set package.json infos',
        task: () => setInfos(options),
        // enabled: () => options.git && !options.skipPrompts,
      }, {
        title: 'Install dependencies',
        task: () => projectInstall({
          cwd: options.targetDirectory,
        }),
        skip: () => (!options.runInstall ? 'Pass --install to automatically install dependencies' : undefined),
      },
    ],
    {
      exitOnError: false,
    },
  );

  await tasks.run();

  console.log('%s', chalk.green.bold('Finished successfully'));

  return true;
}

async function help() {
  console.log(`
  Usage: botgen [command] [options]
  
  Commands:
    Discord         generate new Discord bot
    Telegram        generate new Telegram bot
    Twitter         generate new Twitter bot

  Options:
    -g, --git       init GIT
    -y, --yes       skip answers
    -i, --install   automatically install dependencies
    -h, --help      all available commands and options
  `);
  return true;
}

module.exports = {
  createProject,
  help,
};
