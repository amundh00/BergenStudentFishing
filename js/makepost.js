if (!accessToken) {
    //console.error('Fant ikke acces token i Local Storage');
    alert("Du er ikke logget inn!");
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
            //console.log('Posten er lagt ut!', data);
            form.reset();
            window.location.href = '../index.html'
        })
        .catch(error => {
            //console.error('Error submitting post:', error);
            alert("En feil skjedde med postingen av innlegget.");
        });
    });
}

const bodyTextarea = document.getElementById('body');
const characterCount = document.getElementById('characterCount');

bodyTextarea.addEventListener('input', function() {
    const textLength = this.value.length;
    characterCount.textContent = `${textLength}/2000`;

    if (textLength > 1000) {
        // Truncate the text if it exceeds the limit
        this.value = this.value.slice(0, 2000);
        characterCount.textContent = '2000/2000';
    }
});


