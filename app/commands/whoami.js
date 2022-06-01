import {TermColors} from "../constants.js";
import {colorize} from "../utils.js";

const LAST_UPDATE = '01/06/2022';

const whoami = {
  id: "whoami",
  args: 0,
  description: 'Zeigt dir die Informationen von mir an',
  async exec(term, _args) {
    term.writeln(colorize(TermColors.Green, 'Name: ') + 'Flumuffel');
    term.writeln(colorize(TermColors.Green, 'Host: ') + window.location.host);
    term.writeln(colorize(TermColors.Green, 'Derzeitige Position: ') + 'Ausbildung Informatik Systemtechnik');
    term.writeln(colorize(TermColors.Green, 'Standort: ') + 'Schweiz');
    term.writeln(colorize(TermColors.Green, 'Hobbies: ') + '[programmieren, streamen, spielen]');
    term.writeln(colorize(TermColors.Green, 'Letztes update: ') + LAST_UPDATE);
  },
};

export default whoami;
