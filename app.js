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

document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("noteDialog");

  dialog.addEventListener("click", function (event) {
    if (event.target === this) {
      closeNoteDialog();
    }
  });
});
