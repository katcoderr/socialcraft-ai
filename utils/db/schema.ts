import {integer, varchar, pgTable, serial, text, timestamp, boolean} from 'drizzle-orm/pg-core'

export const Users = pgTable('users',{
    id : serial('id').primaryKey(),
    CustomerId : text('customer_id').unique(),
    email : text('email').notNull().unique(),
    name : text('name'),
    points : integer('points').default(50),
    createdAt : timestamp('created_at').defaultNow()
})



export const GeneratedContent = pgTable('generated_content', {
    id : serial('id').primaryKey(),
    userId : integer('user_id').references(()=> Users.id).notNull(),
    content : text('content').notNull(),
    prompt : text('prompt').notNull(),
    contentType : varchar('content_type', {
        length : 50
    }).notNull(),
    createdAt : timestamp('created_at').defaultNow()    
})