import '@/styles/index.scss';

import '@kurtbruns/vector/dist/vector.css';

import '@/styles/theme.css';

import toggleLight from '@/images/toggle-light.svg';
import toggleDark from '@/images/toggle-dark.svg';
import downloadLight from '@/images/download.dark.svg';
import downloadDark from '@/images/download.light.svg';
import { ExportTarget, Scene, SceneMode, download, saveAs } from '@kurtbruns/vector';
import html2canvas from 'html2canvas';

let controls = document.querySelector('.page-controls');
controls.classList.add('no-select');

const toggleButton = document.createElement('button');
toggleButton.classList.add('icon-button');

const downloadButton = document.createElement('button');
downloadButton.classList.add('icon-button');
controls.append(toggleButton, downloadButton);

const downloadIcon = document.createElement('img');
downloadIcon.draggable = false;
downloadButton.append(downloadIcon);

const toggleIcon = document.createElement('img');
toggleIcon.draggable = false;
toggleButton.append(toggleIcon);

const updateTheme = (isDark) => {
    document.documentElement.classList.toggle('light-theme', !isDark);
    toggleIcon.src = isDark ? toggleLight : toggleDark;
    downloadIcon.src = isDark ? downloadLight : downloadDark;
};

toggleIcon.onclick = () => updateTheme(toggleIcon.src === toggleDark);

// Initialize theme if the user has specified light / dark, otherwise default to dark theme
if (window.matchMedia) {
    const darkSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkSchemeMediaQuery.addEventListener('change', (e) => updateTheme(e.matches));
    updateTheme(darkSchemeMediaQuery.matches);
}

downloadButton.onclick = () => {
    let frame = document.querySelector('#root');

    for (let i = 0; i < frame.children.length; i++) {
        // Check if the current child has an ID
        let child = frame.children[i];
        let id = child.id || `interactive-${new Date().toISOString()}`;

        // Use the id or the default naming scheme as the file name
        let filename = `${id}.svg`;

        // Assuming download is a function that handles the SVG download process
        download(child as SVGSVGElement, filename, ExportTarget.FIGMA);
    }
};

(window as any).downloadAsPNG = () => {
    // Save image with html2canvas
    html2canvas(document.querySelector('#root'), { scale: 4 })
        // html2canvas(document.querySelector('#root'))
        .then(function (canvas) {
            canvas.toBlob(function (blob) {
                saveAs(blob, `interactive.png`, {});
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}