import Google from '@auth/core/providers/google';
import AzureAD from "@auth/core/providers/azure-ad"
import { defineConfig } from 'auth-astro';
import configEnv from './.env_config.ts';

export default defineConfig({
  providers: [
    Google({
      clientId: configEnv.google.clientId,
      clientSecret: configEnv.google.clientSecret,
    }),
    AzureAD({
      clientId: configEnv.azure.clientId,
      clientSecret: configEnv.azure.clientSecret,
      tenantId: configEnv.azure.tenantId,
    })
  ],
  callbacks: {
    jwt({ token, user,account }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.name = account.provider
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name
      return session
    },
  },
});