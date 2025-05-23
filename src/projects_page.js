import { getData } from "./firebase.js";

const project_list_element = document.getElementById("main");

let projects = [];

getData("projets").then((data) => {
  projects = data;

  projects.forEach((p) => {
    console.log(p);
    const project_element = new project(
      p.id,
      p.project_name,
      p.project_location,
      p.links,
      p.project_date
    ).build();
    project_list_element.appendChild(project_element);

    for (let i = 0; i < 0; i++) {
      let copy = project_element.cloneNode(true);
      let img = copy.querySelector("img");
      img.onload = function () {
        img.style.visibility = "visible";
      };
      project_list_element.appendChild(copy);
    }
  });
});

class project {
  constructor(id, title, location, links, date) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.links = links;
    this.date = date;

    this.element = document.createElement("div");
    this.element.classList.add("project");
  }

  build() {
    const title = document.createElement("h2");
    title.textContent = this.title;
    this.element.appendChild(title);

    const location = document.createElement("p");
    location.textContent = this.location;
    this.element.appendChild(location);

    const img = document.createElement("img");

    this.element.appendChild(img);
    img.src = this.links[0].url;
    this.element.setAttribute("id", this.id);
    img.onload = function () {
      img.style.visibility = "visible";
    };

    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = this.date;
    this.element.appendChild(date);

    title.addEventListener("click", openProject.bind(this, this.id));
    img.addEventListener("click", openProject.bind(this, this.id));

    return this.element;
  }
}

function openProject(id) {
  window.location.href = `./../project_page.html?id=${id}`;
}
