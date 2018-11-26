interface KeyBindMap {
  [s: string]: (e: {}) => {};
}

interface ConfigMap {
  truncateAt?: number;
  verbose?: boolean;
}

export const createOnKeyDownBinding = (
  keybidings?: KeyBindMap,
  config?: ConfigMap
) => {
  if (!keybidings) return () => {};

  const truncateAt = Number(config && config.truncateAt) || 4;
  let pressedKeys: string[] = [];
  const getLastN = (a: string[], n: number) => a.slice(a.length - n);
  const mactrans = (k: string) => (k === "*" ? "Meta" : k);
  const wintrans = (k: string) => (k === "*" ? "Control" : k);
  const isPatternMatched = (pattern: string, keys: string[]) => {
    const mac = keys.map(mactrans).join("-");
    const win = keys.map(wintrans).join("-");
    return pattern === mac || pattern === win;
  };

  return (e: { key: string }) => {
    const { key } = e;

    if (config && config.verbose) console.log(key);

    // add to our history of pressed keys
    pressedKeys.push(key);

    // truncate array if length is over N
    if (pressedKeys.length > truncateAt)
      pressedKeys = getLastN(pressedKeys, truncateAt);

    Object.keys(keybidings).map((pattern: string) => {
      const plength = pattern.split("-").length;
      // create a pattern: join last N pressed keys
      const currentPattern = getLastN(pressedKeys, plength).join("-");
      if (isPatternMatched(currentPattern, pattern.split("-"))) {
        keybidings[pattern](e);
      }

      return pattern;
    });
  };
};
