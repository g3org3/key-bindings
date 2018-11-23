export default (keybidings, config = {}) => {
  const truncateAt = Number(config.truncateAt) || 4;
  let pressedKeys = [];
  const getLastN = (a, n) => a.slice(a.length - n);
  const mactrans = k => (k === '*' ? 'Meta' : k);
  const wintrans = k => (k === '*' ? 'Control' : k);
  const isPatternMatched = (pattern, keys) => {
    const mac = keys.map(mactrans).join('-');
    const win = keys.map(wintrans).join('-');
    return pattern === mac || pattern === win;
  };
  return e => {
    const { key } = e;

    // add to our history of pressed keys
    pressedKeys.push(key);

    // truncate array if length is over N
    if (pressedKeys.length > truncateAt)
      pressedKeys = getLastN(pressedKeys, truncateAt);

    Object.keys(keybidings).map(pattern => {
      const plength = pattern.split('-').length;
      // create a pattern: join last N pressed keys
      const currentPattern = getLastN(pressedKeys, plength).join('-');
      if (isPatternMatched(currentPattern, pattern.split('-'))) {
        e.preventDefault();
        keybidings[pattern]();
      }
      return pattern;
    });
  };
};
