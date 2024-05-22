import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const LoginSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    code: z.optional(z.string()),
  });
  
  export const getUserByEmail = async (email: string) => {
    try {
      const user = await db.user.findUnique({ where: { email } });
  
      return user;
    } catch {
      return null;
    }
  };

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
              
              const validatedFields = LoginSchema.safeParse(credentials);
              if (validatedFields.success) {
                const { email, password } = validatedFields.data;
                
                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;
      
                const passwordsMatch = await bcrypt.compare(
                  password,
                  user.password,
                );
      
                if (passwordsMatch) return user;
              }
      
              return null;
            }
          })],

});