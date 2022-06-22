/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

// Pattern module
const myGame = (() => {
    'use strict';

    let deck       = [];
    const types    = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    // HTML references
    const btnPedir    = document.querySelector('#btnPedir'),
          btnStop     = document.querySelector('#btnDetener'),
          btnNewGame  = document.querySelector('#btnNuevo');

    const divPlayersCards = document.querySelectorAll('.divCards'),
              pointsHTML = document.querySelectorAll('small');

    const startGame = ( players = 2 ) => {
        deck = createDeck();

        playersPoints = [];
        for ( let i = 0; i < players; i++ ) {
            playersPoints.push(0);
        }

        // Reset to 0 the points in the HTML
        pointsHTML.forEach( elem => elem.innerText = 0);
        divPlayersCards.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnStop.disabled = false;
    }

    const createDeck = () => {

        deck = []; // Reset deck

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

        return _.shuffle( deck );
    }

    /**
     * Allow us to take a card
     */
    const getCard = () => {

        if (deck.length === 0) {
            throw 'No cards in the deck';
        }

        return deck.shift();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);

        return ( isNaN(value) ) ? 
                (value === 'A') ? 11 : 10
                : value * 1; // It's multiplicated by 2, to convert it to a number.

    }

    // Turno 0: first player
    // Last: computer
    const accumulatePoints = ( card, turno ) => {

        playersPoints[turno] = playersPoints[turno] + cardValue(card);
        console.log({ card })
        console.log({ turno })
        console.log(pointsHTML)
        pointsHTML[turno].innerText = playersPoints[turno];

        return playersPoints[turno];
    }

    const createCard = ( card, turn ) => {

        const newCard = document.createElement('img');
        newCard.src = `assets/cartas/${card}.png`;
        newCard.classList.add('carta');
        divPlayersCards[turn].append( newCard );

    }

    const determineWinner = () => {
        
        const [ minimumPoints, computerPoints ] = playersPoints;
        
        setTimeout(() => {
            if (computerPoints === minimumPoints) {
                alert('¡Empate!');
            } else if (((minimumPoints > computerPoints) && (minimumPoints <= 21))  || (computerPoints > 21)) {
                alert('¡Ganaste!')
            } else if (((minimumPoints < computerPoints) && (computerPoints <= 21)) || (minimumPoints > 21)) {
                alert('Perdiste!')
            }
        }, 100);

    }

    // Computer shift
    const computerShift = ( minimumPoints ) => {
        let computerPoints = 0;

        do {
            const card = getCard();
            computerPoints = accumulatePoints(card, playersPoints.length - 1); // playersPoints.length - 1: to get the last position, last player

            createCard( card, playersPoints.length - 1);
        } while( (computerPoints < minimumPoints) && (minimumPoints <= 21) );

        determineWinner();
    }

    // Events
    btnPedir.addEventListener('click', () => { // <-- Callback
        const card = getCard();
        const playerPoints = accumulatePoints( card, 0 );
        
        // document.querySelector('#player1').textContent = pointsPlayer;
        // document.querySelector('small').textContent = pointsPlayer; // No es buena practica llamar a los elementos en los metodos, porque
                                                                    // cada vez que se ejecute el metodo se hara de nuevo la referencia
        
        createCard( card, 0 );
                                                                    
        // pointsHTML[0].innerText = playerPoints;

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

        computerShift(playersPoints[0]);
    });

    btnNewGame.addEventListener('click', () => {
        startGame();
    });
    
    return {
        startGame: startGame
    };

})();
