let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];
let editingNoteId = null;

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const textInput = document.getElementById("noteText");

  if (noteId) {
    // Edit Mode
    console.log("noteId: " + noteId);

    editingNoteId = noteId;
    const noteToEdit = notes.find((note) => note.id === noteId);
    document.getElementById("dialogTitle").textContent = "Edit Note";
    titleInput.value = noteToEdit.title;
    textInput.value = noteToEdit.text;
  } else {
    // Add Mode
    editingNoteId = null;
    document.getElementById("dialogTitle").textContent = "Add New Note";
    clearNoteForm();
  }

  dialog.showModal();
  titleInput.focus();
}

function toggleTheme() {
  const darkTheme = document.body.classList.toggle("dark-theme");
  localStorage.setItem("darkTheme", darkTheme);
  document.getElementById("toggleThemeBtn").textContent = darkTheme
    ? "💡"
    : "🌙";
}

function applyStoredTheme() {
  const darkTheme = localStorage.getItem("darkTheme") === "true";
  document.getElementById("toggleThemeBtn").textContent = darkTheme
    ? "💡"
    : "🌙";
  if (darkTheme) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}
function closeNoteDialog() {
  const dialog = document.getElementById("noteDialog");

  dialog.close();
}

function clearNoteForm() {
  const titleInput = document.getElementById("noteTitle");
  const textInput = document.getElementById("noteText");

  titleInput.value = "";
  textInput.value = "";
}

function saveNote(event) {
  event.preventDefault();
  const titleInput = document.getElementById("noteTitle");
  const textInput = document.getElementById("noteText");

  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  if (editingNoteId) {
    // Editing existing note
    console.log("Editing existing note " + editingNoteId);
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    notes[noteIndex] = { ...notes[noteIndex], title: title, text: text };
  } else {
    // Saving new note
    notes.unshift({
      id: generateId(),
      title: title,
      text: text,
      color: getRandomNoteColor(),
    });
  }

  saveNotes();
  closeNoteDialog();
  clearNoteForm();
  renderNotes();
}

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");

  if (notes.length === 0) {
    notesContainer.innerHTML = `<div class="empty-notes-container"><h2>No notes yet</h2></div>`;
    return;
  }

  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card" style="background-color:${note.color}">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-text">${note.text}</p>
    <div class="note-actions">
    <button class="edit-btn" onclick="openNoteDialog('${note.id}')">Edit</button>
    <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
    </div>
    </div>
    `
    )
    .join("");
}

function generateId() {
  return Date.now().toString();
}

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

function deleteNote(noteId) {
  notes = notes.filter((note) => note.id != noteId);
  saveNotes();
  renderNotes();
}

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function getRandomNoteColor() {
  const noteColors = [
    "#fffb9f", // yellow
    "#ffd6e0", // pink
    "#d0f4de", // green
    "#cdb4db", // purple
    "#bde0fe", // blue
  ];

  return noteColors[Math.floor(Math.random() * noteColors.length)];
}

document.addEventListener("DOMContentLoaded", function () {
  applyStoredTheme()
  notes = loadNotes();
  renderNotes();

  const dialog = document.getElementById("noteDialog");
  const noteForm = document.getElementById("noteForm");

  noteForm.addEventListener("submit", saveNote);

  dialog.addEventListener("click", function (event) {
    if (event.target === this) {
      closeNoteDialog();
    }
  });
});
