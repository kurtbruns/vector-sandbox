import { CoordinateSystem } from '@kurtbruns/vector';

interface ExampleSceneConfig {
    width?: number;
    height?: number;
}

export class ExampleScene extends CoordinateSystem {
    constructor(config: ExampleSceneConfig = {}) {

        let defaultConfig: ExampleSceneConfig = {
            width: 640,
            height: 360,
        };

        config = { ...defaultConfig, ...config };

        super({
            width: config.width,
            height: config.height,
            gridWidth: 16,
            gridHeight: 9,
            drawAxes: true,
            axesColor: 'var(--font-color)',
            // axesArrows: true,
            // axesLabels: false,
            drawGrid: true,
            big: true,
        });

        let border = this.frame.rect(0,0, this.width, this.height)
        .setAttribute('stroke', 'var(--medium-color)')
        .setAttribute('stroke-width', '2px');

        this.frame.root.append(border.root);
        
        this.frame.control(100, 100);
        this.frame.control(400, 300);

    }
}
