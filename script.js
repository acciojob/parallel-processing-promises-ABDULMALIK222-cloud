// Array of image URLs
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

    img.onerror = () => {
      reject("Failed to load image: " + url);
    };
  });
}

// Main function to download all images
function downloadImages() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const output = document.getElementById("output");

  // Show loading spinner
  loading.style.display = "block";
  error.textContent = "";
  output.innerHTML = "";

  // Create promises
  const promises = imageUrls.map(url => downloadImage(url));

  // Execute all promises
  Promise.all(promises)
    .then((images) => {
      // Hide loading
      loading.style.display = "none";

      // Display images
      images.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      // Hide loading
      loading.style.display = "none";

      // Show error message
      error.textContent = err;
    });
}

// Call the function
downloadImages();