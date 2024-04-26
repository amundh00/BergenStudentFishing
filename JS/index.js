fetch('https://v2.api.noroff.dev/blog/posts/amund_halgunset')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
            data.data.forEach(post => {
                const id = post.id; //hent posten sin ID
                const title = post.title;
                const body = post.body;
                const mediaUrl = post.media.url;

                const postDiv = document.createElement('div');
                postDiv.classList.add('singlePost');

                postDiv.innerHTML = `
                    <h2>${title}</h2>
                    <p>${body}</p>
                    <img src="${mediaUrl}" alt="Post Image">
                `;

                //kode for å sjekke om man er logget inn og da kan redigere/slette posts
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    //redigere en post knapp
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.classList.add('cta-button2')
                    editButton.addEventListener('click', () => {
                        console.log('Edit post:', post);
                    });
                    //Slett en post knapp
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('cta-button2')
                    deleteButton.addEventListener('click', () => {
                        deletePost(id);
                    });

                    postDiv.appendChild(editButton);
                    postDiv.appendChild(deleteButton);
                }

                const container = document.getElementById('posts');
                container.appendChild(postDiv);
            });
        } else {
            throw new Error('Invalid response data format');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    //slette en post kode
function deletePost(id) {
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
    })
    .catch(error => {
        console.error('Error deleting post:', error);
    });
}
