
document.addEventListener("DOMContentLoaded", () => {

  const ADMIN_KEY = "developerhardik11052011"; 
  let isAdmin = sessionStorage.getItem("admin") === "true";
  let selectedRating = 0;
  let clickCount = 0;

  const stars = document.querySelectorAll("#starRating span");
  const reviewList = document.getElementById("reviewList");
  const adminTrigger = document.getElementById("adminTrigger");

  // ⭐ STAR SELECTION (FIXED)
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      selectedRating = index + 1;
      stars.forEach((s, i) => {
        s.classList.toggle("active", i < selectedRating);
      });
    });
  });

  // 📝 SUBMIT REVIEW
  window.submitReview = function () {
    const name = reviewName.value.trim();
    const message = reviewMessage.value.trim();

    if (!name || !message || selectedRating === 0) {
      alert("Please fill all fields and select rating");
      return;
    }

    const reviews = JSON.parse(localStorage.getItem("portfolioReviews")) || [];
    reviews.unshift({ name, message, rating: selectedRating });
    localStorage.setItem("portfolioReviews", JSON.stringify(reviews));

    reviewName.value = "";
    reviewMessage.value = "";
    stars.forEach(s => s.classList.remove("active"));
    selectedRating = 0;

    loadReviews();
  };

  // 🔒 SECRET ADMIN ACTIVATION (5 CLICKS)
  adminTrigger.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 5) {
      const key = prompt("Admin Key:");
      if (key === ADMIN_KEY) {
        sessionStorage.setItem("admin", "true");
        isAdmin = true;
        alert("Admin Mode Activated");
        loadReviews();
      } else {
        alert("Wrong key");
      }
      clickCount = 0;
    }
  });

  // ❌ DELETE REVIEW (ADMIN ONLY)
  window.deleteReview = function (index) {
    if (!isAdmin) return;
    const reviews = JSON.parse(localStorage.getItem("portfolioReviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("portfolioReviews", JSON.stringify(reviews));
    loadReviews();
  };

  // 🔄 LOAD REVIEWS
  function loadReviews() {
    reviewList.innerHTML = "";
    const reviews = JSON.parse(localStorage.getItem("portfolioReviews")) || [];

    reviews.forEach((r, i) => {
      const div = document.createElement("div");
      div.className = "review-card";
      div.innerHTML = `
        <strong>${r.name}</strong>
        <div class="rating">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p>${r.message}</p>
        ${isAdmin ? `<button class="delete-btn" onclick="deleteReview(${i})">Delete</button>` : ""}
      `;
      reviewList.appendChild(div);
    });
  }

  loadReviews();
});
function updateAverageRating() {
  if (reviews.length === 0) {
    document.getElementById("avgValue").textContent = "0.0";
    document.getElementById("totalReviews").textContent = "(0 reviews)";
    return;
  }

  let total = reviews.reduce((sum, r) => sum + r.stars, 0);
  let avg = (total / reviews.length).toFixed(1);

  avgValue.textContent = avg;
  totalReviews.textContent =
    `(${reviews.length} review${reviews.length > 1 ? "s" : ""})`;
}
let selectedStars = 0;
const stars = document.querySelectorAll("#starRating span");

stars.forEach(star => {
  star.addEventListener("mouseover", () => {
    fillStars(star.dataset.star);
  });

  star.addEventListener("mouseout", () => {
    fillStars(selectedStars);
  });

  star.addEventListener("click", () => {
    selectedStars = star.dataset.star;
    fillStars(selectedStars);
  });
});

function fillStars(count) {
  stars.forEach(star => {
    star.classList.toggle(
      "active",
      star.dataset.star <= count
    );
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderReviews();
  updateAverageRating();
});
