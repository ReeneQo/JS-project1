const editModal = document.getElementById("editModal");
const editImageInput = document.getElementById("edit-image");
const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-description");
const closeModalBtn = document.querySelector(".close");

let currentEditingCard = null;

function openEditModal(card) {
  currentEditingCard = card;
  editImageInput.value = card.image;
  editTitleInput.value = card.title;
  editDescInput.value = card.description;

  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  editModal.style.display = "block";
}

closeModalBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

editModal.addEventListener("click", (event) => {
  if (event.currentTarget === event.target) {
    editModal.style.display = "none";
  }
});

export {
  openEditModal,
  editImageInput,
  editDescInput,
  editTitleInput,
  currentEditingCard,
};
