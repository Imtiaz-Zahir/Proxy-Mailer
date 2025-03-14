import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUsersByEmail } from "./services/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) throw new Error("No email found in user object");
        if (!user.name) throw new Error("No name found in user object");

        const doseUserExists = await getUsersByEmail(user.email);

        if (!doseUserExists) {
          await createUser({
            email: user.email,
            name: user.name,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
