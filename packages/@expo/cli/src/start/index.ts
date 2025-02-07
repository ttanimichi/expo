#!/usr/bin/env node
import chalk from 'chalk';

import { Command } from '../../bin/cli';
import * as Log from '../log';
import { assertArgs, getProjectRoot } from '../utils/args';
import { logCmdError } from '../utils/errors';

export const expoStart: Command = async (argv) => {
  const args = assertArgs(
    {
      // Types
      '--help': Boolean,
      '--clear': Boolean,
      '--max-workers': Number,
      '--no-dev': Boolean,
      '--minify': Boolean,
      '--https': Boolean,
      '--force-manifest-type': String,
      '--port': Number,
      '--dev-client': Boolean,
      '--scheme': String,
      '--android': Boolean,
      '--ios': Boolean,
      '--web': Boolean,
      '--host': String,
      '--tunnel': Boolean,
      '--lan': Boolean,
      '--localhost': Boolean,
      '--offline': Boolean,
      // Aliases
      '-h': '--help',
      '-c': '--clear',
      '-p': '--port',
      '-a': '--android',
      '-i': '--ios',
      '-w': '--web',
      '-m': '--host',
    },
    argv
  );

  if (args['--help']) {
    Log.exit(
      chalk`
  {bold Description}
    Start a local dev server for the app

  {bold Usage}
    $ npx expo start <dir>

  <dir> is the directory of the Expo project.
  Defaults to the current working directory.

  {bold Options}
    -a, --android                          Opens your app in Expo Go on a connected Android device
    -i, --ios                              Opens your app in Expo Go in a currently running iOS simulator on your computer
    -w, --web                              Opens your app in a web browser

    -c, --clear                            Clear the bundler cache
    --max-workers <num>                    Maximum number of tasks to allow Metro to spawn
    --no-dev                               Bundle in production mode
    --minify                               Minify JavaScript    

    -m, --host <mode>                      lan, tunnel, localhost. Dev server hosting type. Default: lan.
                                           - lan: Use the local network
                                           - tunnel: Use any network by tunnel through ngrok
                                           - localhost: Connect to the dev server over localhost
    --tunnel                               Same as --host tunnel
    --lan                                  Same as --host lan
    --localhost                            Same as --host localhost

    --offline                              Skip network requests and use anonymous manifest signatures
    --https                                Start the dev server with https protocol
    --scheme <scheme>                      Custom URI protocol to use when launching an app
    -p, --port <port>                      Port to start the dev server on (does not apply to web or tunnel). Default: 19000

    --dev-client                           Experimental: Starts the bundler for use with the expo-development-client
    --force-manifest-type <manifest-type>  Override auto detection of manifest type
    -h, --help                             output usage information
`,
      0
    );
  }

  const projectRoot = getProjectRoot(args);
  const { resolveOptionsAsync } = await import('./resolveOptions');
  const options = await resolveOptionsAsync(projectRoot, args).catch(logCmdError);

  const { APISettings } = await import('../api/settings');
  APISettings.isOffline = options.offline;

  const { startAsync } = await import('./startAsync');
  return startAsync(projectRoot, options, { webOnly: false }).catch(logCmdError);
};
