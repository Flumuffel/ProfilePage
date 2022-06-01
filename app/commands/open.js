import { TermColors } from "../constants.js";
import { colorize, sleep } from "../utils.js";
import fileSystem from "../file-system.js";

const WebApps = [
  {
    name: 'Twitch',
    url: 'https://twitch.tv/flumuffel'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/flumuffel'
  }
];

const open = {
  id: "open",
  description: 'Öffne Dateien oder Programme',
  usage: `\r\n\topen Datei\r\n\topen [${WebApps.map(app => app.name).join(' | ')}]`,
  args: 1,
  async exec(term, args) {
    let url = '';
    const file = fileSystem.get(args[0]);
    if (file) {
      url = `${window.location.origin}${file.path}`;
    } else {
      const app = WebApps.find(a => a.name === args[0]);
      if (app) {
        url = app.url;
      }
    }
   
    if (url === '') {
      term.writeln(colorize(TermColors.Red, '[error]: ') + `"${args[0]}" Keine solche Datei oder Programm gefunden`);
      term.writeln(this.usage);
      return;
    }
    term.writeln(`öffnet ${args[0]}...`);
    await sleep(1000);
    window.open(url);
  }
};

export default open;


