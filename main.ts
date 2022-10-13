console.clear();
const jsChessEngine = require('js-chess-engine');
const Max7219 = require('max7219-display');

type LetterType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type NumberType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
type Move = `${LetterType}${NumberType}`;

const AI_LEVEL: 0 | 1 | 2 | 3 | 4 = 4;

const game = new jsChessEngine.Game();

const tryMove = (start: Move, end: Move) => {
    const moves: string[] = game.moves(start);
    
    if(moves.includes(end)) {
        game.move(start, end);
        return true;
    }

    return false;
}

const aiMove = () => {
    game.aiMove(AI_LEVEL);
    const [{ from, to }] = game.getHistory('reversed');
    return { from, to };
}

const matrix = new Max7219({ 
    device: '/dev/spidev0.0',
    controllerCount: 1, 
    flip: 'vertical'
});

const myMatrix = [
    [0,0,0,0,0,0,0,0],
    [0,0,1,0,0,1,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];
  
const init = async () => {
    await matrix.reset(0);
    await matrix.set(0, myMatrix);
}

init();