import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        // let user = null;
        // const pwHash = saltAndHashPassword(credentials.password);
        // user = await getUserFromDb(credentials.email, pwHash);
        // if (!user) {
        //   throw new  Error("Invalid credentials.");
        // }
        return {
          id: "1",
          email: "test@test.com",
          name: "Test User",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
