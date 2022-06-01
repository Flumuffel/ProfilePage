import {TermColors} from "../constants.js";
import {colorize, sleep} from "../utils.js";

const api = 'https://api.thecatapi.com/v1/images/search?category_ids=1';


const randc = {
  id: "randc",
  description: 'Öffne ein random Katzenfoto',
  args: 0,
  async exec(term, _args) {
    term.writeln('generiert Katze...');
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(api, {
        signal: controller.signal,
        headers: {
          apiKey: '380794ef-b3c5-4a5a-b4b1-375b576c5b01',
        },
      });
      clearTimeout(id);
      if (!res.ok) {
        term.writeln(colorize(TermColors.Red, `[error] Heute keine Katzen :( -- ${res.statusText}`));
      } else {
        const [cat] = await res.json();
        term.writeln(colorize(TermColors.Green, 'Spawnt Katze...'));
        await sleep(1000);
        window.open(cat.url);
      }
    } catch (e) {
      term.writeln(colorize(TermColors.Red, `[error] Heute keine Katzen :( -- ${e.message}`));
    }
  },
};

export default randc;
