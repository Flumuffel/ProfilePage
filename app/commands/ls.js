import fileSystem from "../file-system.js";

const ls = {
  id: "ls",
  description: 'Liste aller Files',
  args: 0,
  async exec(term, _args) {
    var count = 0;
    for (const file of fileSystem.getAll()) {
      term.write(file + '\t\t');
      count++;
    }
    term.writeln('');
    if(count == 0) {
      term.writeln('Keine Dateien gefunden!');
    }
  }
};

export default ls;
