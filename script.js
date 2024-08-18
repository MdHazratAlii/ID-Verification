document.getElementById('idVerificationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const apiKey = '4459ce653f30b4c28711748b5380d879';
    const formData = new FormData(this);

    const imageKeys = ['nidFront', 'nidBack', 'selfieWithNidFront', 'selfieWithNidBack', 'selfieWithPaper', 'others'];

    let allUploaded = true;

    let imageUploadPromises = imageKeys.map(async (key) => {
        const file = formData.get(key);
        if (file) {
            const imageData = new FormData();
            imageData.append('image', file);
            imageData.append('key', apiKey);

            const response = await fetch(`https://api.imgbb.com/1/upload`, {
                method: 'POST',
                body: imageData
            });

            const result = await response.json();
            if (!result.success) {
                allUploaded = false;
            }
            return result;
        }
    });

    const results = await Promise.all(imageUploadPromises);

    if (allUploaded) {
        alert('All images uploaded successfully!');
        document.getElementById('result').innerHTML = 'All images uploaded successfully!';
    } else {
        alert('There was an issue uploading some images. Please try again.');
        document.getElementById('result').innerHTML = 'Some images failed to upload.';
    }
});
