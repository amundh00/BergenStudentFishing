document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const postId = queryParams.get('id');

    if(postId) {
        fetchPostDetails(postId);
    }   else {
        console.error('Post Id ikke funnet i URL');
    }
});

function fetchPostDetails(postId) {
    fetch(`https://v2.api.noroff.dev/blog/posts/amund_halgunset/${postId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Kunne ikke hente posten');
        }
        return response.json();
    })
    .then(responseData => {
        const data = responseData.data;

        console.log('API Response:', data);

        const title = data.title;
        const body = data.body;
        const mediaUrl = (data.media && data.media.url) ? data.media.url : ''; 

        const postDetailsDiv = document.getElementById('specificPost');
        postDetailsDiv.innerHTML =`
        <h2>${title}</h2>
        <p>${body}</p>
        <img src="${mediaUrl}" alt="Post Image">
        `;

        const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('cta-button2');
        editButton.addEventListener('click', () => {
            console.log('Edit post:', data.id); // Log post ID for editing
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('cta-button2');
        deleteButton.addEventListener('click', () => {
            deletePost(data.id)
            .then(()=> {
                window.location.href = '../html/index.html';
            })
            .catch(error => {
                console.error('Kunne ikke slette Post', error);
            });
        });

        postDetailsDiv.appendChild(editButton);
        postDetailsDiv.appendChild(deleteButton);
    }

    })
    .catch(error => {
        console.error('Fikk ikke hentet blog post detaljer', error);
    });
}

function deletePost(id) {
    return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');

        fetch(`https://v2.api.noroff.dev/blog/posts/amund_halgunset/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted successfully');
            resolve(); 
        })
        .catch(error => {
            console.error('Error deleting post:', error);
            reject(error);
        });
    });
}
