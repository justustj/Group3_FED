// ===============================
// DESTINATION DATA
// ===============================

const destinations = [
    {
        name: "Japan",
        image: "../asset/discover-destinations/japan.jpg",
        description: "Experience a perfect blend of ancient traditions and modern technology. Visit Tokyo, Kyoto, and Mount Fuji while enjoying delicious cuisine and beautiful scenery.",
        page: "attractions.html?country=japan"
    },

    {
        name: "United States",
        image: "../asset/discover-destinations/usa.jpg",
        description: "Discover famous cities, national parks, and iconic landmarks such as New York City, the Grand Canyon, and Yellowstone National Park.",
        page: "attractions.html?country=usa"
    },

    {
        name: "Switzerland",
        image: "../asset/discover-destinations/switzerland.jpg",
        description: "Explore breathtaking mountain landscapes, peaceful lakes, charming villages, and world-famous Swiss chocolates.",
        page: "attractions.html?country=switzerland"
    }
];

// ===============================
// GENERATE DESTINATION CARDS
// ===============================

const container = document.getElementById("destinationContainer");

function displayDestinations(list) {

    if (!container) return;

    container.innerHTML = "";

    list.forEach(destination => {

        const card = document.createElement("div");

        card.className = "col-lg-4 col-md-6 col-12 fade-in";

        card.innerHTML = `
            <div class="card destination-card h-100">

                <img src="${destination.image}"
                     class="card-img-top"
                     alt="${destination.name}">

                <div class="card-body d-flex flex-column">

                    <h3>${destination.name}</h3>

                    <p>${destination.description}</p>

                    <a href="${destination.page}"
                       class="btn btn-primary mt-auto">

                        Explore

                    </a>

                </div>

            </div>
        `;

        container.appendChild(card);

    });

    revealCards();
}

displayDestinations(destinations);

// ===============================
// SEARCH FILTER
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const filtered = destinations.filter(destination =>

            destination.name.toLowerCase().includes(keyword)

        );

        displayDestinations(filtered);

    });

}

// ===============================
// BACK TO TOP BUTTON
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (!topBtn) return;

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ===============================
// FADE-IN ANIMATION
// ===============================

function revealCards() {

    const cards = document.querySelectorAll(".fade-in");

    cards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("show");

        }, index * 150);

    });

}

// ===============================
// NAVBAR ACTIVE LINK
// ===============================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});

// ===============================
// FOOTER YEAR (Optional)
// ===============================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}