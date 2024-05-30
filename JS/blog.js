fetch('https://v2.api.noroff.dev/blog/posts/amund_halgunset')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
            const container = document.getElementById('posts');

            data.data.forEach(post => {
                const id = post.id;
                const title = post.title;
                const mediaUrl = post.media.url;

                const postDiv = document.createElement('a');
                postDiv.classList.add('singlePost');
                postDiv.href = `/html/blogpost.html?id=${id}`;

                postDiv.innerHTML = `
                <div class="postDetail">
                    <h2>${title}</h2>
                    <p>Les Mere</p>
                </div>
                <div class="postImg">
                    <img src="${mediaUrl}" alt="Post Image">
                </div>
                `;

                container.appendChild(postDiv);
            });
        } else {
            throw new Error('Invalid response data format');
        }
    })
    .catch(error => {
        //Sender en feil til bruker om den ikke laster API
        alert("Kunne ikke hente data fra server");
    });
