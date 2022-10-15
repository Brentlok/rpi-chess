import jsChessEngine from 'js-chess-engine';
import { getEmptyBoard } from './utils';
import now from 'performance-now';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

type LetterType = typeof letters[number];
type NumberType = typeof numbers[number];

type Position = `${LetterType}${NumberType}`;

export type Move = {
    from: Position;
    to: Position;
}

const AI_LEVEL: 0 | 1 | 2 | 3 | 4 = 3;

export class Chess {
    private game = new jsChessEngine.Game();

    constructor() {}

    aiMove = (): Move => {
        const start = now();
        this.game.aiMove(AI_LEVEL);
        console.log((start - now()).toFixed(3));
        const [{ from, to }] = this.game.getHistory('reversed');
        return { from, to };
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

    static isCorrectMove = (move: string): move is Position => {
        if(move.length > 2) {
            return false;
        }

        return letters.includes(move[0] as LetterType) && numbers.includes(move[1] as NumberType);
    }
}