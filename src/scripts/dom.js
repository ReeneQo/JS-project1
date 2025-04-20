import { cardsData } from "./data.js";
import { openEditModal } from "./modal";

const ul = document.getElementById("card_ul");
const template = document.getElementById("template").content;
const addCardButton = document.getElementById("add-card-button");
const deleteBut = document.querySelector(".deleteBut");
const imageInput = document.getElementById("image-input");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("text-input");

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

addCardButton.addEventListener("click", () => {
  const newCard = {
    image: imageInput.value.trim(),
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
  };

  let isValid = true;

  const urlPattern =
    /^(http(s?):\/\/)?[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
  if (!urlPattern.test(newCard.image)) {
    document.getElementById("imageInput-error").style.display = "block";
    isValid = false;
  }

  const titlePattern = /^[\p{L}\d\s.,!?-]+$/u;
  if (!titlePattern.test(newCard.title) || newCard.title.length < 3) {
    document.getElementById("titleInput-error").style.display = "block";
    isValid = false;
  }

  if (newCard.description.length < 10 || newCard.description.length > 500) {
    document.getElementById("descInput-error").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    const errors = [
      document.getElementById("imageInput-error"),
      document.getElementById("titleInput-error"),
      document.getElementById("descInput-error"),
    ];
    errors.forEach((er) => (er.style.display = "none"));

    cardsData.push(newCard);

    cardsData.sort((a, b) => a.title.localeCompare(b.title));

    RenderCards(cardsData);

    imageInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";
  }
});

deleteBut.addEventListener("click", () => {
  ul.innerHTML = "";
});

export { ul, addCardButton, deleteBut, RenderCards };
