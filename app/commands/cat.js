import {TermColors} from '../constants.js';
import fileSystem from '../file-system.js';
import {colorize} from '../utils.js';

const cat = {
  id: "cat",
  description: 'Zeige den Inhalt der Datei an',
  usage: 'cat [file ...]',
  args: -1,
  async exec(term, args) {
    for (const fileName of args) {
      const file = fileSystem.get(fileName);
      if (!file) {
        term.writeln(colorize(TermColors.Red, '[error]: ') + `"${fileName}": Keine solche Datei oder Verzeichnis gefunden`);
        continue;
      } 
      if (!file.name.includes('.md')) {
        term.writeln(colorize(TermColors.Red, '[error]: ') + `"${file.name}": Datei encoding nicht unterstützt!`);
        continue;
      }
      for (const line of file.content.split('\n')) {
        if (line.startsWith('#')) {
          term.writeln(colorize(TermColors.Green, line));
        } else {
          term.writeln(line);
        }
      }
    }
  }
};

export default cat;

