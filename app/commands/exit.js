import {sleep} from "../utils.js";

const exit = {
  id: "exit",
  args: 0,
  description: 'Löscht derzeitige Session...',
  async exec(term, _args) {
    term.writeln('Löscht Session...');
    await sleep(1000);
    window.location.href = 'https://twitch.tv/flumuffel';
  },
};

export default exit;
