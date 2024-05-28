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

                // legg til siste 3 poster til karusell
                if (index < 3) {
                    const carouselItem = document.createElement('div');
                    carouselItem.classList.add('carouselItem');

                    carouselItem.innerHTML = `
                    <a href="/html/blogpost.html?id=${id}">
                        <div class="carouselInfo">
                            <h2>${title}</h2>
                            <p>Les Mere</p>
                        </div>
                        <img src="${mediaUrl}" alt="Post Image">
                    </a>
                    `;

                    carouselContainer.appendChild(carouselItem);
                }
            });

            // eventlistner for knappene neste og forrige
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

            // Starter alltid carusell på siste post
            currentIndex = 0;
            updateCarousel();

            // bytter automatisk
            let autoScroll = setInterval(() => {
                nextButton.click();
            }, 5000);

            // eventlistner for å sjekke om musen hovrer over for og stoppe scroll
            const carousel = document.getElementById('carousel');
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoScroll);
            });

            carousel.addEventListener('mouseleave', () => {
                autoScroll = setInterval(() => {
                    nextButton.click();
                }, 5000);
            });
        } else {
            throw new Error('Invalid response data format');
        }
    })
    .catch(error => {
        alert("Kunne ikke hente data fra server");
    });
