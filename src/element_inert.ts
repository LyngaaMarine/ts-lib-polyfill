if (!("inert" in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, "inert", {
    get(): boolean {
      return (this as HTMLElement).hasAttribute("inert");
    },
    set(value: boolean) {
      if (value) (this as HTMLElement).setAttribute("inert", "");
      else (this as HTMLElement).removeAttribute("inert");
    },
    configurable: true,
    enumerable: true,
  });
}
