/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

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
    console.log(deck)

    return deck;
}

createDeck();
