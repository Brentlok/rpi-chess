import jsChessEngine from 'js-chess-engine';
import { getEmptyBoard } from './utils';
import now from 'performance-now';
import { aiMove } from './engine';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

type LetterType = typeof letters[number];
type NumberType = typeof numbers[number];

type Position = `${LetterType}${NumberType}`;

export type Move = {
    from: Position;
    to: Position;
}

export class Chess {
    private game = new jsChessEngine.Game();

    constructor() {}

    aiMove = async (): Promise<Move> => {
        const start = now();

        const move = await aiMove(this.game.exportFEN(), 15);

        const perf = ((now() - start) / 1000).toFixed(3); 
        console.log('Time needed to calculate the moves', `${perf}s`);

        this.tryMove(move.from, move.to);
        this.game.printToConsole();

        return move;
    }

    tryMove = (start: Position, end: Position) => {
        const moves: Position[] = this.game.moves(start);
    
        if(moves.includes(end)) {
            this.game.move(start, end);
            return true;
        }

        console.log(moves);
        return false;
    }

    printGame = () => {
        console.clear();
        this.game.printToConsole();
    }

    static moveToMatrix = ({ from, to }: Move) => {
        const board = getEmptyBoard();

        const numberIndexFrom = 7 - numbers.indexOf(from.slice(1) as NumberType);
        const letterIndexFrom = letters.indexOf(from.slice(0, 1) as LetterType);

        const numberIndexTo = 7 - numbers.indexOf(to.slice(1) as NumberType);
        const letterIndexTo = letters.indexOf(to.slice(0, 1) as LetterType);

        board[numberIndexFrom][letterIndexFrom] = 1;
        board[numberIndexTo][letterIndexTo] = 1;

        return board;
    }

    static isCorrectPosition = (position: string): position is Position => {
        if(position.length > 2) {
            return false;
        }

        return letters.includes(position[0] as LetterType) && numbers.includes(position[1] as NumberType);
    }
}