# WoodCraft - Aplikasi E-Commerce Furniture

Aplikasi e-commerce untuk penjualan furniture dengan tampilan modern dan responsif. Dibangun menggunakan React.js untuk frontend dan PHP untuk backend.

## Prasyarat Sistem

Sebelum menginstal aplikasi, pastikan sistem Anda memiliki:

1. **Node.js & npm**
   - Versi Node.js minimal 14.x
   - Download dari [nodejs.org](https://nodejs.org/)

2. **XAMPP**
   - Download XAMPP dari [apachefriends.org](https://www.apachefriends.org/)
   - Minimal versi PHP 7.4

3. **Web Browser**
   - Chrome, Firefox, atau browser modern lainnya

## Instalasi

### 1. Persiapan Database dan Backend
1. Buka XAMPP Control Panel
2. Start Apache dan MySQL
3. Buka phpMyAdmin (http://localhost/phpmyadmin)
4. Buat database baru bernama `woodcraft`
5. Import file `database/woodcraft.sql`

### 2. Setup Backend
1. Pindahkan seluruh folder proyek ke direktori:
   ```
   C:/xampp/htdocs/Techno/
   ```
2. Pastikan struktur folder seperti ini:
   ```
   C:/xampp/htdocs/Techno/
   ├── api/
   ├── database/
   ├── src/
   ├── public/
   └── ...
   ```

### 3. Setup Frontend
1. Buka terminal di folder proyek
2. Install dependensi yang diperlukan:
   ```bash
   npm install
   ```
3. Jalankan aplikasi dalam mode development:
   ```bash
   npm run dev
   ```

## Struktur Aplikasi

```
Techno/
├── api/                    # Backend PHP files
│   └── auth/              # Authentication endpoints
├── database/              # Database files
├── src/                   # Frontend source files
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── assets/           # Static assets
└── public/               # Public assets
```

## Fitur Aplikasi

1. **Autentikasi Pengguna**
   - Register
   - Login
   - Logout
   - Update Profile

2. **Katalog Produk**
   - Lihat semua produk
   - Filter berdasarkan kategori
   - Pencarian produk
   - Detail produk

3. **Keranjang Belanja**
   - Tambah ke keranjang
   - Update jumlah
   - Hapus dari keranjang

4. **Profil Pengguna**
   - Lihat profil
   - Edit profil
   - Ubah password

## Penggunaan Aplikasi

1. **Akses Aplikasi**
   - Buka browser
   - Kunjungi `http://localhost:5173`

2. **Register/Login**
   - Klik tombol "Login" di navbar
   - Pilih "Create Account" untuk register
   - Isi form yang diperlukan

3. **Melihat Produk**
   - Klik menu "Produk"
   - Gunakan filter kategori
   - Gunakan fitur pencarian

4. **Keranjang Belanja**
   - Klik produk untuk melihat detail
   - Klik "Tambah ke Keranjang"
   - Akses keranjang melalui ikon di navbar

## Troubleshooting

1. **Masalah Database**
   - Pastikan service MySQL berjalan
   - Cek kredensial di `database/config.php`
   - Pastikan database `woodcraft` sudah dibuat

2. **Error CORS**
   - Pastikan URL backend sesuai di file konfigurasi
   - Cek header CORS di file PHP

3. **Aplikasi Tidak Berjalan**
   - Cek log error di console browser
   - Pastikan semua dependensi terinstall
   - Cek port 5173 tidak digunakan aplikasi lain

## Kontak

Untuk pertanyaan dan bantuan, silakan hubungi:
- Email: afif83@gmail.com
- Telepon: (021) 1234-5678
- Alamat: Jl. Ambon 2 No 7, Padang, Indonesia 
