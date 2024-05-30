// Function to fetch posts
function fetchAndDisplayPosts() {
    fetch('https://v2.api.noroff.dev/blog/posts/amund_halgunset')
        .then(response => {
            if (!response.ok) {
                throw new Error('Feil i henting av data');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && Array.isArray(data.data)) {
                const container = document.getElementById('posts');
                const carouselContainer = document.getElementById('carouselContainer');

                data.data.forEach((post, index) => {
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

                    if (index < 3) {
                        const carouselItem = document.createElement('div');
                        carouselItem.classList.add('carouselItem');

                        carouselItem.innerHTML = `
                        <a href="/html/blogpost.html?id=${id}">
                            <div class="carouselInfo">
                                <h1>${title}</h1>
                                <p>Les Mere</p>
                            </div>
                            <img src="${mediaUrl}" alt="Post Image">
                        </a>
                        `;

                        carouselContainer.appendChild(carouselItem);
                    }
                });

                setupCarousel();
            } else {
                throw new Error('Feil response fra henting av data');
            }
        })
        .catch(error => {
            alert("Kunne ikke hente data fra server");
        });
}


function setupCarousel() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll('.carouselItem');

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    });

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.style.display = index === currentIndex ? 'block' : 'none';
        });
    }

    currentIndex = 0;
    updateCarousel();

  
    let autoScroll = setInterval(() => {
        nextButton.click();
    }, 5000);

    const carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            nextButton.click();
        }, 5000);
    });
}

fetchAndDisplayPosts();
