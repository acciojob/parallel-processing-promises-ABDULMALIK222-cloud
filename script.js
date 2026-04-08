// Image URLs
const imageUrls = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/301",
  "https://picsum.photos/200/302"
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main function
function downloadImages() {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  // Show loading
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  outputDiv.innerHTML = "";

  const promises = imageUrls.map(url => downloadImage(url));

  Promise.all(promises)
    .then(images => {
      // Hide loading
      loadingDiv.style.display = "none";

      // Display images
      images.forEach(img => {
        outputDiv.appendChild(img);
      });
    })
    .catch(error => {
      // Hide loading
      loadingDiv.style.display = "none";

      // Show error
      errorDiv.textContent = error;
    });
}

// Call function
downloadImages();