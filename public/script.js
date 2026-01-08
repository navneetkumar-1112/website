function searchImages() {
  // 1. Get the word the user typed
  let input = document.getElementById("search-box").value.toLowerCase();

  //2.Get all the images links
  let images = document.querySelectorAll(".gallery-grid a");

  //3. loop through them and hide the ones that don't match
  images.forEach((item) => {
    let text = item.querySelector("img").alt.toLowerCase();

    if (text.includes(input)) {
      item.style.display = ""; //show it
    } else {
      item.style.display = "none"; // Hide it
    }
  });
}

function downloadImage(url) {
  // Create a fake link dynamically
  const link = document.createElement("a");
  link.href = url;
  link.download = "wallpaper.jpg"; // Tells browser to download
  document.body.appendChild(link);
  link.click(); // Click it automatically
  document.body.removeChild(link); // Remove it immediately
}
