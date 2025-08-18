import { doc } from "firebase/firestore";
import { getData } from "./firebase.js";

const main_element = document.getElementById("main");

let images = [];
let currentImageIndex = 0;
let galleryInterval;

// Create gallery container
let gallery = document.createElement("div");
gallery.classList.add("gallery");
main_element.appendChild(gallery);

getData("projets").then((data) => {
  console.log(data);

  // Collect all image URLs
  let imageUrls = [];
  data.forEach((p) => {
    if (p.links && p.links.length > 0) {
      p.links.forEach((link) => {
        if (link.url && link.def === "REALISATION") {
          imageUrls.push(link.url);
        }
      });
    }
  });

  // Load images and create gallery
  let loadedImages = 0;
  imageUrls.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.classList.add("gallery-image");
    img.style.opacity = index === 0 ? "1" : "0"; // Show first image initially
    
    img.onload = function () {
      images.push(img);
      gallery.appendChild(img);
      loadedImages++;
      
      // Start gallery automation when all images are loaded
      if (loadedImages === imageUrls.length && images.length > 1) {
        startGalleryRotation();
      }
    };

    img.addEventListener("click", () => {
      window.location.href = "projects_page.html";
    });
  });

  // Set main image (first image)
  if (imageUrls.length > 0) {
    const img = document.getElementById("main-image");
    img.src = imageUrls[0];
    img.style.visibility = "hidden";

    img.onload = function () {
      img.style.visibility = "visible";
    };

    img.addEventListener("click", () => {
      window.location.href = "projects_page.html";
    });
  }
});

function startGalleryRotation() {
  if (images.length <= 1) return;
  
  galleryInterval = setInterval(() => {
    // Hide current image
    images[currentImageIndex].style.opacity = "0";
    
    // Move to next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
    
    // Show next image
    images[currentImageIndex].style.opacity = "1";
    
    // Update main image as well
    const mainImg = document.getElementById("main-image");
    if (mainImg) {
      mainImg.src = images[currentImageIndex].src;
    }
  }, 4000); // Change image every 2 seconds
}

// Stop gallery rotation when user leaves the page
window.addEventListener("beforeunload", () => {
  if (galleryInterval) {
    clearInterval(galleryInterval);
  }
});

document.getElementById("enter_button").addEventListener("click", () => {
  window.location.href = "projects_page.html";
});
