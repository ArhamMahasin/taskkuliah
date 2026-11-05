import "./documentation.css";

export function initDocumentation(): void {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  const mainContent = document.querySelector(".main-content");

  if (!sidebarMenu || !mainContent) return;

  const menuLink = document.createElement("a");
  menuLink.href = "#documentation";
  menuLink.className = "menu-item";
  menuLink.id = "documentation-menu";
  menuLink.innerHTML = "<span>▤</span> Dokumentasi Teknologi";
  sidebarMenu.appendChild(menuLink);

  const documentation = document.createElement("section");
  documentation.id = "documentation";
  documentation.className = "documentation-page hidden";

  documentation.innerHTML = `
    <div class="documentation-heading">
      <p class="welcome-label">PANDUAN PENGEMBANGAN</p>
      <h2>Dokumentasi Teknologi TaskKuliah</h2>
      <p>
        Penjelasan teknologi dan tools yang digunakan dalam proses
        pengembangan aplikasi TaskKuliah.
      </p>
    </div>

    <div class="documentation-grid">

      <article class="documentation-card">
        <span class="documentation-number">01</span>
        <h3>Git dan GitHub</h3>
        <p>
          Git adalah sistem version control yang digunakan untuk
          mencatat perubahan kode program. Git membantu pengembang
          melacak riwayat perubahan, membuat branch, melakukan merge,
          serta menyelesaikan konflik.
        </p>
        <p>
          GitHub merupakan layanan penyimpanan repository berbasis
          cloud yang memungkinkan pengembang bekerja sama dan
          mengelola source code secara online.
        </p>
        <ul>
          <li><code>git init</code> — membuat repository lokal.</li>
          <li><code>git add</code> — menyiapkan perubahan.</li>
          <li><code>git commit</code> — menyimpan riwayat perubahan.</li>
          <li><code>git branch</code> — membuat atau melihat branch.</li>
          <li><code>git merge</code> — menggabungkan branch.</li>
          <li><code>git push</code> — mengirim perubahan ke GitHub.</li>
          <li><code>git pull</code> — mengambil perubahan terbaru.</li>
        </ul>
      </article>

      <article class="documentation-card">
        <span class="documentation-number">02</span>
        <h3>npm dan package.json</h3>
        <p>
          npm (Node Package Manager) adalah pengelola paket
          JavaScript yang digunakan untuk memasang dan mengelola
          dependency dalam proyek.
        </p>
        <p>
          File package.json menyimpan informasi proyek, daftar
          dependency, devDependencies, serta scripts untuk
          menjalankan perintah.
        </p>
        <ul>
          <li><code>npm install</code> — memasang dependency.</li>
          <li><code>npm run dev</code> — menjalankan server pengembangan.</li>
          <li><code>npm run build</code> — membuat hasil build produksi.</li>
          <li><code>npm run preview</code> — melihat hasil build.</li>
        </ul>
        <p>
          Dependencies digunakan oleh aplikasi saat berjalan,
          sedangkan devDependencies digunakan untuk kebutuhan
          pengembangan dan proses build.
        </p>
      </article>

      <article class="documentation-card">
        <span class="documentation-number">03</span>
        <h3>TypeScript</h3>
        <p>
          TypeScript adalah bahasa pemrograman berbasis JavaScript
          yang menambahkan sistem tipe statis. Sistem tipe membantu
          mendeteksi kesalahan kode sebelum aplikasi dijalankan.
        </p>
        <p>Contoh penerapan tipe data dalam TaskKuliah:</p>
        <pre><code>let taskName: string = "Tugas Web";
let deadline: number = 15;
let isCompleted: boolean = false;

type TaskStatus =
  | "Belum Selesai"
  | "Selesai";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

function getData&lt;T&gt;(data: T): T {
  return data;
}</code></pre>
        <p>
          Contoh tersebut menggunakan tipe primitive, union type,
          interface, dan generic.
        </p>
      </article>

      <article class="documentation-card">
        <span class="documentation-number">04</span>
        <h3>Vite</h3>
        <p>
          Vite adalah build tool untuk pengembangan aplikasi web
          modern. Vite menyediakan server pengembangan yang cepat
          dan proses build untuk menghasilkan file produksi.
        </p>
        <p>
          Dalam TaskKuliah, Vite digunakan untuk menjalankan
          aplikasi selama proses pengembangan serta mengubah
          source code menjadi file siap deploy.
        </p>
        <ul>
          <li>Development server.</li>
          <li>Hot Module Replacement (HMR).</li>
          <li>Build aplikasi untuk produksi.</li>
          <li>Optimasi asset aplikasi.</li>
        </ul>
      </article>

      <article class="documentation-card">
        <span class="documentation-number">05</span>
        <h3>Environment Variables</h3>
        <p>
          Environment variables adalah variabel konfigurasi
          yang disimpan di luar source code agar nilai konfigurasi
          lebih mudah dikelola.
        </p>
        <p>Contoh file .env:</p>
        <pre><code>VITE_APP_NAME=TaskKuliah
VITE_APP_VERSION=1.0.0</code></pre>
        <p>
          File .env.example digunakan sebagai contoh konfigurasi
          bagi pengembang lain. File .env dimasukkan ke .gitignore
          agar tidak ikut dikirim ke repository.
        </p>
        <p>
          Pada Vite, variabel yang diawali VITE_ dapat diakses
          melalui import.meta.env. Nilainya akan tersedia di
          sisi browser, sehingga tidak boleh digunakan untuk
          menyimpan password atau API key rahasia.
        </p>
      </article>

      <article class="documentation-card">
        <span class="documentation-number">06</span>
        <h3>Compiler, Transpiler, dan Bundler</h3>

        <h4>Compiler</h4>
        <p>
          Compiler memeriksa dan memproses kode sumber.
          Dalam proyek ini, TypeScript Compiler (tsc) digunakan
          untuk memeriksa tipe data dan mendeteksi kesalahan
          TypeScript. Karena noEmit diaktifkan, tsc tidak
          menghasilkan file JavaScript secara langsung.
        </p>

        <h4>Transpiler</h4>
        <p>
          Transpiler mengubah kode dari satu bahasa atau
          versi bahasa ke bahasa atau versi lain yang setara.
          Dalam proses build Vite 8, Oxc digunakan untuk
          melakukan transformasi kode TypeScript dan JavaScript.
        </p>

        <h4>Bundler</h4>
        <p>
          Bundler menggabungkan berbagai modul dan asset
          aplikasi menjadi file yang siap digunakan.
          Vite versi 8 menggunakan Rolldown sebagai bundler
          untuk menggabungkan dan mengoptimalkan hasil build
          produksi.
        </p>
      </article>

    </div>

    <div class="documentation-footer">
      <h3>TaskKuliah</h3>
      <p>
        Aplikasi manajemen tugas mahasiswa yang dikembangkan
        menggunakan TypeScript dan Vite.
      </p>
      <p>© ${new Date().getFullYear()} TaskKuliah</p>
    </div>
  `;

  const footer = mainContent.querySelector(".footer");

  if (footer) {
    mainContent.insertBefore(documentation, footer);
  } else {
    mainContent.appendChild(documentation);
  }

  const dashboardElements = [
    ".topbar",
    ".welcome-section",
    ".statistics",
    ".task-workspace",
    ".footer",
  ];

  const dashboardMenu = sidebarMenu.querySelector(".menu-item.active");

  function showDashboard(): void {
    dashboardElements.forEach((selector) => {
      document.querySelector(selector)?.classList.remove("hidden");
    });

    documentation.classList.add("hidden");
    menuLink.classList.remove("active");
    dashboardMenu?.classList.add("active");
  }

  function showDocumentation(): void {
    dashboardElements.forEach((selector) => {
      document.querySelector(selector)?.classList.add("hidden");
    });

    documentation.classList.remove("hidden");
    dashboardMenu?.classList.remove("active");
    menuLink.classList.add("active");
    documentation.scrollIntoView({ behavior: "smooth" });
  }

  menuLink.addEventListener("click", (event) => {
    event.preventDefault();
    showDocumentation();
  });

  dashboardMenu?.addEventListener("click", (event) => {
    event.preventDefault();
    showDashboard();
  });
}
