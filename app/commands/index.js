import {TermColors} from '../constants.js';
import { colorize, getSpacing} from '../utils.js';

import cat from './cat.js';
import cowsay from './cowsay.js';
import download from './download.js';
import exit from './exit.js';
import ls from './ls.js';
import open from './open.js';
import randc from './randc.js';
import rm from './rm.js';
import uname from './uname.js';
import whoami from './whoami.js';
import twitch from './twitch.js';

const CommandGroups = [
  {
    name: 'Information',
    commands: [
      whoami,
      uname,
    ],
  },
  {
    name: 'FileSystem',
    commands: [
      ls,
      open,
      download,
      rm,
    ]
  },
  {
    name: 'Fun',
    commands: [
      cowsay,
      randc,
    ]
  },
  {
    name: 'System',
    commands: [
      {
        id: 'man',
        usage: 'man command',
        description: 'Zeige die Anleitung für einen command',
        args: 1,
        async exec(term, args) {
          const command = SystemCommands.find(c => c.id === args[0]);
          if (!command) {
            term.writeln(colorize(TermColors.Red, `[error]: Command "${args[0]}" nicht gefunden`))
            return;
          }
          term.writeln('NAME');
          term.writeln(`\t ${command.id} - ${command.description}`);
          if (command.usage) {
            term.writeln('\nSYNOPSIS');
            term.writeln(`\t ${command.usage}`);
          }
        }
      }
    ]
  }
]

const SystemCommands = [
  cat,
  cowsay,
  download,
  exit,
  ls,
  
  twitch,

  {
    id: 'man',
    usage: 'man command',
    description: 'Zeige die Anleitung für einen command',
    args: 1,
    async exec(term, args) {
      const command = SystemCommands.find(c => c.id === args[0]);
      if (!command) {
        term.writeln(colorize(TermColors.Red, `[error]: Command "${args[0]}" nicht gefunden`))
        return;
      }
      term.writeln('NAME');
      term.writeln(`\t ${command.id} - ${command.description}`);
      if (command.usage) {
        term.writeln('\nSYNOPSIS');
        term.writeln(`\t ${command.usage}`);
      }
    }
  },

  open,
  randc,
  rm,
  uname,
  whoami,

  {
    id: 'help',
    args: 0,
    async exec(term, _args) {
      // term.writeln('Verfügbare commands:\n');
      term.write('\n');
      // Add 3 tabs for spacing. Align each description to the first command description
      const firstCommandSpacing = SystemCommands[0].id.length + 12;
      for (const group of CommandGroups) {
        term.writeln(`${getSpacing(0.5)}${colorize(TermColors.Red, group.name + ':')}`);
        for (const command of group.commands) {
          term.writeln(`\t${colorize(TermColors.Green,command.id)}${getSpacing(firstCommandSpacing - command.id.length)} ${command.description}`);
        }
        term.write('\n');
      }
      // term.writeln('\n\n');
      // for (const {id, description} of SystemCommands) {
      //   if (id === 'help') continue;

      //   term.writeln('\t' + colorize(TermColors.Green, id) + getSpacing(firstCommandSpacing - id.length) + description);
      // }
    },
  },
];

export async function exec(userInput, term) {
  const [input, ...args] = userInput.split(/\s+/);
  const command = SystemCommands.find(c => c.id === input);
  if (!command) {
    return false;
  }

  if (args.length > 0) {
    if (command.args === 0) {
      term.writeln(colorize(TermColors.Red, `${command.id} nimmt dieses argument nicht an`));
      return true;
    }

    if (command.args === -1) {
      // Accepts 1 or more
      await command.exec(term, args);
      return true;
    }

    if (command.args !== args.length) {
      term.writeln(colorize(TermColors.Red, 'Falsche argumente'));
      term.writeln(`usage: ${command.usage}`);
    } else {
      await command.exec(term, args);
    }
  } else {
    if (command.args === 0) {
      await command.exec(term, args);
    } else {
      term.writeln(colorize(TermColors.Red, 'Falsche argumente'));
      term.writeln(`usage: ${command.usage}`);
    }
  }
  return true;
}
