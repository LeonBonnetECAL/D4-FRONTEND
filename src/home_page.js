import { doc } from "firebase/firestore";
import { getData } from "./firebase.js";

const main_element = document.querySelector("main");

getData("projets").then((data) => {
  console.log(data);
  const img_src = data[0].links[0].url;
  const img = document.getElementById("main-image");
  img.src = img_src;
  img.style.visibility = "hidden";

  const main = document.getElementById("main");

  img.onload = function () {
    img.style.visibility = "visible";
  };

  img.addEventListener("click", () => {
    window.location.href = "projects_page.html";
  });
});

document.getElementById("enter_button").addEventListener("click", () => {
  window.location.href = "projects_page.html";
});
