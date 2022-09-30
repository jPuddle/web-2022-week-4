import "./styles.css";

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initializeCode)
  : initializeCode();

function initializeCode() {
  const form = document.getElementById("search-form");
  const textBox = document.getElementById("input-show");

  form.addEventListener("submit", (e) => {
    fetchAndDisplayShows(textBox.value);
    e.preventDefault();
  });
}

function fetchAndDisplayShows(query) {
  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("show-list").innerHTML = "";
      for (const { show } of data) {
        const showData = document.createElement("div");
        showData.classList.add("show-data");

        if (show.image?.medium) {
          const img = document.createElement("img");
          img.src = show.image.medium;
          showData.appendChild(img);
        }

        const showInfo = document.createElement("div");
        showInfo.classList.add("show-info");
        const title = document.createElement("h1");
        title.innerHTML = show.name;
        showInfo.appendChild(title);
        if (show.summary) {
          showInfo.insertAdjacentHTML("beforeend", show.summary);
        }
        showData.appendChild(showInfo);

        document.getElementById("show-list").appendChild(showData);
      }
    })
    .catch(console.error);
}
