
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import connect from "./utils/db"
import User from "./models/Users"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,
    Credentials({
  credentials: {
   
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },
  authorize: async (credentials) => {
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
                credentials.password as string,
                user.password as string
                
            );

            if (isPasswordCorrect) {
               return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error("err",err as any);
        }
      
      },
}),

  ],

  pages: {
    signIn: "/auth/login",
  },
})