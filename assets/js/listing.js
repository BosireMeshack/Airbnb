const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

fetch("/assets/data/listing.json")
  .then((res) => res.json())
  .then((data) => {
    const listing = data.find((item) => item.id === listingId);
    const gallerySection = document.getElementById("gallerySection");

    if (!listing) {
      gallerySection.innerHTML = `<h3 class="text-danger">Listing not found.</h3>`;
      return;
    }
    

    const {
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      parking,
      image,
      gallery = [],
      reviews,
      mapLink,
    } = listing;
// ============ Booking Section ============
const template = document.getElementById("bookingFormTemplate");
const clone = template.content.cloneNode(true);
const bookingSection = document.getElementById("bookingSection");
bookingSection.innerHTML = '';
bookingSection.appendChild(clone);
// document.getElementById("priceHeader").textContent = `Ksh ${pricePerDay} / night`;
// const featureList = document.getElementById("featureList");
//     features.forEach(feature => {
//       const li = document.createElement("li");
//       li.className = "list-group-item";
//       li.textContent = `✔️ ${feature}`;
//       featureList.appendChild(li);
//     });

    const desktopLayout = `
  <div class="d-none d-md-block">
    <a href="explore.html?id=${
      listing.id
    }" class="text-decoration-none text-dark">
      <div class="row g-2">
          <div class="col-md-8">
            <img src="${image}" class="img-fluid w-100 rounded" alt="${title}">
          </div>
          <div class="col-md-4">
            <div class="row g-2">
              ${gallery
                .map(
                  (img) => `
                <div class="col-12">
                  <img src="${img}" class="img-fluid rounded" alt="Gallery">
                </div>
                
              `
                )
                .join("")}
            </div>
          </div>
          
          
        </div>
    

      <div class="card-footer bg-white text-start">
        <h2 class="fw-bold mb-2">${title}</h2>
        <p class="text-muted mb-2">
          <i class="bi bi-geo-alt-fill"></i> ${location} ${
          mapLink
            ? `<a href="${mapLink}" target="_blank" class="btn btn-outline-primary">View on Map</a>`
            : ""
        }
          <span class="ms-2 text-warning">
            <i class="bi bi-star-fill"></i> ${reviews} Reviews
          </span>
        </p>
        <p class="mb-3">
          <i class="fa fa-bed me-2"></i> ${bedrooms} Bedroom
          <i class="fa fa-bath mx-2"></i> ${bathrooms} Bathroom
          <i class="bi bi-car-front ms-2"></i> ${
            parking ? "Parking" : "No Parking"
          }
        </p>
        <p> 
            Share <i class="bi bi-facebook mx-1"></i>
                  <i class="bi bi-instagram mx-1"></i>
                  <i class="bi bi-envelope mx-1"></i>
                  <i class="bi bi-twitter mx-1"></i>
        </p>
        
      </div>
    </a>
  </div>
    `;

    const mobileLayout = `
  <div class="d-block d-md-none">
    <a href="explore.html?id=${
      listing.id
    }" class="text-decoration-none text-dark">
      <div id="galleryCarousel" class="carousel slide mb-3" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${image}" class="d-block w-100 rounded" alt="Main">
          </div>
          ${gallery
            .map(
              (img) => `
            <div class="carousel-item">
              <img src="${img}" class="d-block w-100 rounded" alt="Gallery">
            </div>
          `
            )
            .join("")}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>

      <div class="card-footer bg-white text-start">
        <h2 class="fw-bold mb-2">${title}</h2>
        <p class="text-muted mb-2">
          <i class="bi bi-geo-alt-fill"></i> ${location} ${
            mapLink
              ? `<a href="${mapLink}" target="_blank" class="btn btn-outline-primary">View on Map</a>`
              : ""
          }
          <span class="ms-2 text-warning">
            <i class="bi bi-star-fill"></i> ${reviews} Reviews
          </span>
        </p>
        <p class="mb-3">
          <i class="fa fa-bed me-2"></i> ${bedrooms} Bedroom
          <i class="fa fa-bath mx-2"></i> ${bathrooms} Bathroom
          <i class="bi bi-car-front ms-2"></i> ${
            parking ? "Parking" : "No Parking"
          }
        </p>
        
      </div>
    </a>
  </div>
    `;

    gallerySection.innerHTML = desktopLayout + mobileLayout;

    const listingGrid = document.getElementById("listingGrid");
    const similarListings = data.filter((l) => l.id !== listingId);

    similarListings.forEach((similar) => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <a href="explore.html?id=${
          similar.id
        }" class="text-decoration-none text-dark">
          <div class="card-body bg-light rounded-top position-relative">
            <img src="${similar.image}" class="img-fluid mb-3" alt="${
        similar.title
      }">
            <span class="position-absolute top-50 end-0 m-3 bg-white border rounded-pill px-3 py-1">${
              similar.price
            }</span>
          </div>
          <div class="card-footer bg-white text-start">
            <h5 class="fw-bold mb-1">${similar.title}</h5>
            <p class="text-muted mb-1">
              <i class="bi bi-geo-alt-fill"></i> ${similar.location} ${
                mapLink
                  ? `<a href="${mapLink}" target="_blank" class="btn btn-outline-primary">View on Map</a>`
                  : ""
              }
              <span class="ms-2 text-warning">
                <i class="bi bi-star-fill"></i> ${similar.reviews} Reviews
              </span>
            </p>
            <p class="mb-2">
              <i class="fa fa-bed me-2"></i> ${similar.bedrooms} Bedroom
              <i class="fa fa-bath mx-2"></i> ${similar.bathrooms} Bathroom
              <i class="bi bi-car-front ms-2"></i> ${
                similar.parking ? "Parking" : "No Parking"
              }
            </p>
          </div>
        </a>
      `;

       listingGrid.appendChild(col);

       
    
    });

    
  })
  .catch((err) => {
    console.error("Error loading listing:", err);
    document.getElementById(
      "gallerySection"
    ).innerHTML = `<p class="text-danger">Could not load listing.</p>`;


  });

  

  