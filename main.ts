import { Chess } from './chess';
import { ChessMatrix } from './matrix';
import { sleep } from './utils';

const chess = new Chess();
const matrix = new ChessMatrix();

const TIME = 5000;

const gameLoop = async () => {
    chess.printGame();
    await sleep(TIME);

    const moveA = chess.aiMove();
    chess.printGame();
    await matrix.print(Chess.moveToMatrix(moveA));
    
    
    // This will be the player for now use ai
    await sleep(TIME);
    const moveB = chess.aiMove();
    await matrix.print(Chess.moveToMatrix(moveB));
    await sleep(TIME);
    gameLoop();
}

gameLoop();