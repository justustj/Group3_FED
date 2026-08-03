// ============================================
// SOLO TRAVEL TIPS DATA
// ============================================

const travelGuides = {

    japan: [
        {
            title: "Stay Connected",
            icon: "bi-wifi",
            description: "Rent a pocket WiFi or buy a local SIM card to access maps and translation apps."
        },
        {
            title: "Use Public Transport",
            icon: "bi-train-front",
            description: "Purchase an IC Card or JR Pass to travel conveniently around Japan."
        },
        {
            title: "Respect Local Culture",
            icon: "bi-house-heart",
            description: "Keep noise levels low and follow local etiquette when visiting shrines and public places."
        }
    ],

    usa: [
        {
            title: "Emergency Numbers",
            icon: "bi-telephone",
            description: "Dial 911 for emergencies and always save your accommodation address."
        },
        {
            title: "Transportation",
            icon: "bi-car-front",
            description: "Use Uber, Lyft or public transportation depending on the city."
        },
        {
            title: "Safety",
            icon: "bi-shield-check",
            description: "Avoid isolated areas at night and keep valuables secure."
        }
    ],

    switzerland: [
        {
            title: "Swiss Travel Pass",
            icon: "bi-train-lightrail-front",
            description: "The Swiss Travel Pass gives unlimited access to trains, buses and boats."
        },
        {
            title: "Pack Warm Clothing",
            icon: "bi-snow",
            description: "Mountain weather changes quickly, so bring warm layers."
        },
        {
            title: "Carry Cash",
            icon: "bi-cash-coin",
            description: "Most places accept cards, but some small shops still prefer cash."
        }
    ]

};


// ============================================
// DOM ELEMENTS
// ============================================

const guideCountry = document.getElementById("guideCountry");
const tipsContainer = document.getElementById("tipsContainer");


// ============================================
// DISPLAY TIPS
// ============================================

function displayTips(country){

    tipsContainer.innerHTML = "";

    travelGuides[country].forEach(tip=>{

        const card = document.createElement("div");

        card.className = "col-lg-4 col-md-6";

        card.innerHTML = `

        <article class="card destination-card h-100">

            <div class="card-body text-center">

                <i class="bi ${tip.icon} display-4 text-primary"></i>

                <h4 class="mt-3">

                    ${tip.title}

                </h4>

                <p>

                    ${tip.description}

                </p>

            </div>

        </article>

        `;

        tipsContainer.appendChild(card);

    });

}


// ============================================
// INITIAL DISPLAY
// ============================================

displayTips("japan");


// ============================================
// CHANGE COUNTRY
// ============================================

guideCountry.addEventListener("change", function(){

    displayTips(this.value);

});


// ============================================
// PACKING CHECKLIST
// ============================================

const checkboxes = document.querySelectorAll("#packingList input");

checkboxes.forEach(box=>{

    box.addEventListener("change", function(){

        const item = this.parentElement;

        if(this.checked){

            item.classList.add("text-decoration-line-through");

            item.classList.add("text-success");

        }

        else{

            item.classList.remove("text-decoration-line-through");

            item.classList.remove("text-success");

        }

    });

});


// ============================================
// SCROLL TO FAQ
// ============================================

const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(button=>{

    button.addEventListener("click", ()=>{

        setTimeout(()=>{

            button.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

        },300);

    });

});