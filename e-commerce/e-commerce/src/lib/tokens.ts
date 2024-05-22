import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";


export const generateTwoFactorToken = async (email: string) => {

  // this line generates a random 6 digit number
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

   const getTwoFactorTokenByEmail = async (email: string) => {
    try {
      const twoFactorToken = await db.twoFactorToken.findFirst({
        where: { email }
      });
  
      return twoFactorToken;
    } catch {
      return null;
    }
  };
  
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      }
    });
  }

  try {
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
          email,
          token,
          expires,
        }
      });
    
      return twoFactorToken;
    
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
 
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

     const getPasswordResetTokenByEmail = async (email: string) => {
        try {
          const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
          });
      
          return passwordResetToken;
        } catch {
          return null;
        }
      };
  
    const existingToken = await getPasswordResetTokenByEmail(email);
  
    if (existingToken) {
      await db.passwordResetToken.delete({
        where: { id: existingToken.id }
      });
    }
  
    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    });
  
    return passwordResetToken;
  
    
  }