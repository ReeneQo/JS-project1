import "../styles/main.css";
import { cardsData } from "./data.js";

import {
  editTitleInput,
  editDescInput,
  editImageInput,
  currentEditingCard
} from './modal.js'

import {
  RenderCards,
} from "./dom.js";

const editForm = document.getElementById("editForm");

editForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const editedCard = {
    image: editImageInput.value,
    title: editTitleInput.value,
    description: editDescInput.value
  };

  let isValid = true;

  const urlPattern = /^(http(s?):\/\/)?[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
  if (!urlPattern.test(editedCard.image)) {
    document.getElementById('image-error').textContent = 'Введите корректный URL изображения (например: https://example.com/image.jpg)'
    isValid = false;
  }

  const titlePattern = /^[\p{L}\d\s.,!?-]+$/u;  
  if (!titlePattern.test(editedCard.title) || editedCard.title.length < 3) {
    document.getElementById('title-error').textContent = 'Заголовок должен содержать минимум 3 символа (можно буквы, цифры, пробелы и ,.!?-)'
    isValid = false;
  }

  if (editedCard.description.length < 10 || editedCard.description.length > 500) {
    document.getElementById('desc-error').textContent = 'Описание должно быть от 10 до 500 символов'
    isValid = false;
  }

  if (!isValid) return;

  const index = cardsData.findIndex(card => 
    card.image === currentEditingCard.image &&
    card.title === currentEditingCard.title &&
    card.description === currentEditingCard.description
  );
  
  if (index !== -1) {
    cardsData[index] = editedCard;
    
    cardsData.sort((a, b) => a.title.localeCompare(b.title));
    RenderCards(cardsData);
    
    document.getElementById("editModal").style.display = "none";
  }
})

cardsData.sort((a, b) => a.title.localeCompare(b.title));

RenderCards(cardsData);











