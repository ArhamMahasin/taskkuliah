# TaskKuliah - Aplikasi Manajemen Tugas Mahasiswa

TaskKuliah adalah aplikasi web sederhana untuk membantu mahasiswa mengelola tugas kuliah.

## Fitur

- Menambahkan tugas kuliah.
- Mengedit tugas.
- Menghapus tugas.
- Mengubah status tugas.
- Mengatur prioritas tugas.
- Mencari tugas.
- Memfilter tugas berdasarkan status.
- Menyimpan data menggunakan LocalStorage.

## Teknologi

- HTML
- CSS
- TypeScript
- Vite
- npm

## Cara Menjalankan

1. Clone repository.
2. Masuk ke folder proyek.
3. Install dependencies:

   ```bash
   npm install
   ```

## Struktur Proyek

```text
taskkuliah/
├── public/
├── src/
│   ├── assets/
│   ├── config.ts
│   ├── main.ts
│   ├── storage.ts
│   ├── tasks.ts
│   ├── types.ts
│   └── style.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Teknologi yang Digunakan

### 1. Git dan GitHub

Git adalah sistem version control yang digunakan untuk mencatat perubahan kode selama pengembangan aplikasi.

GitHub adalah platform untuk menyimpan repository Git secara online dan mendukung kolaborasi melalui branch dan Pull Request.

### 2. npm

npm (Node Package Manager) digunakan untuk mengelola package dan dependencies dalam proyek JavaScript dan TypeScript.

Perintah npm yang digunakan:

- `npm install`: memasang dependencies.
- `npm run dev`: menjalankan aplikasi.
- `npm run build`: membangun aplikasi untuk production.
- `npm run preview`: melihat hasil build secara lokal.

### 3. TypeScript

TypeScript adalah pengembangan dari JavaScript yang menyediakan sistem tipe statis.

Dalam aplikasi TaskKuliah, TypeScript digunakan untuk:

- Primitive types seperti string dan number.
- Array untuk menyimpan kumpulan data.
- Interface untuk mendefinisikan struktur objek.
- Type alias dan union type untuk membatasi nilai.
- Generics untuk membuat fungsi yang dapat digunakan dengan berbagai tipe data.

### 4. Vite

Vite adalah build tool yang digunakan untuk menjalankan server pengembangan dan membangun aplikasi menjadi file production.

### 5. Compiler, Transpiler, dan Bundler

- Compiler adalah perangkat lunak yang menerjemahkan kode sumber ke bentuk lain.
- Transpiler adalah jenis compiler yang menerjemahkan kode dari satu bahasa atau versi bahasa ke bahasa atau versi lain. TypeScript ditranspilasi menjadi JavaScript.
- Bundler adalah alat yang menggabungkan dan mengoptimalkan berbagai file aplikasi agar siap digunakan di production. Vite menggunakan mekanisme bundling untuk menghasilkan folder `dist`.
