import Google from '@auth/core/providers/google';
import AzureAD from "@auth/core/providers/azure-ad"
import { defineConfig } from 'auth-astro';

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    AzureAD({
      clientId: import.meta.env.AZURE_AD_CLIENT_ID,
      clientSecret: import.meta.env.AZURE_AD_CLIENT_SECRET,
      tenantId: import.meta.env.AZURE_AD_TENANT_ID,
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
});