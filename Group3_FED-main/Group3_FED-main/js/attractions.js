// ============================================
// ATTRACTIONS DATA
// ============================================

const attractions = [
    {
        country: "japan",
        name: "Mount Fuji",
        image: "../asset/discover-destinations/mount-fuji.jpg",
        description: "Japan's tallest mountain and one of its most iconic landmarks.",
        season: "March - May",
        rating: "★★★★★"
    },

    {
        country: "japan",
        name: "Tokyo Skytree",
        image: "../asset/discover-destinations/tokyo-skytree.jpg",
        description: "The tallest structure in Japan with breathtaking city views.",
        season: "All Year",
        rating: "★★★★★"
    },

    {
        country: "japan",
        name: "Fushimi Inari Shrine",
        image: "../asset/discover-destinations/fushimi-inari.jpg",
        description: "Famous for its thousands of red torii gates.",
        season: "All Year",
        rating: "★★★★★"
    },

    {
        country: "usa",
        name: "Statue of Liberty",
        image: "../asset/discover-destinations/statue-of-liberty.jpg",
        description: "An iconic symbol of freedom in New York City.",
        season: "April - October",
        rating: "★★★★★"
    },

    {
        country: "usa",
        name: "Grand Canyon",
        image: "../asset/discover-destinations/grand-canyon.jpg",
        description: "One of the world's greatest natural wonders.",
        season: "March - May",
        rating: "★★★★★"
    },

    {
        country: "usa",
        name: "Golden Gate Bridge",
        image: "../asset/discover-destinations/golden-gate.jpg",
        description: "A famous suspension bridge in San Francisco.",
        season: "September - November",
        rating: "★★★★☆"
    },

    {
        country: "switzerland",
        name: "Matterhorn",
        image: "../asset/discover-destinations/matterhorn.jpg",
        description: "One of the most photographed mountains in the world.",
        season: "June - September",
        rating: "★★★★★"
    },

    {
        country: "switzerland",
        name: "Lake Geneva",
        image: "../asset/discover-destinations/lake-geneva.jpg",
        description: "A beautiful lake surrounded by mountains and vineyards.",
        season: "Summer",
        rating: "★★★★☆"
    },

    {
        country: "switzerland",
        name: "Jungfraujoch",
        image: "../asset/discover-destinations/jungfraujoch.jpg",
        description: "Known as the Top of Europe with spectacular snowy scenery.",
        season: "All Year",
        rating: "★★★★★"
    }
];


// ============================================
// DOM ELEMENTS
// ============================================

const attractionContainer = document.getElementById("attractionContainer");



// ============================================
// DISPLAY CARDS
// ============================================

function displayAttractions(list) {

    if (!attractionContainer) return;

    attractionContainer.innerHTML = "";

    list.forEach((item, index) => {

        const article = document.createElement("article");

        article.className = "col-lg-4 col-md-6 col-12";

        article.style.opacity = "0";
        article.style.transform = "translateY(30px)";

        article.innerHTML = `
            <div class="card destination-card h-100">

                <img
                    src="${item.image}"
                    class="card-img-top"
                    alt="${item.name}">

                <div class="card-body d-flex flex-column">

                    <span class="badge bg-success mb-2 text-capitalize">
                        ${item.country}
                    </span>

                    <h4>${item.name}</h4>

                    <p>${item.description}</p>

                    <button
                        class="btn btn-primary mt-auto"
                        onclick="showDetails(${index})">
                        Learn More
                    </button>

                </div>

            </div>
        `;

        attractionContainer.appendChild(article);

        // Animate each card
        setTimeout(() => {
            article.style.transition = "all 0.45s ease";
            article.style.opacity = "1";
            article.style.transform = "translateY(0)";
        }, index * 120);

    });

}


// ============================================
// SIDEBAR BUTTONS
// ============================================

const buttons = document.querySelectorAll(".country-btn");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        buttons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const country = this.dataset.country;

        history.replaceState(null, "", `?country=${country}`);

        displayAttractions(
            attractions.filter(item => item.country === country)
        );

    });

});


const params = new URLSearchParams(window.location.search);
const selectedCountry = params.get("country") || "japan";

// Highlight the correct button
buttons.forEach(button => {

    button.classList.remove("active");

    if (button.dataset.country === selectedCountry) {
        button.classList.add("active");
    }

});

// Display the correct attractions
displayAttractions(
    attractions.filter(item => item.country === selectedCountry)
);


// ============================================
// BOOTSTRAP MODAL
// ============================================

function showDetails(index){

    const attraction = attractions[index];

    document.getElementById("modalTitle").textContent =
        attraction.name;

    document.getElementById("modalImage").src =
        attraction.image;

    document.getElementById("modalImage").alt =
        attraction.name;

    document.getElementById("modalDescription").textContent =
        attraction.description;

    document.getElementById("modalCountry").textContent =
        attraction.country.toUpperCase();

    document.getElementById("modalSeason").textContent =
        attraction.season;

    document.getElementById("modalRating").textContent =
        attraction.rating;

    const modal = new bootstrap.Modal(
        document.getElementById("infoModal")
    );

    modal.show();

}