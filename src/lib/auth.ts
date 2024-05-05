import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";


import GoogleProvider from "next-auth/providers/google"

export const authConfig: NextAuthOptions = {
    providers: [
     
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
      }),
     
    ],
    session: {
        strategy: 'jwt',
       },
  };
  