import { Elysia } from "elysia";

const mahasiswa = [
    {
        id: 1,
        nama: "Ahmad",
        email: "ahmad@example.com",
        jurusan: "Teknik Informatika"
    },
    {
        id: 2,
        nama: "Anisa",
        email: "anisa@example.com",
        jurusan: "Manajemen Informatika"
    },
    {
        id: 3,
        nama: "Andika",
        email: "andika@example.com",
        jurusan: "Teknik Informatika"
    }
];

export const mahasiswaRoute = new Elysia({
    prefix: "/mahasiswa"
});

mahasiswaRoute.get("/:id", ({ params }) => {
    const mahasiswaId = params.id;
    const data = mahasiswa.find(m => m.id === parseInt(mahasiswaId));
    if (data) {
        return data;
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

mahasiswaRoute.post("/", ({ params, body }) => {
    if (body) {
        return body;
    } else {
        return { error: "Tidak ada data yang masuk" };
    }
});

// PUT - mengganti seluruh data mahasiswa (semua field harus dikirim)
mahasiswaRoute.put("/:id", ({ params, body }) => {
    const index = mahasiswa.findIndex(m => m.id === parseInt(params.id));
    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }
    const data = body as { nama: string; email: string; jurusan: string };
    mahasiswa[index] = { id: mahasiswa[index].id, ...data };
    return { message: "Data berhasil diganti", data: mahasiswa[index] };
});

// PATCH - mengubah sebagian data saja (field yang dikirim saja)
mahasiswaRoute.patch("/:id", ({ params, body }) => {
    const index = mahasiswa.findIndex(m => m.id === parseInt(params.id));
    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }
    mahasiswa[index] = { ...mahasiswa[index], ...(body as object), id: mahasiswa[index].id };
    return { message: "Data berhasil diubah sebagian", data: mahasiswa[index] };
});

// DELETE - menghapus mahasiswa
mahasiswaRoute.delete("/:id", ({ params }) => {
    const index = mahasiswa.findIndex(m => m.id === parseInt(params.id));
    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }
    const [dihapus] = mahasiswa.splice(index, 1);
    return { message: "Data berhasil dihapus", data: dihapus };
});