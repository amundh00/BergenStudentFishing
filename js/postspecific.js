function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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
        const author = data.author.name;
        const update = formatDate(data.updated); 
        const mediaUrl = (data.media && data.media.url) ? data.media.url : ''; 

        const postDetailsDiv = document.getElementById('specificPost');
        postDetailsDiv.innerHTML =`
        <div>
            <h2>${title}</h2>
            <p>${body}</p>
            <p>Author: ${author}</p>
            <p>Posted: ${update}</p>
        </div>
        <div>
            <img src="${mediaUrl}" alt="Post Image">
        </div>
        `;

        const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('cta-button2');
        editButton.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');
            if (postId) {
                window.location.href = `../post/edit.html?id=${postId}`; // Append postId to the URL
            } else {
                console.error('Post ID not found in URL');
            }
        });

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

        postButtons.appendChild(editButton);
        postButtons.appendChild(deleteButton);
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



