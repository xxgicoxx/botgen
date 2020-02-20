const inquirer = require('inquirer');

const arg = require('arg');
const { createProject, help } = require('./main');

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--help': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-h': '--help',
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    help: args['--help'] || false,
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'Discord';
  const defaultName = 'BotGen';
  const defaultEmail = 'https://github.com/xxgicoxx/botgen';
  const defaultGit = true;
  const defaultRepository = '';

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      name: options.name || defaultName,
      email: options.email || defaultEmail,
      git: options.git || defaultGit,
      repository: options.repository || defaultRepository,
    };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: [
        'Discord',
        'Telegram',
        'Twitter',
      ],
      default: defaultTemplate,
    });
  }

  questions.push({
    type: 'input',
    name: 'name',
    message: 'What\'s your full name?',
    default: defaultName,
  });

  questions.push({
    type: 'input',
    name: 'email',
    message: 'What\'s your email?',
    default: defaultEmail,
  });

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Should a git be initialized?',
      default: defaultGit,
    });
  }

  questions.push({
    when(response) {
      return response.git;
    },
    type: 'input',
    name: 'repository',
    message: 'What\'s the repository?',
    default: defaultRepository,
  });

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    name: options.name || answers.name,
    email: options.email || answers.email,
    repository: options.repository || answers.repository,
  };
}

async function cli(args) {
  let options = parseArgumentsIntoOptions(args);

  if (!options.help) {
    options = await promptForMissingOptions(options);

    await createProject(options);
  } else {
    await help();
  }
}

module.exports = {
  cli,
};
