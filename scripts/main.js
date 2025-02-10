const cardsData = [
    {
        image: "./assets/images/molotok.png",
        title: "Молоток",
        description: "Молоток обыкновенный качественный хороший, как у деда"
    },
    {
        image: "./assets/images/sckrewer.png",
        title: "Отвертка",
        description: "Отвертка обыкновенная базовая"
    },
    {
        image: "./assets/images/pilla.png",
        title: "Пила",
        description: "Что бы пилить"
    },
];

const ul = document.getElementById('card_ul');
const template = document.getElementById('template').content;
const imageInput = document.getElementById('image-input');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('text-input');
const addCardButton = document.getElementById('add-card-button');
const deleteBut = document.querySelector('.deleteBut');

function createCard(card) {
        const clone = template.cloneNode(true);
        clone.querySelector('.card-image').src = card.image;
        clone.querySelector('.card-title').textContent = card.title;
        clone.querySelector('.card-description').textContent = card.description;

        const deleteButton = clone.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            const cardToRemove = event.target.closest('.card'); 
            ul.removeChild(cardToRemove); 
        });

        const heartSvg = clone.querySelector('.like-svg');
        heartSvg.addEventListener('click', () => {
        const path = heartSvg.querySelector('path');
        if (path.getAttribute('fill') === 'gray') {
            path.setAttribute('fill', 'red'); 
        } else {
            path.setAttribute('fill', 'gray'); 
        }
    });

        ul.appendChild(clone);
}

function RenderCards () {
    ul.innerHTML = ''
    cardsData.forEach(card => createCard(card))
}

cardsData.sort((a, b) => a.title.localeCompare(b.title))

RenderCards()

addCardButton.addEventListener('click', () => {
    const image = imageInput.value;
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (image && title && description) {
        cardsData.push({image, title, description})

        cardsData.sort((a, b) => a.title.localeCompare(b.title))

        RenderCards()

        imageInput.value = '';
        titleInput.value = '';
        descriptionInput.value = '';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }

});

deleteBut.addEventListener('click', () => {
    ul.innerHTML = ''; 
});

const Inputs = [document.getElementById('title-input'), document.getElementById('text-input')]
Inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.length === 100) {
            alert('Ограничение символов 100')
        }
        console.log('helo')
    })
})

// const inputTitle = document.querySelector('#title-input')
// inputTitle.addEventListener('input', () => {
//     if (inputTitle.value.length === 100) {
//         alert('Ограничение ввода 100 символов')
//     }
// })