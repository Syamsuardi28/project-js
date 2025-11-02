// ===== DATA INITIAL =====
let dataProduk = [
  { nama: "Laptop ASUS", kategori: "Elektronik", harga: 7500000, stok: 15 },
  { nama: "Mouse Gaming", kategori: "Elektronik", harga: 250000, stok: 50 },
  {
    nama: "Keyboard Mechanical",
    kategori: "Elektronik",
    harga: 850000,
    stok: 30,
  },
  { nama: "Kemeja Formal", kategori: "Fashion", harga: 150000, stok: 100 },
];

let dataPesanan = [
  {
    id: "ORD001",
    pelanggan: "Adlan",
    produk: "Laptop ASUS",
    jumlah: 1,
    total: 7500000,
    status: "Selesai",
  },
  {
    id: "ORD002",
    pelanggan: "Akram",
    produk: "Mouse Gaming",
    jumlah: 2,
    total: 500000,
    status: "Pending",
  },
  {
    id: "ORD003",
    pelanggan: "Setya",
    produk: "Keyboard Mechanical",
    jumlah: 1,
    total: 850000,
    status: "Selesai",
  },
];

let dataPelangganForm = [];

// ===== LOGIN SYSTEM =====
const loginPage = document.getElementById("loginPage");
const appContainer = document.getElementById("appContainer");
const loginForm = document.getElementById("loginForm");
const currentUserSpan = document.getElementById("currentUser");
const sidebarUserSpan = document.getElementById("sidebarUser");
const btnLogout = document.getElementById("btnLogout");

// Pastikan halaman login muncul saat load
window.addEventListener("DOMContentLoaded", () => {
  loginPage.style.display = "flex";
  appContainer.style.display = "none";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    currentUserSpan.textContent = username;
    sidebarUserSpan.textContent = username;
    loginPage.style.display = "none";
    appContainer.style.display = "flex";
    appContainer.classList.add("active");
    alert(`Selamat datang, ${username}!`);
    updateDashboard();
    tampilkanDataProduk();
    tampilkanDataPesanan();
  }
});

btnLogout.addEventListener("click", () => {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    appContainer.classList.remove("active");
    appContainer.style.display = "none";
    loginPage.style.display = "flex";
    loginForm.reset();
  }
});

// ===== SIDEBAR NAVIGATION =====
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const navItems = document.querySelectorAll(".nav-item");
const contentSections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("pageTitle");

const pageTitles = {
  dashboard: "Dashboard",
  products: "Produk",
  orders: "Pesanan",
  customers: "Pelanggan",
  reports: "Laporan",
  settings: "Pengaturan",
};

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.getAttribute("data-section");

    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    contentSections.forEach((section) => section.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");

    pageTitle.textContent = pageTitles[sectionId] || "Dashboard";

    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
    }
  });
});

// ===== WAKTU REAL-TIME =====
function tampilkanWaktu() {
  const now = new Date();
  document.getElementById("waktu").textContent = now.toLocaleString("id-ID");
}
tampilkanWaktu();
setInterval(tampilkanWaktu, 1000);

// ===== UPDATE DASHBOARD =====
function updateDashboard() {
  document.getElementById("totalProduk").textContent = dataProduk.length;
  document.getElementById("totalPesanan").textContent = dataPesanan.length;
  document.getElementById("totalPelanggan").textContent =
    dataPelangganForm.length;

  const totalPendapatan = dataPesanan
    .filter((p) => p.status === "Selesai")
    .reduce((sum, p) => sum + p.total, 0);
  document.getElementById("totalPendapatan").textContent =
    "Rp " + totalPendapatan.toLocaleString("id-ID");
}

// ===== EVENT DAN KOTAK DIALOG =====
document.getElementById("btnAlert").addEventListener("click", () => {
  alert("Ini adalah kotak dialog ALERT! 📢");
});

document.getElementById("btnPrompt").addEventListener("click", () => {
  const nama = prompt("Masukkan nama Anda:");
  if (nama) {
    alert("Halo, " + nama + "! Selamat datang di sistem penjualan. 👋");
  }
});

document.getElementById("btnConfirm").addEventListener("click", () => {
  const konfirmasi = confirm("Apakah Anda ingin melanjutkan?");
  if (konfirmasi) {
    alert("Anda memilih untuk melanjutkan! ✅");
  } else {
    alert("Anda membatalkan tindakan. ❌");
  }
});

// ===== OBJEK STRING =====
document.getElementById("btnUbahString").addEventListener("click", () => {
  let teks = "Sistem Penjualan Toko Online";
  let hasil = teks.toUpperCase() + " | Panjang: " + teks.length + " karakter";
  document.getElementById("stringOutput").textContent = hasil;
});

// ===== PRODUK MANAGEMENT =====
function tampilkanDataProduk() {
  const tbody = document.getElementById("tableProduk");
  tbody.innerHTML = "";

  dataProduk.forEach((produk, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${produk.nama}</td>
            <td>${produk.kategori}</td>
            <td>Rp ${produk.harga.toLocaleString("id-ID")}</td>
            <td>${produk.stok}</td>
            <td><span class="status-badge status-aktif">Aktif</span></td>
            <td>
                <button class="btn btn-warning" onclick="editProduk(${index})" style="padding: 6px 12px;">✏️</button>
                <button class="btn btn-danger" onclick="hapusProduk(${index})" style="padding: 6px 12px;">🗑️</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

document.getElementById("formTambahProduk").addEventListener("submit", (e) => {
  e.preventDefault();

  const produk = {
    nama: document.getElementById("namaProduk").value,
    kategori: document.getElementById("kategoriProduk").value,
    harga: parseInt(document.getElementById("hargaProduk").value),
    stok: parseInt(document.getElementById("stokProduk").value),
  };

  dataProduk.push(produk);
  tampilkanDataProduk();
  updateDashboard();
  document.getElementById("formTambahProduk").reset();
  document.getElementById("modalTambahProduk").style.display = "none";
  alert("Produk berhasil ditambahkan! ✅");
});

function hapusProduk(index) {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    dataProduk.splice(index, 1);
    tampilkanDataProduk();
    updateDashboard();
    alert("Produk berhasil dihapus! ✅");
  }
}

function editProduk(index) {
  alert("Fitur edit akan segera hadir!");
}

// ===== PESANAN MANAGEMENT =====
function tampilkanDataPesanan() {
  const tbody = document.getElementById("tablePesanan");
  tbody.innerHTML = "";

  dataPesanan.forEach((pesanan, index) => {
    const statusClass =
      pesanan.status === "Selesai" ? "status-selesai" : "status-pending";
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${pesanan.id}</td>
            <td>${pesanan.pelanggan}</td>
            <td>${pesanan.produk}</td>
            <td>${pesanan.jumlah}</td>
            <td>Rp ${pesanan.total.toLocaleString("id-ID")}</td>
            <td><span class="status-badge ${statusClass}">${
      pesanan.status
    }</span></td>
            <td>
                <button class="btn btn-primary" onclick="lihatDetail('${
                  pesanan.id
                }')" style="padding: 6px 12px;">👁️</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

function lihatDetail(id) {
  alert("Detail pesanan " + id);
}

// ===== PELANGGAN - ARRAY DAN OBJEK JAVASCRIPT =====
const pelangganArray = [
  { nama: "Syamsuardi", umur: 20 },
  { nama: "Zhaka Hidayat", umur: 20 },
  { nama: "Harahman Abd Arib", umur: 20 },
  { nama: "Ahmad Musawir", umur: 20 },
];

document
  .getElementById("btnTampilkanPelanggan")
  .addEventListener("click", () => {
    const table = document.getElementById("tablePelanggan");
    const tbody = document.getElementById("bodyPelanggan");

    table.style.display = "table";
    tbody.innerHTML = "";

    pelangganArray.forEach((pelanggan, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${pelanggan.nama}</td>
            <td>${pelanggan.umur} tahun</td>
            <td><span class="status-badge status-aktif">Aktif</span></td>
        `;
      tbody.appendChild(tr);
    });
  });

// ===== FORM PELANGGAN =====
const formPelanggan = document.getElementById("formPelanggan");
const bodyFormPelanggan = document.getElementById("bodyFormPelanggan");

formPelanggan.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    nama: document.getElementById("namaPelanggan").value,
    umur: document.getElementById("umurPelanggan").value,
    email: document.getElementById("emailPelanggan").value,
    telepon: document.getElementById("teleponPelanggan").value,
    alamat: document.getElementById("alamatPelanggan").value,
  };

  dataPelangganForm.push(data);
  tampilkanDataFormPelanggan();
  updateDashboard();
  formPelanggan.reset();
  alert("Data pelanggan berhasil disimpan! ✅");
});

function tampilkanDataFormPelanggan() {
  bodyFormPelanggan.innerHTML = "";
  dataPelangganForm.forEach((data, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.nama}</td>
            <td>${data.umur}</td>
            <td>${data.email}</td>
            <td>${data.telepon}</td>
            <td>${data.alamat}</td>
            <td>
                <button class="btn btn-danger" onclick="hapusPelanggan(${index})" style="padding: 6px 12px;">🗑️ Hapus</button>
            </td>
        `;
    bodyFormPelanggan.appendChild(tr);
  });
}

function hapusPelanggan(index) {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    dataPelangganForm.splice(index, 1);
    tampilkanDataFormPelanggan();
    updateDashboard();
    alert("Data berhasil dihapus! ✅");
  }
}

// ===== WINDOW RESIZE =====
window.addEventListener("resize", () => {
  console.log("Ukuran jendela: ", window.innerWidth, "x", window.innerHeight);
});

// ===== SETTIMEOUT DAN SETINTERVAL =====
let intervalID;
let timeoutID;

document.getElementById("btnMulai").addEventListener("click", () => {
  if (intervalID) return;

  intervalID = setInterval(() => {
    const now = new Date();
    document.getElementById("jamBerjalan").textContent =
      now.toLocaleTimeString("id-ID");
  }, 1000);

  timeoutID = setTimeout(() => {
    alert("Timer sudah berjalan selama 5 detik! ⏰");
  }, 5000);
});

document.getElementById("btnHenti").addEventListener("click", () => {
  clearInterval(intervalID);
  clearTimeout(timeoutID);
  intervalID = null;
  document.getElementById("jamBerjalan").textContent = "00:00:00";
  alert("Jam telah dihentikan. ⏸️");
});

// ===== SETTINGS FORM =====
document.getElementById("formSettings").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Pengaturan berhasil disimpan! ✅");
});

// ===== MOBILE SIDEBAR TOGGLE =====
if (window.innerWidth <= 768) {
  sidebarToggle.style.display = "block";
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    sidebarToggle.style.display = "block";
  } else {
    sidebarToggle.style.display = "none";
    sidebar.classList.remove("collapsed");
  }
});
