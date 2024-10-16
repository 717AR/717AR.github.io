const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('pdf-canvas');
const context = canvas.getContext('2d');

fileInput.addEventListener('change', handleFileSelect);

async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = async function() {
            const pdfData = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(pdfData).promise;
            const totalPages = pdf.numPages;
            console.log(`Total pages: ${totalPages}`);

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
        };

        fileReader.readAsArrayBuffer(file);
    } else {
        alert('Please select a valid PDF file.');
    }
}
