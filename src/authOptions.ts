import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SuccessAuthResponse } from "./Interfaces/AuthInterface";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Routes Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(values) {
        const response = await fetch(`${process.env.API_URL}auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: values?.email,
            password: values?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result: SuccessAuthResponse = await response.json();
        if (result.message == "success") {
          return {
            id: result.user.email,
            user: result.user,
            token: result.token,
          };
        } else {
          throw new Error(result.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.token = token.token;
      }
      return session;
    },
  },
};
