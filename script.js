
const cards = document.querySelectorAll('.card');
const cardDeck = document.querySelector('.card-deck');
const returnButton = document.querySelector('.return-button');
const shuffleButton = document.querySelector('.shuffle-button');
let flipped = false;

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!flipped) {
            card.classList.add('centered-card');
            returnButton.style.display = 'block';
            card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
            card.querySelector('.back img').style.display = 'block'; // Show the image
            flipped = true;
        } else {
            card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
            flipped = false;
        }
    });
});

returnButton.addEventListener('click', () => {
    cards.forEach(card => {
        card.classList.remove('centered-card');
        card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
        card.querySelector('.back img').style.display = 'none'; // Hide the image
        returnButton.style.display = 'none';
        flipped = false;
    });
});

shuffleButton.addEventListener('click', () => {
    shuffleCards();
});

function shuffleCards() {
    shuffleButton.disabled = true; // Disable the button during shuffle
    const cardArray = Array.from(cards);
    cardArray.forEach(card => {
        // card.style.transition = "transform 0.5s ease-in-out";
        // card.style.transform = "rotateY(0deg)";
    });

    setTimeout(() => {
        // Shuffle the cards using Fisher-Yates algorithm
        for (let i = cardArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
        }

        cardArray.forEach((card, index) => {
            setTimeout(() => {
                cardDeck.appendChild(card);
            }, index * 1); // Delay each card's placement for a smoother animation
        });

        setTimeout(() => {
            shuffleButton.disabled = false; // Re-enable the button after shuffle
        }, cardArray.length * 1);
    }, 500); // Wait for the cards to flip back before shuffling
}
