export type AbortSignalPolyfill = {
  prototype: AbortSignal;
  new (): AbortSignal;
  abort(reason?: any): AbortSignal;
  timeout(milliseconds: number): AbortSignal;
  any(signals: AbortSignal[]): AbortSignal;
};

if (typeof AbortSignal === "undefined") {
  console.warn("AbortSignal is not defined in this environment.");
} else {
  if (!("any" in AbortSignal)) {
    Object.defineProperty(AbortSignal, "any", {
      value: (signals: AbortSignal[]): AbortSignal => {
        if (signals.length === 0) {
          const controller = new AbortController();
          return controller.signal;
        }
        if (signals.length === 1) return signals[0];
        for (const signal of signals) if (signal.aborted) return signal;
        const controller = new AbortController();
        const unlisteners: Array<() => void> = Array<() => void>(
          signals.length,
        );
        const cleanup = () => {
          for (const unsubscribe of unlisteners) unsubscribe();
        };
        signals.forEach((signal, index) => {
          const handler = () => {
            controller.abort(signal.reason);
            cleanup();
          };
          signal.addEventListener("abort", handler);
          unlisteners[index] = () =>
            signal.removeEventListener("abort", handler);
        });
        return controller.signal;
      },
      configurable: true,
      writable: true,
    });
  }
  if (!("timeout" in AbortSignal)) {
    Object.defineProperty(AbortSignal, "timeout", {
      value: (ms: number): AbortSignal => {
        const controller = new AbortController();
        setTimeout(() => {
          controller.abort(
            new DOMException(`signal timed out after ${ms} ms`, "TimeoutError"),
          );
        }, ms);
        return controller.signal;
      },
      configurable: true,
      writable: true,
    });
  }
  if (!("abort" in AbortSignal)) {
    Object.defineProperty(AbortSignal, "abort", {
      value: (reason?: any): AbortSignal => {
        const controller = new AbortController();
        controller.abort(reason);
        return controller.signal;
      },
      configurable: true,
      writable: true,
    });
  }
}
