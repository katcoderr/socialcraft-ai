"use server"
import { db } from "./db";
import {eq,sql,desc} from 'drizzle-orm'
import {Users,  GeneratedContent} from './schema'

export async function createOrUpdateUser(
    clerkUserId : string,
    email : string,
    name : string
){

    try {
        const [existingUser] = await db
        .select()
        .from(Users)
        .where(eq(Users.CustomerId, clerkUserId))
        .limit(1)
        .execute()

        if(existingUser){
            const [updatedUser] = await db
            .update(Users)
            .set({ name, email })
            .where(eq(Users.CustomerId, clerkUserId))
            .returning()
            .execute();

          return updatedUser;
        }

        const [newUser] = await db.insert(Users).values({email,name,CustomerId:clerkUserId,points:50}).returning().execute()


    } catch (error) {
        console.error("Error creating or updating user: ", error)        
        return null;
    }
}

export async function getGeneratedContentHistory(
    userId: string,
    limit: number = 10
  ) {
    try {
      const history = await db
        .select({
          id: GeneratedContent.id,
          content: GeneratedContent.content,
          prompt: GeneratedContent.prompt,
          contentType: GeneratedContent.contentType,
          createdAt: GeneratedContent.createdAt,
        })
        .from(GeneratedContent)
        .where(
          eq(
            GeneratedContent.userId,
            sql`(SELECT id FROM ${Users} WHERE customer_id = ${userId})`
          )
        )
        .orderBy(desc(GeneratedContent.createdAt))
        .limit(limit)
        .execute();
      return history;
    } catch (error) {
      console.error("Error fetching generated content history:", error);
      return [];
    }
}

export async function saveGeneratedContent(
    userId: string,
    content: string,
    prompt: string,
    contentType: string
  ) {
    try {
      const [savedContent] = await db
        .insert(GeneratedContent)
        .values({
          userId: sql`(SELECT id FROM ${Users} WHERE customer_id = ${userId})`,
          content,
          prompt,
          contentType,
        })
        .returning()
        .execute();
      return savedContent;
    } catch (error) {
      console.error("Error saving generated content:", error);
      return null;
    }
}  

export async function getUserPoints(userId: string) {
    try {

      const users = await db
        .select({ points: Users.points, id: Users.id, email: Users.email })
        .from(Users)
        .where(eq(Users.CustomerId, userId))
        .execute();

      if (users.length === 0) {
        console.log("No user found with CustomerId:", userId);
        return 0;
      }
      return users[0].points || 0;
    } catch (error) {
      console.error("Error fetching user points:", error);
      return 0;
    }
  }


export async function updateUserPoints(userId: string, points: number) {
    try {
      const [updatedUser] = await db
        .update(Users)
        .set({ points: sql`${Users.points} + ${points}` })
        .where(eq(Users.CustomerId, userId))
        .returning()
        .execute();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user points:", error);
      return null;
    }
  }