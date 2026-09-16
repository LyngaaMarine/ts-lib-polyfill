if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, "at", {
    value<T>(this: T[], index: number): T | undefined {
      const integer = Math.trunc(Number(index)) || 0;
      const offset = integer < 0 ? this.length + integer : integer;
      return this[offset];
    },
    configurable: true,
    writable: true,
  });
}
