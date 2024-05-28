const form = document.getElementById('editPost');

//hente posten med id som er trykket edit på
function fetchPostDetails(postId) {
    fetch(`https://v2.api.noroff.dev/blog/posts/amund_halgunset/${postId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch post details');
        }
        return response.json();
    })
    .then(responseData => {
        const postData = responseData.data;
        //hente inn dataen fra posten for å putte inn i inputs
        form.elements['title'].value = postData.title ? postData.title : '';
        form.elements['body'].value = postData.body ? postData.body : '';
        form.elements['imageUrl'].value = (postData.media && postData.media.url) ? postData.media.url : '';
        form.elements['altText'].value = (postData.media && postData.media.alt) ? postData.media.alt : '';
    })
    .catch(error => {
        //console.error('Error fetching post details:', error);
        alert("Kunne ikke hente informasjon om blogposten");
    });
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// fylle inn i inputes
if (postId) {
    fetchPostDetails(postId);
} else {
    //console.error('Post ID not found in URL');
    alert("Fant ikke posten");
}

// vente på submit knappen
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // henter data fra formen til PUT requesten
    const title = form.elements['title'].value;
    const body = form.elements['body'].value;
    const imageUrl = form.elements['imageUrl'].value;
    const altText = form.elements['altText'].value;

    const putData = {
        title: title,
        body: body,
        media: {
            url: imageUrl,
            alt: altText
        }
    };

    // PUT request
    fetch(`https://v2.api.noroff.dev/blog/posts/amund_halgunset/${postId}`, { // hvilken post som skal redigeres
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
        },
        body: JSON.stringify(putData) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update the post');
        }
        return response.json();
    })
    .then(data => {
        //console.log('Posten er oppdatert!', data);
        alert("Posten er oppdatert!");
        form.reset();
        window.location.href = '../index.html'
    })
    .catch(error => {
        //console.error('Error updating post:', error);
        alert("Kunne ikke redigere posten!");
    });
});

const bodyTextarea = document.getElementById('body');
const characterCount = document.getElementById('characterCount');

bodyTextarea.addEventListener('input', function() {
    const textLength = this.value.length;
    characterCount.textContent = `${textLength}/2000`;

    if (textLength > 1000) {
        this.value = this.value.slice(0, 2000);
        characterCount.textContent = '2000/2000';
    }
});
