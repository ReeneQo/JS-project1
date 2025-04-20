import { cardsData } from "./cards";

const ul = document.getElementById("card_ul");
const template = document.getElementById("template").content;
const imageInput = document.getElementById("image-input");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("text-input");
const addCardButton = document.getElementById("add-card-button");
const deleteBut = document.querySelector(".deleteBut");
const editModal = document.getElementById("editModal");
const editImageInput = document.getElementById("edit-image");
const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-description");
const closeModalBtn = document.querySelector(".close");

let currentEditingCard = null;

function openEditModal(card) {
  currentEditingCard = card
  editImageInput.value = card.image
  editTitleInput.value = card.title
  editDescInput.value = card.description

  document.querySelectorAll('.error-message').forEach(el => el.textContent = '')

  editModal.style.display = 'block';
}

closeModalBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

editModal.addEventListener("click", (event) => {
  if (event.currentTarget === event.target) {
    editModal.style.display = "none";
  }
});

function createCard(card) {
  const clone = template.cloneNode(true);
  clone.querySelector(".card-image").src = card.image;
  clone.querySelector(".card-title").textContent = card.title;
  clone.querySelector(".card-description").textContent = card.description;

  const deleteButton = clone.querySelector(".delete-button");
  deleteButton.addEventListener("click", (event) => {
    const cardToRemove = event.target.closest(".card");
    ul.removeChild(cardToRemove);
  });

  const heartSvg = clone.querySelector(".like-svg");
  heartSvg.addEventListener("click", () => {
    const path = heartSvg.querySelector("path");
    if (path.getAttribute("fill") === "gray") {
      path.setAttribute("fill", "red");
    } else {
      path.setAttribute("fill", "gray");
    }
  });

  const editBtn = clone.querySelector(".edit-button");
  editBtn.addEventListener("click", (e) => {
    openEditModal(card);
  });

  ul.appendChild(clone);
}

function RenderCards(cardsData) {
  ul.innerHTML = "";
  cardsData.forEach((card) => createCard(card));
}

export {
  ul,
  imageInput,
  titleInput,
  descriptionInput,
  addCardButton,
  deleteBut,
  RenderCards,
  openEditModal,
  editTitleInput,
  editDescInput,
  editImageInput,
  currentEditingCard
};
