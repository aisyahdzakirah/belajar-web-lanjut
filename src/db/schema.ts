import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow()
});

export const produkTable = pgTable("produk", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    namaBarang: varchar({ length: 255}).notNull(),
    stok: integer().default(0),
    harga: integer().notNull(),
    createdAt: timestamp().defaultNow()
})