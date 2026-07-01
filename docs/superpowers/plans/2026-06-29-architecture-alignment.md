# Architecture Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the EONS frontend with its documented Pragmatic DDD + Hexagonal rules: real four-layer module structure, all network code in `infrastructure/` behind a single shared HTTP client, no axios in components, no `aplication`/`views` deviations, and Vitest tests for `domain`/`application` logic.

**Architecture:** Layers are `ui → application → domain`, with `infrastructure` implementing ports. The existing shared axios client (`axiosI`, `intanceAxios`) is relocated from `src/utils/api/` into infrastructure and re-exported through a temporary shim so the 22 import sites keep working while each module is migrated one at a time. Each module migration is a mechanical, repeatable recipe applied to that module's real code.

**Tech Stack:** Astro 5, React 19, TypeScript 5.9, axios 1.12, Vitest + @testing-library/react (to be added), js-cookie.

## Global Constraints

- `domain/` is pure TypeScript — no `react`, `axios`, `astro`, `js-cookie`, `window`, or any side effect.
- All network/cookies/storage/socket code lives only in `infrastructure/`.
- All module API calls go through the shared HTTP client; never `import axios` outside the shared client file.
- Orchestration + React state live in `application/` hooks (one hook per use case); components stay thin and contain no network calls.
- Layer folder is spelled `application` (never `aplication`); UI lives in `ui/` (never `views/`).
- New `domain` and `application` logic ships with co-located `*.test.ts(x)`.
- Conventional Commits, no AI attribution (see eons-frontend-commits). Commit frequently — after each green task.
- Don't over-engineer: migrate behavior 1:1. No new features, no API contract changes.
- Path aliases available: `@components/*` → `src/components/*`. Foundation adds `@modules/*` → `src/modules/*`.

---

## Phase 0 — Foundation

This phase is the prerequisite for everything else. It is fully detailed below.

### Task 0.1: Add Vitest + Testing Library tooling

**Files:**
- Modify: `package.json` (devDependencies + scripts)
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tsconfig.json` (add `@modules/*` path)
- Test: `src/test-sanity.test.ts` (temporary, deleted in last step)

**Interfaces:**
- Produces: `npm test` runs Vitest in run mode; `npm run test:watch` runs watch mode. `renderHook`, `render`, `screen` available from `@testing-library/react`. `vi` global available.

- [ ] **Step 1: Install dev dependencies**

```bash
npm install -D vitest@^2 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14 jsdom@^25 @vitest/coverage-v8@^2
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: false,
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

- [ ] **Step 4: Add scripts to `package.json`**

In the `"scripts"` block add:

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 5: Add `@modules/*` path alias in `tsconfig.json`**

In `compilerOptions.paths`, alongside the existing entries:

```json
      "@modules/*": ["./src/modules/*"],
```

- [ ] **Step 6: Write a sanity test**

Create `src/test-sanity.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("vitest wiring", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 7: Run the sanity test**

Run: `npm test`
Expected: PASS, 1 test passed.

- [ ] **Step 8: Delete the sanity test and commit**

```bash
rm src/test-sanity.test.ts
git add package.json package-lock.json vitest.config.ts vitest.setup.ts tsconfig.json
git commit -m "chore(testing): set up Vitest + Testing Library"
```

### Task 0.2: Relocate the shared HTTP client into infrastructure (with shim)

The shared client currently lives at `src/utils/api/index.ts`. Move it under `Shared/infrastructure/` and leave a re-export shim at the old path so the 22 existing import sites keep compiling. Modules drop the shim dependency as they migrate; the shim is deleted in the final cleanup phase.

**Files:**
- Create: `src/modules/Shared/infrastructure/httpClient.ts` (moved content)
- Modify: `src/utils/api/index.ts` → becomes a shim re-export
- Test: `src/modules/Shared/infrastructure/httpClient.test.ts`

**Interfaces:**
- Produces: `axiosI(token?: string): AxiosInstance` and `intanceAxios: AxiosInstance`, exported from `@modules/Shared/infrastructure/httpClient`. Behavior identical to current `src/utils/api/index.ts` (auth header injection, 401 refresh, 403 email-verification redirect).
- Consumes: `../../../../.env_config` (re-pathed correctly for the new location), `js-cookie`, `src/utils/validations` `validMail`.

- [ ] **Step 1: Write the failing test**

Create `src/modules/Shared/infrastructure/httpClient.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";

vi.mock("js-cookie", () => ({
  default: { get: vi.fn(() => "tok"), set: vi.fn(), remove: vi.fn() },
}));

describe("httpClient", () => {
  it("exposes axiosI and intanceAxios", async () => {
    const mod = await import("./httpClient");
    expect(typeof mod.axiosI).toBe("function");
    expect(mod.intanceAxios).toBeDefined();
  });

  it("axiosI returns an instance with the configured baseURL", async () => {
    const { axiosI } = await import("./httpClient");
    const instance = axiosI("tok");
    expect(instance.defaults.baseURL).toBeDefined();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- httpClient`
Expected: FAIL — `Cannot find module './httpClient'`.

- [ ] **Step 3: Create `httpClient.ts` by moving the current client**

Copy the full current contents of `src/utils/api/index.ts` into `src/modules/Shared/infrastructure/httpClient.ts`, fixing the relative import depth for `.env_config` (from `Shared/infrastructure/` the repo root is four levels up) and `validations`:

```ts
// modules/Shared/infrastructure/httpClient.ts — shared axios client
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import configEnv from "../../../../.env_config";
import Cookies from "js-cookie";
import { validMail } from "../../../utils/validations";

const API_BASE_URL = configEnv.api;
const FRONTEND_BASE_URL = configEnv.frontend;

export const intanceAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const isClient = () => typeof window !== "undefined";

export function axiosI(apiToken: string | undefined) {
  // ... identical body to the current src/utils/api/index.ts axiosI ...
}
```

> Note for executor: copy the `axiosI` body verbatim from the current `src/utils/api/index.ts`; only the three import paths at the top change.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- httpClient`
Expected: PASS.

- [ ] **Step 5: Turn the old path into a shim**

Replace the entire contents of `src/utils/api/index.ts` with:

```ts
// DEPRECATED shim — re-exports the shared client from its infrastructure home.
// Each module drops this dependency as it migrates; delete in final cleanup.
export { axiosI, intanceAxios } from "@modules/Shared/infrastructure/httpClient";
```

- [ ] **Step 6: Verify the build still type-checks**

Run: `npx astro check`
Expected: no new errors versus the pre-change baseline (record the baseline error count before Step 5).

- [ ] **Step 7: Commit**

```bash
git add src/modules/Shared/infrastructure/httpClient.ts src/modules/Shared/infrastructure/httpClient.test.ts src/utils/api/index.ts
git commit -m "refactor(shared): move shared axios client into infrastructure"
```

---

## Per-Module Migration Recipe

Apply this recipe to each module in the Inventory below. Each module is its own
task with its own commit. **Read the module's real files first**, then:

1. **Create `infrastructure/<feature>Api.ts`** in the module. Move the matching
   `src/utils/api/<file>.ts` functions here verbatim, changing only the client
   import to `import { axiosI, intanceAxios } from "@modules/Shared/infrastructure/httpClient";`.
2. **Extract any axios/network call out of components/hooks** into that
   `infrastructure/<feature>Api.ts`, and have the component call it through an
   `application/` hook (create `application/use<Thing>.ts` if the orchestration
   currently lives inside a component).
3. **Move pure types/enums/ports** the module owns into `domain/` (many already
   live in `components/.../domain` or `interfaces/` — relocate to `<Feature>/domain/`).
4. **Rename layers:** `aplication/ → application/`, `views/ → ui/`. Move
   top-level `<Feature>.astro` + presentational components under `ui/`.
5. **Repoint imports** at every call site (use the import-site list from the
   audit; `grep -rn "utils/api/<file>"`).
6. **Delete** the now-empty `src/utils/api/<file>.ts` once no import references it.
7. **Add tests:** pure functions moved into `domain/` get direct unit tests;
   new `application/` hooks get a `renderHook` test with the infrastructure
   function mocked (object-mother factories per eons-frontend-testing).
8. **Verify:** `npm test` green for the module, `npx astro check` no new errors.
9. **Commit:** `refactor(<feature>): align module with hexagonal layers`.

A module touches only its own folder + its `utils/api` file + the import sites
that consume it. Never edit another module's internals.

---

## Module Inventory (migration order — low risk → high risk)

Ordered so presentational/no-API modules go first (warm-up, low blast radius),
shared/auth/core modules last (highest dependency fan-out). Check off each.

**Group A — presentational, no API (structure-only: ensure `ui/`, kill stray folders):**
- [ ] `About` — components only → confirm `ui/` layout
- [ ] `Contact`
- [ ] `EmailConfirmation` — has `components/Button` that imports utils/api → needs infra+hook
- [ ] `FailPay`, `Inf`, `Information`, `Essence`-`ServicesExamples`, `Usage`, `Response`, `Result` (Result imports utils/api)
- [ ] `Landing` (+ `shared/`), `Services` (+ `shared/`), `SpiritualFamily`

**Group B — API-backed feature modules (full recipe):**
- [ ] `Launch` — api: `launch.ts` → `Launch/infrastructure/launchApi.ts`
- [ ] `Dialogs` — api: `dialogApi.ts`; hooks in `components/Content/hooks` → `application/`
- [ ] `SpiritualFamily` — api: `spiritsApi.ts`; hook `useGetAllSpirits.ts` → `application/`
- [ ] `Notifications` — has `domain/`; `components/Item/Item.tsx` imports utils/api → infra+hook
- [ ] `Essence` — api: `essenceApi.ts` (essence half); **`Historial.tsx` calls axios directly** → extract to infra; `List/domain` → `Essence/domain`
- [ ] `payment` — api: `essenceApi.ts` (payment half); has its own `Form/hooks`, `Form/interfaces` → `domain/`. Split shared `essenceApi.ts` cleanly between Essence and payment.
- [ ] `Result` / lanzamientos — api: `evaluation.ts` → owning module's `infrastructure/`
- [ ] `Throw` — api: `throwApi.ts`; **rename `aplication/`→`application/`, `views/`→`ui/`**; already has `domain/`

**Group C — core/auth (highest fan-out, do last):**
- [ ] `user` — api: `userApi.ts`; **rename `aplication/`→`application/`**; flatten the odd `aplication/Auth/domain` into `user/domain`; hooks `useContent`/`useChangePass` → `application/`
- [ ] `Shared` — `context/UserContext.tsx` imports utils/api → route through infra; `hooks/` audit

---

## Final Cleanup Phase

- [ ] **Step 1:** Confirm no source imports `utils/api` except removed files:
  `grep -rn "utils/api" src` → expect zero hits.
- [ ] **Step 2:** Delete the shim directory `src/utils/api/` entirely.
- [ ] **Step 3:** `grep -rn "from \"axios\"\|from 'axios'" src` → only `Shared/infrastructure/httpClient.ts`.
- [ ] **Step 4:** `find src/modules -type d -name aplication -o -type d -name views` → zero hits.
- [ ] **Step 5:** `npm test` all green; `npx astro check` no new errors; `npm run build` succeeds.
- [ ] **Step 6:** Commit: `chore(shared): remove deprecated utils/api shim`.

---

## Self-Review Notes

- **Spec coverage:** every Golden Rule maps to a phase — layer boundaries (recipe steps 1–4), domain purity (step 3 + Global Constraints), network-in-infra (Phase 0.2 + recipe step 1–2), thin components (recipe step 2), tests (Phase 0.1 + recipe step 7), no `aplication`/`views` (recipe step 4, Throw/user tasks, cleanup step 4).
- **Blast radius controlled:** the shim keeps all 22 `utils/api` import sites green until each is repointed, so the migration never has a broken-build window between modules.
- **Risk note:** `essenceApi.ts` serves both `Essence` and `payment` — split it across the two modules' infrastructure rather than duplicating; migrate `Essence` first, then `payment` consumes its own slice.
- **Per-module detail is generated just-in-time:** each module's concrete file moves require reading that module's current components; the recipe is the fixed transformation, applied to real code at execution time (avoids guessed/placeholder code).
