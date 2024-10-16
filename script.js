const pdfUrlInput = document.getElementById('pdf-url');
const loadPdfButton = document.getElementById('load-pdf');
const canvas = document.getElementById('pdf-canvas');
const context = canvas.getContext('2d');

loadPdfButton.addEventListener('click', loadPdf);

async function loadPdf() {
    const url = pdfUrlInput.value.trim();
    if (url) {
        try {
            const pdf = await pdfjsLib.getDocument(url).promise;
            const totalPages = pdf.numPages;
            console.log(`Total pages: ${totalPages}`);

            if (totalPages > 0) {
                // Render the last page
                const lastPage = await pdf.getPage(totalPages);
                const viewport = lastPage.getViewport({ scale: 1 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                await lastPage.render(renderContext).promise;
                console.log('Last page rendered successfully.');
            }
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Failed to load PDF. Please check the URL and try again.');
        }
    } else {
        alert('Please enter a valid PDF URL.');
    }
}
