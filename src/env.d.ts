/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { AstroAdapter } from 'astro';

declare module 'astro' {
  export interface AstroConfig {
    adapter: AstroAdapter;
  }
}
