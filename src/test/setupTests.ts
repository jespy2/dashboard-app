import '@testing-library/jest-dom';

// jsdom doesn't implement matchMedia by default; Mantine uses it for color scheme
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    media: query,
    matches: false, // default to light
    onchange: null,
    addListener: () => {},       // deprecated, typing requires
    removeListener: () => {},    // deprecated, typing requires
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Stable localStorage mock (jsdom has one, but this ensures consistency)
const storage: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (k: string) => (k in storage ? storage[k] : null),
    setItem: (k: string, v: string) => { storage[k] = v; },
    removeItem: (k: string) => { delete storage[k]; },
    clear: () => { for (const k of Object.keys(storage)) delete storage[k]; },
  },
});

// ResizeObserver polyfill (Mantine ScrollArea needs it)
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!('ResizeObserver' in global)) {
  // @ts-expect-error - assign to global
  global.ResizeObserver = RO as unknown as typeof ResizeObserver;
}

if (!('requestAnimationFrame' in global)) {
  // @ts-expect-error - assign to global
  global.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
  // @ts-expect-error - assign to global
  global.cancelAnimationFrame = (id: number) => clearTimeout(id);
}