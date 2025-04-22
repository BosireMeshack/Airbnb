

fetch('../assets/data/listing.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("listingGrid");

    data.forEach(listing => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <a href="explore.html?id=${listing.id}" class="text-decoration-none text-dark">
          <div class="card-body position-relative bg-light rounded-top">
            <img src="${listing.image}" class="img-fluid mb-3" alt="${listing.title}">
            <span class="position-absolute top-50 end-0 m-3 bg-white border rounded-pill px-3 py-1">${listing.price}</span>
          </div>
          <div class="card-footer bg-white text-start">
            <h5 class="fw-bold mb-1">${listing.title}</h5>
            <p class="text-muted mb-1">
              <i class="bi bi-geo-alt-fill"></i> ${listing.location}
              <span class="ms-2 text-warning"><i class="bi bi-star-fill"></i> ${listing.reviews} Reviews</span>
            </p>
            <p class="mb-2">
              <i class="fa fa-bed me-2"></i> ${listing.bedrooms} Bedroom
              <i class="fa fa-bath mx-2"></i> ${listing.bathrooms} Bathroom
              <i class="bi bi-car-front ms-2"></i> ${listing.parking ? "Parking" : "No Parking"}
            </p>
            
            ${listing.mapLink ? `<a href="${listing.mapLink}" target="_blank" class="btn btn-sm btn-outline-primary mb-2">View on Map</a>` : ''}
            
          </div>
        </a>
      `;

      container.appendChild(col);
    });
  })
  .catch(error => {
    console.error("Failed to load listings:", error);
    document.getElementById("listingGrid").innerHTML = `<p class="text-danger">Could not load listings. Try again later.</p>`;
  });
  

  

    