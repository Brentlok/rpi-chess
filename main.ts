import { Chess } from './chess';
import { ChessMatrix } from './matrix';
import { sleep } from './utils';

const chess = new Chess();
const matrix = new ChessMatrix();

const TIME = 500;

const gameLoop = async () => {
    await sleep(TIME);

    const moveA = chess.aiMove();
    await matrix.print(Chess.moveToMatrix(moveA));
    
    
    // This will be the player for now use ai
    await sleep(TIME);
    const moveB = chess.aiMove();
    await matrix.print(Chess.moveToMatrix(moveB));
    await sleep(TIME);
    gameLoop();
}

gameLoop();