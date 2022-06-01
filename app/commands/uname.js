const uname = {
  id: 'uname',
  description: 'Gibt deine Systeminformationen aus',
  args: 0,
  async exec(term, _args) {
    term.writeln(navigator.userAgent);
  }
}

export default uname;
