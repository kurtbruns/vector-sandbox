import { CoordinateSystem } from "@kurtbruns/vector";

interface ExampleSceneConfig {
    root?: HTMLElement;
    width?: number;
    height?: number;
}

export class ExampleScene extends CoordinateSystem {
    constructor(config: ExampleSceneConfig = {}) {

        let width = 720;
        let aspectRatio = 16/9;
        let defaultConfig: ExampleSceneConfig = {
            width: 720,
            height: width/aspectRatio,
        };

        config = { ...defaultConfig, ...config };

        super({
            root: document.querySelector('#root'),
            width: config.width,
            height: config.height,
            gridWidth: 2*Math.PI,
            gridHeight: 2*Math.PI/aspectRatio,
            drawAxes: true,
            axesColor: 'var(--font-color)',
            // axesArrows: true,
            // axesLabels: false,
            drawGrid: true,
            big: true,
            half: false
        });

        // this.plot.drawGridLines(
        //     ['half', 'big'],
        //     ['half', 'big'],
        // );

        let border = this.frame.rect(0,0, this.width, this.height)
        .setAttribute('stroke', 'var(--medium-color)')
        .setAttribute('stroke-width', '2px');

        this.frame.root.append(border.root);
        
        this.frame.control(100, 100);
        this.frame.control(400, 300);

    }
}
