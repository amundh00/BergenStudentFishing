if (!accessToken) {
    console.error('Access token not found in local storage');
} else {
    const form = document.getElementById('lagPost');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = form.elements['title'].value;
        const body = form.elements['body'].value;
        const imageUrl = form.elements['imageUrl'].value;
        const altText = form.elements['altText'].value;

        const postData = {
            title: title,
            body: body,
            media: {
                url: imageUrl,
                alt: altText
            }
        };

        fetch('https://v2.api.noroff.dev/blog/posts/amund_halgunset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Kunne ikke sende inn posten');
            }
            return response.json();
        })
        .then(data => {
            console.log('Posten er lagt ut!', data);
            form.reset();
            window.location.href = '../html/index.html'
        })
        .catch(error => {
            console.error('Error submitting post:', error);
        });
    });
}

