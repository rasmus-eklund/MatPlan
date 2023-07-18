import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENT_ID!,
      clientSecret: process.env.GOOGLECLIENT_SECRET!,
    }),
  ],
});
