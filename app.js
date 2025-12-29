let notes = [];

function openNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const textInput = document.getElementById("noteText");

  dialog.showModal();
  titleInput.focus();
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

  notes.unshift({
    id: generateId,
    title: title,
    text: text,
  });

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
    <div class="note-card">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-text">${note.text}</p>
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

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");
  return saveNotes ? JSON.parse(savedNotes) : [];
}

document.addEventListener("DOMContentLoaded", function () {
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
