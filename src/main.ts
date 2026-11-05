import "./style.css";
import { initDocumentation } from "./documentation";

import { APP_CONFIG } from "./config";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "./tasks";

import type { Task, TaskPriority, TaskStatus } from "./types";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Elemen #app tidak ditemukan.");
}

let tasks: Task[] = getTasks();
let editingId: number | null = null;
let searchQuery = "";
let activeFilter = "Semua";

const escapeHTML = (value: string): string => {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
};

const formatDate = (date: string): string => {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function renderLayout(): void {
  app!.innerHTML = `
    <div class="app-container">

      <aside class="sidebar">
        <div class="brand">
          <div class="brand-icon">T</div>
          <div>
            <h2>TaskKuliah</h2>
            <span>Student Workspace</span>
          </div>
        </div>

        <div class="sidebar-menu">
          <p class="menu-label">MENU UTAMA</p>

          <a href="#" class="menu-item active">
            <span>▦</span> Dashboard
          </a>

          <a href="#task-section" class="menu-item">
            <span>☷</span> Semua Tugas
          </a>

          <a href="#task-section" class="menu-item">
            <span>✓</span> Tugas Selesai
          </a>
        </div>

        <div class="sidebar-bottom">
          <div class="profile-avatar">AM</div>
          <div class="profile-info">
            <strong>Arham Mahasin</strong>
            <span>Student Account</span>
          </div>
        </div>
      </aside>

      <main class="main-content">

        <header class="topbar">
          <div>
            <p class="breadcrumb">Workspace / Dashboard</p>
            <h1>Dashboard</h1>
          </div>

          <div class="topbar-right">
            <span class="today-date" id="today-date"></span>
            <div class="topbar-avatar">AM</div>
          </div>
        </header>

        <section class="welcome-section">
          <div>
            <p class="welcome-label">SELAMAT DATANG 👋</p>
            <h2>Kelola tugas kuliahmu dengan lebih mudah.</h2>
            <p>Atur jadwal, pantau progres, dan selesaikan tugas tepat waktu.</p>
          </div>

          <div class="welcome-decoration">ham</div>
        </section>

        <section class="statistics">
          <div class="stat-card">
            <div class="stat-icon blue">▤</div>
            <p>Total Tugas</p>
            <h2 id="total-tasks">0</h2>
            <span>Seluruh tugas kuliah</span>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">✓</div>
            <p>Tugas Selesai</p>
            <h2 id="completed-tasks">0</h2>
            <span>Tugas yang telah selesai</span>
          </div>

          <div class="stat-card">
            <div class="stat-icon orange">◷</div>
            <p>Belum Selesai</p>
            <h2 id="pending-tasks">0</h2>
            <span>Tugas yang perlu dikerjakan</span>
          </div>
        </section>

        <section class="task-workspace" id="task-section">

          <div class="section-heading">
            <div>
              <h2>Daftar Tugas</h2>
              <p>Kelola semua tugas perkuliahanmu di sini.</p>
            </div>

            <button class="primary-button" id="show-form">
              + Tambah Tugas
            </button>
          </div>

          <section class="form-panel hidden" id="form-panel">
            <div class="form-heading">
              <div>
                <h3 id="form-title">Tambah Tugas Baru</h3>
                <p>Lengkapi informasi tugas kuliahmu.</p>
              </div>

              <button class="close-button" id="close-form" type="button">✕</button>
            </div>

            <form id="task-form">

              <div class="form-grid">

                <div class="form-group full-width">
                  <label for="task-title">Nama Tugas *</label>
                  <input
                    type="text"
                    id="task-title"
                    placeholder="Contoh: Membuat laporan praktikum"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="task-subject">Mata Kuliah *</label>
                  <input
                    type="text"
                    id="task-subject"
                    placeholder="Contoh: Pemrograman Web"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="task-deadline">Deadline *</label>
                  <input type="date" id="task-deadline" required />
                </div>

                <div class="form-group">
                  <label for="task-priority">Prioritas</label>
                  <select id="task-priority">
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang" selected>Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="task-description">Deskripsi</label>
                  <textarea
                    id="task-description"
                    placeholder="Tambahkan detail tugas..."
                    rows="3"
                  ></textarea>
                </div>

              </div>

              <div class="form-actions">
                <button type="button" class="secondary-button" id="cancel-form">
                  Batal
                </button>

                <button type="submit" class="primary-button" id="save-button">
                  Simpan Tugas
                </button>
              </div>

            </form>
          </section>

          <div class="task-toolbar">

            <div class="search-box">
              <span>⌕</span>
              <input
                type="text"
                id="search-task"
                placeholder="Cari nama tugas atau mata kuliah..."
              />
            </div>

            <select id="filter-status" class="filter-select">
              <option value="Semua">Semua Status</option>
              <option value="Belum Selesai">Belum Selesai</option>
              <option value="Selesai">Selesai</option>
            </select>

          </div>

          <div class="task-list" id="task-list"></div>

        </section>

        <footer class="footer">
          <p>© ${new Date().getFullYear()} ${escapeHTML(APP_CONFIG.name)}. All rights reserved.</p>
          <span>Version ${escapeHTML(APP_CONFIG.version)}</span>
        </footer>

      </main>
    </div>
  `;

  const today = document.querySelector("#today-date");

  if (today) {
    today.textContent = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  setupEvents();
  renderTasks();
}

function renderTasks(): void {
  tasks = getTasks();

  const completed = tasks.filter((task) => task.status === "Selesai").length;

  const pending = tasks.length - completed;

  document.querySelector("#total-tasks")!.textContent = String(tasks.length);

  document.querySelector("#completed-tasks")!.textContent = String(completed);

  document.querySelector("#pending-tasks")!.textContent = String(pending);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery) ||
      task.subject.toLowerCase().includes(searchQuery);

    const matchesStatus =
      activeFilter === "Semua" || task.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  const taskList = document.querySelector<HTMLDivElement>("#task-list")!;

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">☷</div>
        <h3>${tasks.length === 0 ? "Belum Ada Tugas" : "Tugas Tidak Ditemukan"}</h3>
        <p>
          ${
            tasks.length === 0
              ? "Tambahkan tugas kuliah pertamamu untuk mulai mengatur aktivitas."
              : "Coba gunakan kata kunci atau filter yang berbeda."
          }
        </p>
      </div>
    `;

    return;
  }

  taskList.innerHTML = filteredTasks
    .map((task) => {
      const isCompleted = task.status === "Selesai";

      const priorityClass = task.priority.toLowerCase();

      return `
        <article class="task-card ${isCompleted ? "completed" : ""}">

          <div class="task-main">

            <div class="task-check ${isCompleted ? "checked" : ""}"
                 data-action="toggle"
                 data-id="${task.id}">
              ${isCompleted ? "✓" : ""}
            </div>

            <div class="task-information">
              <h3>${escapeHTML(task.title)}</h3>
              <p class="task-subject">${escapeHTML(task.subject)}</p>

              ${
                task.description
                  ? `<p class="task-description">${escapeHTML(task.description)}</p>`
                  : ""
              }

              <div class="task-meta">
                <span class="deadline">◷ ${formatDate(task.deadline)}</span>

                <span class="priority ${priorityClass}">
                  ${escapeHTML(task.priority)}
                </span>

                <span class="status ${isCompleted ? "done" : "pending"}">
                  ${escapeHTML(task.status)}
                </span>
              </div>
            </div>

          </div>

          <div class="task-actions">
            <button
              class="action-button edit-button"
              data-action="edit"
              data-id="${task.id}"
              title="Edit tugas"
            >✎</button>

            <button
              class="action-button delete-button"
              data-action="delete"
              data-id="${task.id}"
              title="Hapus tugas"
            >✕</button>
          </div>

        </article>
      `;
    })
    .join("");
}

function openForm(task?: Task): void {
  const panel = document.querySelector("#form-panel")!;
  const form = document.querySelector<HTMLFormElement>("#task-form")!;

  panel.classList.remove("hidden");

  if (task) {
    editingId = task.id;

    document.querySelector("#form-title")!.textContent = "Edit Tugas";

    (document.querySelector("#task-title") as HTMLInputElement).value =
      task.title;

    (document.querySelector("#task-subject") as HTMLInputElement).value =
      task.subject;

    (document.querySelector("#task-deadline") as HTMLInputElement).value =
      task.deadline;

    (document.querySelector("#task-priority") as HTMLSelectElement).value =
      task.priority;

    (document.querySelector("#task-description") as HTMLTextAreaElement).value =
      task.description;

    document.querySelector("#save-button")!.textContent = "Simpan Perubahan";
  } else {
    editingId = null;
    form.reset();

    document.querySelector("#form-title")!.textContent = "Tambah Tugas Baru";

    document.querySelector("#save-button")!.textContent = "Simpan Tugas";
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeForm(): void {
  editingId = null;

  document.querySelector("#form-panel")!.classList.add("hidden");

  document.querySelector<HTMLFormElement>("#task-form")!.reset();
}

function setupEvents(): void {
  document.querySelector("#show-form")!.addEventListener("click", () => {
    openForm();
  });

  document.querySelector("#close-form")!.addEventListener("click", closeForm);
  document.querySelector("#cancel-form")!.addEventListener("click", closeForm);

  document.querySelector("#task-form")!.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = (
      document.querySelector("#task-title") as HTMLInputElement
    ).value.trim();

    const subject = (
      document.querySelector("#task-subject") as HTMLInputElement
    ).value.trim();

    const deadline = (
      document.querySelector("#task-deadline") as HTMLInputElement
    ).value;

    const priority = (
      document.querySelector("#task-priority") as HTMLSelectElement
    ).value as TaskPriority;

    const description = (
      document.querySelector("#task-description") as HTMLTextAreaElement
    ).value.trim();

    if (!title || !subject || !deadline) {
      alert("Mohon lengkapi semua kolom wajib.");
      return;
    }

    if (editingId !== null) {
      updateTask(editingId, {
        title,
        subject,
        deadline,
        priority,
        description,
      });
    } else {
      addTask({
        title,
        subject,
        deadline,
        priority,
        description,
      });
    }

    closeForm();
    renderTasks();
  });

  document.querySelector("#search-task")!.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value.toLowerCase().trim();

    renderTasks();
  });

  document
    .querySelector("#filter-status")!
    .addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      activeFilter = target.value as TaskStatus | "Semua";

      renderTasks();
    });

  document.querySelector("#task-list")!.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const actionElement = target.closest<HTMLElement>("[data-action]");

    if (!actionElement) return;

    const action = actionElement.dataset.action;
    const id = Number(actionElement.dataset.id);

    if (!id) return;

    const selectedTask = getTasks().find((task) => task.id === id);

    if (!selectedTask) return;

    if (action === "toggle") {
      toggleTaskStatus(id);
      renderTasks();
    }

    if (action === "delete") {
      const confirmation = confirm(
        `Apakah kamu yakin ingin menghapus tugas "${selectedTask.title}"?`,
      );

      if (confirmation) {
        deleteTask(id);
        renderTasks();
      }
    }

    if (action === "edit") {
      openForm(selectedTask);
    }
  });
}

renderLayout();
initDocumentation();
