/// <reference types="svelte" />

declare module '*.svg' {
  const src: ConstructorOfATypedSvelteComponent;
  export default src;
}

declare module 'rollup-plugin-svelte-svg' {
  export const svelteSVG: (options?: unknown) => import('rollup').Plugin;
}

declare module 'rollup-plugin-css-only' {
  const css: (options?: unknown) => import('rollup').Plugin;
  export default css;
}
