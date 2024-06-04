let activeBrothId = null;
let activeProteinId = null;

function setDesktopActiveBrothId(activeId) {
    activeBrothId = activeId;
}

export function getDesktopActiveBrothId() {
    return activeBrothId;
}

function setDesktopActiveProteinId(activeId) {
    activeProteinId = activeId;
}

export function getDesktopActiveProteinId() {
    return activeProteinId;
}


function updateCardBrothImages(cards) {
    let activeCardExists = false;

    cards.forEach((card) => {
        if (card.classList.contains('active')) {
            activeCardExists = true;
        }
    });

    cards.forEach((card) => {
        const imgElement = card.querySelector('.card-img');
        if (activeCardExists) {
            if (card.classList.contains('active')) {
                imgElement.src = card.dataset.imageActive;
            } else {
                imgElement.src = card.dataset.imageInactive;
            }
        } else {
            imgElement.src = card.dataset.imageInactive;
        }
    });
}

function updateCardProteinImages(proteinCards) {
    let activeCardExists = false;

    proteinCards.forEach((proteinCard) => {
        if (proteinCard.classList.contains('active')) {
            activeCardExists = true;
        }
    });

    proteinCards.forEach((proteinCard) => {
        const imgElement = proteinCard.querySelector('.protein-card-img');
        if (activeCardExists) {
            if (proteinCard.classList.contains('active')) {
                imgElement.src = proteinCard.dataset.imageActive;
            } else {
                imgElement.src = proteinCard.dataset.imageInactive;
            }
        } else {
            imgElement.src = proteinCard.dataset.imageInactive;
        }
    });
}

export function updateBrothCards(data) {
    const cards = document.querySelectorAll('.broth-card'); // Corrigido o seletor aqui

    data.forEach(function (broth, index) {
        const card = cards[index];
        const imgElement = card.querySelector('.card-img');
        
        imgElement.src = broth.imageInactive;
        card.querySelector('h3').textContent = broth.name;
        card.querySelector('#broth-description').textContent = broth.description;
        card.querySelector('#broth-price').textContent = 'US$ ' + broth.Price;

        card.dataset.imageActive = broth.imageActive;
        card.dataset.imageInactive = broth.imageInactive;

        card.addEventListener('click', function () {
            const isActive = card.classList.contains('active');

            cards.forEach(s => s.classList.remove('active'));

            if (!isActive) {
                card.classList.add('active');
                setDesktopActiveBrothId(card.id);
            } else {
                activeBrothId = null;
            }

            updateCardBrothImages(cards);
        });
    });
}

export function updateProteinCards(data) {
    const proteinCards = document.querySelectorAll('.protein-card');

    data.forEach(function (protein, index) {
        const proteinCard = proteinCards[index];
        const imgElement = proteinCard.querySelector('.protein-card-img');
        
        imgElement.src = protein.imageInactive;
        proteinCard.querySelector('h3').textContent = protein.name;
        proteinCard.querySelector('#protein-description').textContent = protein.description;
        proteinCard.querySelector('#protein-price').textContent = 'US$ ' + protein.price;

        proteinCard.dataset.imageActive = protein.imageActive;
        proteinCard.dataset.imageInactive = protein.imageInactive;

        proteinCard.addEventListener('click', function () {
            const isActive = proteinCard.classList.contains('active');

            proteinCards.forEach(s => s.classList.remove('active'));

            if (!isActive) {
                proteinCard.classList.add('active');
                setDesktopActiveProteinId(proteinCard.id);
            } else {
                activeProteinId = null;
            }

            updateCardProteinImages(proteinCards);
        });
    });
}
