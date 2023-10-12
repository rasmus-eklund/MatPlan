import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENT_ID!,
      clientSecret: process.env.GOOGLECLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default options;
