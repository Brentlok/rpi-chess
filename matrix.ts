import Max7219 from 'max7219-display';

export class ChessMatrix {
    private matrix = new Max7219({ 
        device: '/dev/spidev0.0',
        controllerCount: 1, 
        flip: 'vertical'
    });
    
    constructor() {}

    print = async (matrix: (0 | 1)[][]) => {
        await this.matrix.reset(0);
        await this.matrix.set(0, matrix);
    } 
}