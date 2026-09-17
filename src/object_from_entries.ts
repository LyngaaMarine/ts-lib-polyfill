if (!Object.fromEntries) {
  Object.fromEntries = function <T = any>(
    entries: Iterable<readonly [PropertyKey, T]>,
  ): { [k: string]: T } {
    const obj: Record<PropertyKey, T> = Object.create(null) as Record<
      PropertyKey,
      T
    >;
    for (const entry of entries) {
      if (!entry || entry.length < 2)
        throw new TypeError("Iterator value is not an entry object");
      obj[entry[0]] = entry[1];
    }
    return obj as { [k: string]: T };
  };
}
