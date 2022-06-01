// Octal codes are not allowed in strict mode.
// Hence the hexadecimal escape sequence
export const TermColors = {
  Red: '\x1B[1;31m',
  Green: '\x1B[1;32m',
  Purple: '\x1B[1;35m',
  Reset: '\x1B[0m',
  Blue: '\x1b[1;34m',
};

export const SHELL_PROMPT = TermColors.Blue + 'anonym@flumuffel.de:~$ ' + TermColors.Reset;
