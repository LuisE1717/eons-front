# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Toolchain

This project targets **Node 24** and uses **pnpm** as the package manager.

- The Node version is pinned in `.nvmrc`. With [nvm](https://github.com/nvm-sh/nvm) installed, run `nvm use` (or `nvm install`) from the project root to switch to it.
- pnpm is pinned via the `packageManager` field in `package.json`; enable it with `corepack enable`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `pnpm install`      | Installs dependencies                            |
| `pnpm dev`          | Starts local dev server at `localhost:4321`      |
| `pnpm build`        | Build your production site to `./dist/`          |
| `pnpm preview`      | Preview your build locally, before deploying     |
| `pnpm test`         | Run the Vitest suite                             |
| `pnpm exec astro …` | Run CLI commands like `astro add`, `astro check` |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## 🔐 Authentication Flow

The application supports three authentication methods: traditional email/password, Google OAuth, and Microsoft OAuth.

### 1. Email & Password Authentication

This is the standard login flow.

**Frontend:**

1. **UI Component**: The login form is located in `eons-front/src/modules/user/aplication/Auth/components/Content/Content.tsx`. This React component handles user input for email and password.
2. **API Call**: On form submission, the `postLogin` function within `Content.tsx` is triggered. It uses an `userApi` instance to send a `POST` request to the backend.
3. **Communication**: The request targets the `/auth/login` endpoint, sending the user's credentials in the request body.

**Backend:**

1. **Controller**: The request is handled by the `AuthController` at `eons-api/src/auth/auth.controller.ts`, specifically the method decorated with `@Post('/auth/login')`.
2. **Service Logic**: The controller calls the `login` method in `AuthService` (`eons-api/src/auth/auth.service.ts`).
3. **Validation**: `AuthService` finds the user by email and validates the provided password against the stored hash using `bcryptjs`.
4. **Response**: Upon successful validation, the service generates a JWT `access_token` and `refresh_token`, which are returned to the frontend to be stored for session management.

### 2. OAuth 2.0 Authentication (Google & Microsoft)

This flow is managed by the `auth-astro` library on the frontend.

**Frontend:**

1. **UI Component**: The "Continue with Google" and "Continue with Microsoft" buttons are in `eons-front/src/modules/user/items/AccountsButton.astro`.
2. **OAuth Initiation**: Clicking these buttons calls `signIn("google")` or `signIn("azure-ad")` from `auth-astro/client`. Provider configurations are in `eons-front/auth.config.mjs`.
3. **Redirect**: The user is redirected to the respective provider's login page.
4. **Callback & Backend Sync**: After successful authentication with the provider, the user is redirected back. A `useEffect` hook in `Content.tsx` detects the provider's session and calls the backend's `/auth/register` endpoint, sending the provider's token.

**Backend:**

1. **Controller**: The request is received by the `@Post('/auth/register')` method in `auth.controller.ts`.
2. **Service Logic**: This controller method calls the `register` (or a similarly named) method in `auth.service.ts`.
3. **Upsert Logic**: The service performs an "upsert" operation:
    - If a user with the provider's email **exists**, the system logs them in.
    - If the user **does not exist**, a new user is created with the email marked as verified (`isEmailVerified: true`), and then they are logged in.
4. **Response**: In both cases, the backend generates its own JWT `access_token` and `refresh_token` and returns them to the frontend, ensuring a consistent session state.

### Key Files Summary

- **Frontend (UI & Client Logic)**:
  - `eons-front/src/modules/user/aplication/Auth/components/Content/Content.tsx`: Core logic for forms and API calls.
  - `eons-front/src/modules/user/items/AccountsButton.astro`: Social login buttons.
  - `eons-front/auth.config.mjs`: OAuth provider settings for `auth-astro`.
- **Backend (Server Logic)**:
  - `eons-api/src/auth/auth.controller.ts`: Defines authentication endpoints (`/login`, `/register`).
  - `eons-api/src/auth/auth.service.ts`: Implements the business logic for all three authentication methods.

---

## 🚀 Proposed Authentication Flow (Future Implementation)

This section describes the target behavior for the OAuth login flow, which will be implemented in the future.

The goal is to separate the login and registration processes for social accounts. A user should not be automatically registered if they attempt to log in with a social account without having an existing account.

### Target OAuth 2.0 Flow (Google & Microsoft)

1. **Frontend Initiates Login**: The user clicks "Continue with Google" or "Continue with Microsoft".
2. **Provider Authentication**: The user is redirected to the provider, authenticates, and is sent back to the application.
3. **Frontend Calls Backend**: The frontend takes the token from the provider and sends it to a new, dedicated backend endpoint: `POST /auth/social-login`.
4. **Backend Validates**: The backend receives the token.
    - It verifies the token and extracts the user's email.
    - It searches the database for a user with that email.
    - **If the user exists**: The backend generates the application's own JWT `access_token` and `refresh_token` and returns them to the frontend. The user is successfully logged in.
    - **If the user does not exist**: The backend returns an error (e.g., `404 Not Found` or `401 Unauthorized`) with a message indicating that the user is not registered.
5. **Frontend Handles Response**:
    - On success, the frontend stores the tokens and redirects the user to their dashboard.
    - On error, the frontend displays a clear message to the user, such as "This account is not registered. Please sign up first."
