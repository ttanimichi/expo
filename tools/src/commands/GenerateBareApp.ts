import path from 'path';
import fs from 'fs-extra';
import { Command } from '@expo/commander';
import spawnAsync from '@expo/spawn-async';

import { runExpoCliAsync } from '../ExpoCLI';

type GenerateBareAppOptions = {
  template: string;
  clean?: boolean;
  outDir?: string;
};

async function action(appName: string, packageNames: string[], options: GenerateBareAppOptions) {
  async function symlinkPackageManually(packageName: string) {
    const packagePath = path.resolve(projectDir, 'node_modules', packageName);
    await fs.ensureSymlink(path.resolve(repoRoot, 'packages', packageName), packagePath);
  }

  // TODO:
  // if appName === ''
  // if packageNames.length === 0
  // configure autolinking to exclude dev-client / expo update packages

  const { clean, outDir = 'bare-apps', template = 'expo-template-bare-minimum' } = options;

  const repoRoot = path.resolve(__dirname, '../../../');
  const projectsDir = path.resolve(process.cwd(), outDir);
  const projectDir = path.resolve(process.cwd(), projectsDir, appName);

  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir);
  }

  if (clean) {
    await fs.remove(projectDir);
  }

  // these don't seem to symlink properly w/ expo-yarn-workspaces
  const symlinkedPackages = ['expo', 'expo-modules-autolinking'];

  // these seem to be included regardless of what is in node_modules (default packages for prebuild)
  const defaultPackages = [
    'expo-asset',
    'expo-application',
    'expo-constants',
    'expo-file-system',
    'expo-font',
    'expo-keep-awake',
    'expo-error-recovery',
    'expo-splash-screen',
    'expo-updates',
    'expo-dev-client',
    'expo-dev-launcher',
    'expo-dev-menu',
    'expo-dev-menu-interface',
  ];

  await runExpoCliAsync('init', [appName, '--no-install', '--template', template], {
    cwd: projectsDir,
  });

  const pkg = require(path.resolve(projectDir, 'package.json'));

  pkg['expo'] = pkg['expo'] ?? {};

  // TODO - autolinking -> { include?: [] }
  // pkg['expo']['autolinking'] = { exclude: [] };

  pkg['scripts']['postinstall'] = 'expo-yarn-workspaces postinstall';
  pkg['main'] = '__generated__/AppEntry.js';

  pkg['expo-yarn-workspaces'] = {};
  pkg['expo-yarn-workspaces']['symlinks'] = [];

  packageNames.forEach((packageName) => {
    pkg.dependencies[packageName] = '*';
    pkg['expo-yarn-workspaces']['symlinks'].push(packageName);
  });

  defaultPackages.forEach((packageName) => {
    pkg.dependencies[packageName] = '*';
    pkg['expo-yarn-workspaces']['symlinks'].push(packageName);
  });

  await fs.outputJson(path.resolve(projectDir, 'package.json'), pkg);

  console.log('Yarning');
  await spawnAsync('yarn', [], { cwd: projectDir });

  symlinkedPackages.forEach((packageName) => {
    symlinkPackageManually(packageName);
  });

  await runExpoCliAsync('prebuild', ['--clean'], { cwd: projectDir });

  const ncl = path.resolve(repoRoot, 'apps/native-component-list');

  await fs.copy(
    path.resolve(ncl, 'metro.config.js'),
    path.resolve(projectDir, 'metro.config.js')
  );

  await fs.copy(
    path.resolve(ncl, 'metro.transformer.js'),
    path.resolve(projectDir, 'metro.transformer.js')
  );

  // for some reason prebuild is updating the gradle.properties FLIPPER_VERSION which causes SoLoader crash on launch
  const gradlePropertiesPath = path.resolve(projectDir, 'android', 'gradle.properties');
  const gradleProperties = await fs.readFile(gradlePropertiesPath, { encoding: 'utf-8' });
  const updatedGradleProperies = gradleProperties.replace(
    `FLIPPER_VERSION=0.54.0`,
    `FLIPPER_VERSION=0.99.0`
  );
  await fs.outputFile(gradlePropertiesPath, updatedGradleProperies);
}

export default (program: Command) => {
  program
    .command('generate-bare-app [appName] [packageNames...]')
    .option('-c, --clean', 'Rebuild [appName] from scratch')
    .option('-o, --outDir <string>', 'Specifies the directory to build the project in')
    .option('-t, --template <string>', 'Specify the expo template to use w/ the project')
    .description(`Generates a bare app with the specified packages symlinked`)
    .asyncAction(action);
};
