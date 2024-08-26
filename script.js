let totalFiles = document.querySelectorAll('input[type="file"]').length;
let uploadedFiles = 0;

document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', async function() {
        const file = this.files[0];
        if (file) {
            const apiKey = '4459ce653f30b4c28711748b5380d879';
            const imageData = new FormData();
            imageData.append('image', file);
            imageData.append('key', apiKey);

            const progressBar = document.getElementById('progress-' + this.id);
            progressBar.style.width = '0%';
            progressBar.parentElement.style.display = 'block';

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgbb.com/1/upload', true);

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    progressBar.style.width = percentComplete + '%';
                }
            };

            xhr.onload = function() {
                if (xhr.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    if (result.success) {
                        checkAllFilesUploaded();
                    } else {
                        alert('Image upload failed.');
                    }
                } else {
                    alert('Error uploading image.');
                }
                progressBar.style.width = '100%'; // Keep progress at 100% after upload
            };

            xhr.onerror = function() {
                alert('Error uploading image.');
                progressBar.style.width = '0%'; // Reset progress bar
            };

            xhr.send(imageData);
        }
    });
});

function checkAllFilesUploaded() {
    uploadedFiles++;
    if (uploadedFiles === totalFiles) {
        document.getElementById('idVerificationForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission
            alert('All images uploaded successfully!');
            location.reload(); // Reload the page after clicking OK
        });
    }
}
