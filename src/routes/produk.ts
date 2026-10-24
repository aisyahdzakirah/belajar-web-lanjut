import { Elysia } from "elysia";
import { db } from "../db/index";
import { produkTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const produkRoute = new Elysia({
    prefix: "/produk"
});

// 2. Read - Mendapatkan semua produk
produkRoute.get("/", async () => {
    const data = await db.select().from(produkTable);
    return data;
});

// 2. Read - Mendapatkan produk berdasarkan ID
produkRoute.get("/:id", async ({ params }) => {
    const id = Number(params.id); // Sesuaikan jika tipe ID di schema kamu string/UUID
    const data = await db.select()
        .from(produkTable)
        .where(eq(produkTable.id, id));
    return data;
});

// 1. Create - Menambahkan produk baru
produkRoute.post("/", async ({ body }) => {
    const newProduk = body as typeof produkTable.$inferInsert;
    const result = await db.insert(produkTable).values(newProduk).returning();
    return {
        message: "Produk berhasil ditambahkan",
        data: result
    };
});

// 3. Update - Mengubah data produk berdasarkan ID
produkRoute.put("/:id", async ({ params, body }) => {
    const id = Number(params.id);
    const updatedData = body as Partial<typeof produkTable.$inferInsert>;

    const result = await db.update(produkTable)
        .set(updatedData)
        .where(eq(produkTable.id, id))
        .returning();

    return {
        message: `Produk dengan ID ${id} berhasil diupdate`,
        data: result
    };
});

// 4. Delete - Menghapus produk berdasarkan ID
produkRoute.delete("/:id", async ({ params }) => {
    const id = Number(params.id);
    const result = await db.delete(produkTable)
        .where(eq(produkTable.id, id))
        .returning();

    return {
        message: `Produk dengan ID ${id} berhasil dihapus`,
        data: result
    };
});