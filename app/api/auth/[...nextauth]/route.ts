import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENT_ID!,
      clientSecret: process.env.GOOGLECLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(options);

export { handler as GET, handler as POST, options as OPTIONS };
