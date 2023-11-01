import {
    downloadSceneZip,
    Frame,
    PlotGridBased,
    Point,
    Rectangle,
    ResponsiveFrame,
    saveAs,
    Scene,
    SceneMode,
    TAU,
    Value,
} from '@kurtbruns/vector';

class ExampleScene extends Scene {

    private angle: Value;

    constructor() {
        super();

        const internalX = -3.2;
        const internalY = -1.8;
        const internalWidth = 6.4;
        const internalHeight = 3.6;

        const width = this.frame.width;
        const height = this.frame.height;
        const s = width / 6.4;

        const before = new PlotGridBased(this.frame.background.root, {
            x: 0,
            y: 0,
            width: width,
            height: height,
            internalX: internalX,
            internalY: internalY,
            internalWidth: internalWidth,
            internalHeight: internalHeight,
            responsive: false,
            grid: false,
        });

        before.drawGridLines2(
            ['half', 'big'],
            ['half', 'big'],
            // before.drawGridLines2(['small'], [ 'small'],
            {
                big: 'primary',
                half: 'tertiary',
            }
        );

        before.drawAxes();

        const o = new Point(width / 2, height / 2);
        this.angle = new Value(0);

        const ix = width / 2 + 1 * s;
        const iy = height / 2 - 0 * s;
        const i = this.frame.control(ix, iy);
        i.addDependency(this.angle);
        i.update = () => {
            i.x = width / 2 + Math.cos(this.angle.value + (0 * TAU) / 4) * s;
            i.y = height / 2 + -Math.sin(this.angle.value + (0 * TAU) / 4) * s;
        };

        const jx = width / 2 + 0 * s;
        const jy = height / 2 - 1 * s;
        const j = this.frame.control(jx, jy);
        j.addDependency(this.angle);
        j.update = () => {
            j.x = width / 2 + Math.cos(this.angle.value + (1 * TAU) / 4) * s;
            j.y = height / 2 + -Math.sin(this.angle.value + (1 * TAU) / 4) * s;
        };

        const plot = new PlotGridBased(this.frame.background.root as any, {
            x: -1.5 * width,
            y: -1.5 * height,
            width: 4 * width,
            height: 4 * height,
            internalX: 4 * internalX,
            internalY: 4 * internalY,
            internalWidth: 4 * internalWidth,
            internalHeight: 4 * internalHeight,
            responsive: false,
            grid: false,
        });

        plot.gridGroup.addDependency(i, j);
        plot.gridGroup.update = () => {
            const a = (i.x - width / 2) / s;
            const b = (i.y - height / 2) / s;

            const c = (j.x - width / 2) / s;
            const d = (j.y - height / 2) / s;

            plot.gridGroup.setAttribute('transform', `matrix(${a}, ${b}, ${c}, ${d}, 0, 0)`);
        };
        plot.gridGroup.update();

        // plot.drawGridLines3();

        // plot.drawGridLines2(['half', 'big'], ['half','big'],
        plot.drawGridLines2(
            ['small-half', 'small'],
            ['small-half', 'small'],
            // plot.drawGridLines2(['small'], [ 'small'],
            {
                small: 'blue1',
                'small-half': 'blue2',
            }
        );

        plot.drawAxes().classList.add('blue');

        const circle = this.frame.circle(o.x, o.y, 1 * s);
        circle.style.stroke = 'var(--font-color)';
        circle.style.strokeWidth = '1.5px';

        const defs = this.frame.defs();
        const ivec = this.frame.line(o.x, o.y, i.x, i.y);
        ivec.attatchArrow(defs, false, 'var(--primary)');
        ivec.update = () => {
            ivec.x2 = i.x;
            ivec.y2 = i.y;
        };
        ivec.addDependency(i);
        ivec.style.strokeWidth = '1.5px';
        ivec.style.stroke = 'var(--primary)';

        const jvec = this.frame.line(o.x, o.y, j.x, j.y);
        jvec.attatchArrow(defs, false, 'var(--primary)');
        jvec.update = () => {
            jvec.x2 = j.x;
            jvec.y2 = j.y;
        };
        jvec.addDependency(j);
        jvec.style.strokeWidth = '1.5px';
        jvec.style.stroke = 'var(--primary)';

        // before.getVerticalGridValues('small').forEach((value, key) => {
        //     if (value.x !== 0 || value.y !== 0) {
        //         placeTex(value.x, value.y, key.toString())
        //     }
        // });

        // before.getHorizontalGridValues('small').forEach((value, key) => {
        //     if (value.x !== 0 || value.y !== 0) {
        //         placeTex(value.x, value.y, key.toString())
        //     }
        // });
        this.play(
            [
                (alpha: number) => {
                    const startAngle = 0; // Change this to the initial angle value if different
                    const endAngle = TAU / 12; // Target value
                    const diff = endAngle - startAngle;
                    const angle = startAngle + diff * alpha;
                    this.setAngle(angle);
                },
            ],
            4,
            'easeInOut'
        );

        this.wait(2);

        this.play(
            [
                (alpha: number) => {
                    const startAngle = TAU / 12; // Change this to the initial angle value if different
                    const endAngle = TAU / 6; // Target value
                    const diff = endAngle - startAngle;
                    const angle = startAngle + diff * alpha;
                    this.setAngle(startAngle + diff * alpha);
                },
            ],
            4
        );
    }

    setAngle(a: number) {
        // TODO: move this code into
        this.angle.value = a;
        this.angle.updateDependents();
    }
}

const example = new ExampleScene();
example.setMode(SceneMode.Live);
example.start();

// downloadSceneZip(example)

// exportScene(example)

// example.start()
