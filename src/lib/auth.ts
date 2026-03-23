import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    Google({
      allowDangerousEmailAccountLinking: true, // allows Google to link to existing email account
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // No user or no password hash — invalid credentials either way
        if (!user || !user.passwordHash) throw new InvalidCredentialsError();

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!isValid) throw new InvalidCredentialsError();

        return {
          ...user,
          rememberMe: credentials.rememberMe === "on",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.rememberMe = user.rememberMe;
        token.expiresAt =
          Math.floor(Date.now() / 1000) +
          (user.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60);
      }

      if (token.expiresAt && Date.now() / 1000 > (token.expiresAt as number)) {
        return null;
      }

      if (!token.sub) return token;

      const userExists = await prisma.user.findUnique({
        where: { id: token.sub as string },
        select: { id: true },
      });

      if (!userExists) return null;

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  debug: process.env.NODE_ENV === "development",
});
