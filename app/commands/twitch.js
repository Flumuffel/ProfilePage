import { TermColors } from "../constants.js";
import { colorize, sleep } from "../utils.js";
import fileSystem from "../file-system.js";

const twitch = {
  id: "twitch",
  description: 'Öffnet einen Stream von Twitch',
  usage: `\r\n\ttwitch User\r\n\ttwitch [Username ...]`,
  args: 1,
  async exec(term, args) {
    let url = '';
    const user = args[0];
    if (user) {
      url = `https:/twitch.tv/${user}`;
    }

    term.writeln(`Startet Stream von ${args[0]}...`);
    await sleep(1000);
    window.open(url);
  }
};

export default twitch;


