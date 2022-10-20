import { StockfishInstance } from "node-stockfish";
import { Chess, Move } from "./chess";

const engine = StockfishInstance.getInstance();

export const aiMove = async (fen: string, maxDepth = 15) => new Promise<Move>(res => {
    engine.setBoardstateByFen(fen);
    engine.startAnalysing({ lines: 1 });
    console.log('Looking for best possible move...');

    engine.onAnalysisData(data => {
        if(data.depth >= maxDepth) {
            const line = data.lines.find(() => true);

            if(!line) {
                return;
            }

            const moveStr = line.moves.find(() => true);

            const from = moveStr.slice(0, 2).toUpperCase();
            const to = moveStr.slice(-2).toUpperCase();

            if(!Chess.isCorrectPosition(from) || !Chess.isCorrectPosition(to)) {
                return;
            }

            engine.terminate();
            res({from, to});
        }
    });
});