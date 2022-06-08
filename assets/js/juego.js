/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

// TO DO: convert all this to OOP??
let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0;
let computerPoints = 0;

// HTML references
const btnPedir    = document.querySelector('#btnPedir');
const btnStop     = document.querySelector('#btnDetener');
const btnNewGame  = document.querySelector('#btnNuevo');

const divPlayerCards = document.querySelector('#jugador-cartas');
const divComputerCards = document.querySelector('#computadora-cartas');

const pointsHTML = document.querySelectorAll('small');

const createDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(`${i}${type}`);
        }
    }
    
    for (const type of types) {
        for (const spe of specials) {
            deck.push(`${spe}${type}`);
        }
    }

    deck = _.shuffle( deck );

    return deck;
}

createDeck();

/**
 * Allow us to take a card
 */
const getCard = () => {

    if (deck.length === 0) {
        throw 'No cards in the deck';
    }

    const card = deck.shift();

    return card;
}

// getCard();

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return ( isNaN(value) ) ? 
            (value === 'A') ? 11 : 10
            : value * 1; // It's multiplicated by 2, to convert it to a number.

}

// Computer shift
const computerShift = ( minimumPoints ) => {

    do {
        const card = getCard();
        
        computerPoints = computerPoints + cardValue(card);
        pointsHTML[1].innerText = computerPoints;
        
        const newCard = document.createElement('img');
        newCard.classList.add('carta');
        newCard.src = `assets/cartas/${card}.png`;
        divComputerCards.append( newCard );

        if (minimumPoints > 21) break;

    } while( (computerPoints < minimumPoints) && (minimumPoints <= 21) );

    setTimeout(() => {
        // console.log('(playerPoints > computerPoints)')
        // console.log('(playerPoints <= 21)',((playerPoints > computerPoints) && (playerPoints <= 21)))
        // console.log('(computerPoints > 21)', (computerPoints > 21))
        // console.log(((playerPoints > computerPoints) && (playerPoints <= 21))  || (computerPoints > 21))
        if (computerPoints === playerPoints) {
            alert('¡Empate!');
        } else if (((playerPoints > computerPoints) && (playerPoints <= 21))  || (computerPoints > 21)) {
            alert('¡Ganaste!')
        } else if (((playerPoints < computerPoints) && (computerPoints <= 21)) || (playerPoints > 21)) {
            alert('Perdiste!')
        }
    }, 100);
}

// Events
btnPedir.addEventListener('click', () => { // <-- Callback
    const card = getCard();
    
    playerPoints = playerPoints + cardValue(card);
    
    // document.querySelector('#player1').textContent = pointsPlayer;
    // document.querySelector('small').textContent = pointsPlayer; // No es buena practica llamar a los elementos en los metodos, porque
                                                                   // cada vez que se ejecute el metodo se hara de nuevo la referencia

                                                                   
    pointsHTML[0].innerText = playerPoints;
    
    const newCard = document.createElement('img');
    newCard.classList.add('carta');
    newCard.src = `assets/cartas/${card}.png`;
    divPlayerCards.append( newCard );

    if (playerPoints > 21) {
        console.log('Perdiste u_u');
        btnPedir.disabled = true;
        btnStop.disabled  = true;

        computerShift(playerPoints);
    } else if (playerPoints === 21) {
        console.log('21 :D');
        btnPedir.disabled = true;
        btnStop.disabled  = true;
        
        computerShift(playerPoints);
    }
});

btnStop.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnStop.disabled  = true;

    computerShift(playerPoints);
});

btnNewGame.addEventListener('click', () => {
    deck = [];
    deck = createDeck();

    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;

    btnPedir.disabled = false;
    btnStop.disabled = false;

    playerPoints = 0;
    computerPoints = 0;

    divPlayerCards.innerHTML = '';
    divComputerCards.innerHTML = '';
});
