document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("property-list");
    const template = document.getElementById("property-card-template");
  
    fetch("assets/data/listing.json")
      .then(response => response.json())
      .then(properties => {

        const filteredProperties = properties.filter(property => property.id >= 4);
  
        filteredProperties.forEach(property => {
          const clone = template.content.cloneNode(true);
          const card = clone.querySelector("a");
          card.href = property.url;
          clone.querySelector("img").src = property.image;
          clone.querySelector("img").alt = property.title;
          clone.querySelector(".price-badge").textContent = property.price;
          clone.querySelector(".title").textContent = property.title;
  
          clone.querySelector(".location").innerHTML = `
            <i class="bi bi-geo-alt-fill"></i> ${property.location}
            <span class="ms-2 text-warning stars">
              ${[...Array(5)].map((_, i) => `<i class="bi ${i < property.rating ? 'bi-star-fill' : 'bi-star'}"></i>`).join('')}
            </span>`;
  
          clone.querySelector(".features").innerHTML = `
            <i class="fa fa-bed me-1" style="font-size:18px"></i> ${property.bedrooms} Bedroom(s)
            <i class="fa fa-bath ms-3 me-1" style="font-size:18px"></i> ${property.bathrooms} Bathroom(s)
            <i class="bi bi-car-front ms-3"></i> Parking
          `;
  
          container.appendChild(clone);
        });
      })
      .catch(error => {
        console.error("Failed to load listings:", error);
        container.innerHTML = `<p class="text-danger">Failed to load listings.</p>`;
      });
  });
  