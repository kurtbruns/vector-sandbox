import { Rectangle, flattenSVG } from '@kurtbruns/vector';

interface placeTexOptions {
    background?: boolean;
    scale?: number;
}

const defaultOptions = {
    background: true,
    scale: 20 / 18,
};

/**
 * Places the Tex at the corresponding location in the provided br
 */
export function placeTex(group, x, y, tex, options: placeTexOptions = defaultOptions) {
    options = { ...defaultOptions, ...options };

    let output = (MathJax as any).tex2svg(tex, {});
    let svg = output.firstChild;

    flattenSVG(svg);

    svg.classList.add('tex', 'mathjax');

    group.root.appendChild(svg);

    let scale = options.scale;
    group.setAttribute('transform', `scale(${scale})`);

    let bbox = svg.getBoundingClientRect();

    // Combine transformations
    group.setAttribute(
        'transform',
        `translate(${x - bbox.width / 2}, ${y - bbox.height / 2}) scale(${scale})`
    );

    if (options.background) {
        let margin = 8;
        let groupBbox = group.getBoundingBox();
        let rectangle = new Rectangle(
            groupBbox.x - margin / 2,
            groupBbox.y - margin / 2,
            groupBbox.width + margin,
            groupBbox.height + margin
        );
        rectangle.setAttribute('fill', 'var(--background)');
        group.root.prepend(rectangle.root);
    }
}
