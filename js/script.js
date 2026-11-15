// 1. DARK MODE & LIGHT MODE
const tombolTema = document.getElementById("tombol_tema");

if (localStorage.getItem("tema_umkm") === "dark") {
    document.body.classList.add("dark_mode");
    tombolTema.textContent = "🌕";
} else {
    tombolTema.textContent = "☀️";
}

tombolTema.addEventListener("click", function () {
    document.body.classList.toggle("dark_mode");
    
    if (document.body.classList.contains("dark_mode")) {
        tombolTema.textContent = "🌕";
        localStorage.setItem("tema_umkm", "dark");
    } else {
        tombolTema.textContent = "☀️";
        localStorage.setItem("tema_umkm", "light");
    }
});


// 2. MENU NAVIGASI RESPONSIF
const tombolHamburger = document.getElementById("tombol_hamburger");
const menuNavigasi = document.getElementById("menu_navigasi");

tombolHamburger.addEventListener("click", function () {
    menuNavigasi.classList.toggle("aktif");
});

// 3. FITUR PENCARIAN & FILTER KATEGORI PRODUK
const inputCari = document.getElementById("input_cari");
const tombolKategori = document.querySelectorAll(".tombol_kategori");
const daftarProduk = document.querySelectorAll(".kartu_produk");
const pesanKosong = document.getElementById("pesan_kosong");

let kategoriAktif = "semua";

function filterKatalog() {
    const kataKunci = inputCari.value.toLowerCase();
    let jumlahTampil = 0;

    daftarProduk.forEach(function (kartu) {
        const namaProduk = kartu.getAttribute("data-nama").toLowerCase();
        const kategoriProduk = kartu.getAttribute("data-kategori");

        const cocokNama = namaProduk.includes(kataKunci);
        const cocokKategori = (kategoriAktif === "semua" || kategoriProduk === kategoriAktif);

        if (cocokNama && cocokKategori) {
            kartu.style.display = "flex";
            jumlahTampil++;
        } else {
            kartu.style.display = "none";
        }
    });

    pesanKosong.style.display = jumlahTampil === 0 ? "block" : "none";
}


inputCari.addEventListener("keyup", filterKatalog);

tombolKategori.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        tombolKategori.forEach(btn => btn.classList.remove("aktif"));
        this.classList.add("aktif");
        kategoriAktif = this.getAttribute("data-kategori");
        filterKatalog();
    });
});

// 4. KERANJANG BELANJA SIMULASI 
let keranjang = [];
const tombolBeliSemua = document.querySelectorAll(".tombol_beli");
const badgeKeranjang = document.getElementById("jumlah_keranjang");
const modalKeranjang = document.getElementById("modal_keranjang");
const tombolBukaKeranjang = document.getElementById("tombol_keranjang");
const tombolTutupKeranjang = document.getElementById("tutup_modal_keranjang");
const listItemKeranjang = document.getElementById("daftar_item_keranjang");
const totalHargaEl = document.getElementById("total_harga_keranjang");
const tombolCheckout = document.getElementById("tombol_checkout");

tombolBeliSemua.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        const kartu = this.closest(".kartu_produk");
        const nama = kartu.getAttribute("data-nama");
        const harga = parseInt(kartu.getAttribute("data-harga"));

        keranjang.push({ nama: nama, harga: harga });
        badgeKeranjang.textContent = keranjang.length;
        alert(nama + " berhasil ditambahkan ke keranjang!");
    });
});

function renderKeranjang() {
    listItemKeranjang.innerHTML = "";
    let total = 0;

    if (keranjang.length === 0) {
        listItemKeranjang.innerHTML = "<li>Keranjang masih kosong.</li>";
    } else {
        keranjang.forEach(function (item, index) {
            total += item.harga;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nama}</span>
                <span>Rp ${item.harga.toLocaleString("id-ID")} 
                <button onclick="hapusItem(${index})" style="color:red; border:none; background:none; cursor:pointer; font-weight:bold;">[x]</button></span>
            `;
            listItemKeranjang.appendChild(li);
        });
    }

    totalHargaEl.textContent = "Rp " + total.toLocaleString("id-ID");
}

window.hapusItem = function(index) {
    keranjang.splice(index, 1);
    badgeKeranjang.textContent = keranjang.length;
    renderKeranjang();
};

tombolBukaKeranjang.addEventListener("click", function () {
    renderKeranjang();
    modalKeranjang.style.display = "flex";
});

tombolTutupKeranjang.addEventListener("click", function () {
    modalKeranjang.style.display = "none";
});

tombolCheckout.addEventListener("click", function () {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong, pilih produk terlebih dahulu!");
    } else {
        alert("Terima kasih! Simulasi pesanan Anda telah diterima oleh admin UMKM.");
        keranjang = [];
        badgeKeranjang.textContent = "0";
        modalKeranjang.style.display = "none";
    }
});

// 5. GALERI FOTO INTERAKTIF 
const fotoGaleri = document.querySelectorAll(".foto_galeri");
const modalGaleri = document.getElementById("modal_galeri");
const gambarModalBesar = document.getElementById("gambar_modal_besar");
const keteranganModal = document.getElementById("keterangan_modal_gambar");
const tutupModalGaleri = document.getElementById("tutup_modal_galeri");

fotoGaleri.forEach(function (foto) {
    foto.addEventListener("click", function () {
        modalGaleri.style.display = "flex";
        gambarModalBesar.src = this.src;
        keteranganModal.textContent = this.alt;
    });
});

tutupModalGaleri.addEventListener("click", function () {
    modalGaleri.style.display = "none";
});

// 6. FAQ ACCORDION
const pertanyaanFaq = document.querySelectorAll(".pertanyaan_faq");

pertanyaanFaq.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        const item = this.parentElement;
        item.classList.toggle("terbuka");
        
        const ikon = this.querySelector("span");
        ikon.textContent = item.classList.contains("terbuka") ? "-" : "+";
    });
});


// 7. VALIDASI FORMULIR KONTAK
const formKontak = document.getElementById("form_kontak");

formKontak.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah reload halaman

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (nama === "" || email === "" || pesan === "") {
        alert("Peringatan: Semua kolom wajib diisi sebelum mengirim pesan!");
    } else if (!email.includes("@")) {
        alert("Peringatan: Format email tidak valid!");
    } else {
        alert("Terima kasih " + nama + "! Pesan Anda berhasil divalidasi.");
        formKontak.reset();
    }
});

// 8. TOMBOL KEMBALI KE ATAS & SAPAAN WAKTU
const tombolAtas = document.getElementById("tombol_atas");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        tombolAtas.style.display = "block";
    } else {
        tombolAtas.style.display = "none";
    }
});

tombolAtas.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Sapaan berdasarkan jam pengunjung
const sapaanEl = document.getElementById("sapaan_waktu");
const jamSekarang = new Date().getHours();
if (jamSekarang < 11) {
    sapaanEl.textContent = "Selamat Pagi! Yuk Cari Camilan Khas Klaten";
} else if (jamSekarang < 15) {
    sapaanEl.textContent = "Selamat Siang! Nikmati Oleh-Oleh Lokal Klaten";
} else if (jamSekarang < 18) {
    sapaanEl.textContent = "Selamat Sore! Waktunya Ngemil Produk UMKM";
} else {
    sapaanEl.textContent = "Selamat Malam! Pesan Oleh-Oleh Klaten Kapan Saja";
}