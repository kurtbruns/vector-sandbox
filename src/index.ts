import '@/styles/index.scss';

import '@kurtbruns/vector/dist/vector.css';

import '@/styles/theme.css';

import './interactive';

import toggleLight from '@/images/toggle-light.svg';
import toggleDark from '@/images/toggle-dark.svg';
import downloadLight from '@/images/download.dark.svg';
import downloadDark from '@/images/download.light.svg';
import { ExportTarget, Scene, SceneMode, download, saveAs } from '@kurtbruns/vector';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

let controls = document.querySelector('.controls');
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
    let frame = document.querySelector('#root').firstElementChild as SVGElement;
    download(frame, `interactive.svg`, ExportTarget.FIGMA);

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
};
