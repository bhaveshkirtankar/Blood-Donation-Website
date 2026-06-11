// Load donors from localStorage
let donorList = JSON.parse(localStorage.getItem("donors")) || [];

// Register donor
document.getElementById("donorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const donorEntry = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    city: document.getElementById("city").value,
    bloodGroup: document.getElementById("bloodGroup").value,
    phone: document.getElementById("phone").value
  };

  donorList.push(donorEntry);

  // Save into localStorage
  localStorage.setItem("donors", JSON.stringify(donorList));

  alert("✅ Donor Registered Successfully!");
  this.reset();
});

// Search Donor
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const blood = document.getElementById("searchBlood").value;
  const city = document.getElementById("searchCity").value.toLowerCase();
  const results = donorList.filter(d => d.bloodGroup === blood && d.city.toLowerCase() === city);

  let output = "";
  if (results.length > 0) {
    results.forEach(d => {
      output += `
        <div class="col-md-6">
          <div class="card border-danger shadow-sm mb-3">
            <div class="card-body">
              <h5 class="card-title text-danger">${d.name} (${d.age} yrs)</h5>
              <p><i class="bi bi-droplet-fill text-danger"></i> <b>${d.bloodGroup}</b></p>
              <p><i class="bi bi-geo-alt-fill text-secondary"></i> ${d.city}</p>
              <p><i class="bi bi-telephone-fill text-success"></i> 
                <a href="tel:${d.phone}" class="text-decoration-none">${d.phone}</a>
              </p>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    output = `<p class="text-center text-muted">No donors found in this city!</p>`;
  }

  document.getElementById("results").innerHTML = output;
});
