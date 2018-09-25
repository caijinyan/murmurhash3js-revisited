const log = (input, expected, actual, success) => {
  const logFn = success ? console.log : console.warn;
  logFn(`${success ? 'PASS' : 'FAIL'} '${input}': ${expected} ${actual}`);
}
export const validator = (hashFn, referenceImplementation) => input => {
  const expected = referenceImplementation(input);
  const actual = hashFn(input);
  const success = expected === actual;
  log(input, expected, actual, success);
  return success;
}


