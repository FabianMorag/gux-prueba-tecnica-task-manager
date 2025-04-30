import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prismaClient } from "@/app/lib/prisma";
import { signInFormSchema } from "@/app/lib/zod";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const { data, success } = signInFormSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials.");
        }

        const user = await prismaClient.user.findUnique({
          where: { email: data.email },
        });

        if (!user || !user.password) throw new Error("User not found.");

        const isValidUser = await bcrypt.compare(data.password, user.password);

        if (!isValidUser) throw new Error("Invalid credentials.");
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.userId = token.userId;
      return session;
    },
  },
} satisfies NextAuthConfig;
