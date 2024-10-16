pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

const loadPdfButton = document.getElementById('load-pdf');
const pdfTextOutput = document.getElementById('pdf-text');

document.getElementById('test-fetch-pdf').addEventListener('click', async () => {
    const url = 'https://717ar.github.io/test.pdf';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Network response was not ok:', response.statusText);
            return;
        }
        const blob = await response.blob();
        console.log('Fetched PDF Blob:', blob);
        alert('Fetched PDF successfully! Check console for blob object.');
    } catch (error) {
        console.error('Failed to fetch PDF:', error);
    }
});

loadPdfButton.addEventListener('click', loadPdf);

async function loadPdf() {
    const url = 'https://717ar.github.io/test.pdf'; // Make sure this matches your actual GitHub Pages URL
    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        let allText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const textItems = textContent.items.map(item => item.str);
            allText += textItems.join(' ') + '\n';
        }

        const index = allText.indexOf("789");
        const extractedText = index !== -1 ? allText.slice(index + 3) : "Text after '789' not found.";
        pdfTextOutput.textContent = extractedText;
    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF. Please check the file and try again.');
    }
}


