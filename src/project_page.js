import { getData } from "./firebase";

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const id = url.searchParams.get("id");
console.log(id);

getData("projets").then((data) => {
  let project = data.find((p) => p.id === id);
  console.log(project);
  buildProject(project);
});

let caractéristiques_labels = [
  "MAITRE D'OUVRAGE",
  "ADRESSE DU PROJET",
  "DURÉE DU PROJET",
  "CONCOURS PROCÉDURE OUVERTE",
  "DURÉE DU MANDAT",
  "COUT TOTAL CFC 1A9",
  "ARCHITECTE",
  "MANDAT ARCHITECTE",
  "RESPONSABLES",
];

function buildProject(project) {
  const main = document.getElementById("main");

  if(project && project.links[0].url){
    const mainIMG = document.createElement("img");
  mainIMG.src = project.links[0].url;
  mainIMG.className = "main_image";
  main.appendChild(mainIMG);

  }

  if(project && project.project_name){
    const title = document.createElement("h1");
    title.innerHTML = project.project_name;
    title.className = "project_title";
    main.appendChild(title);
    document.title = project.project_name ;
  }

  
  if(project && project.project_location){
  const lieux = document.createElement("h2");
  lieux.innerHTML = project.project_location;
  lieux.className = "project_lieux";
  main.appendChild(lieux);
  }

  if(project && project.project_caracteristiques && project.project_caracteristiques.length > 0){
  const caractéristiques = project.project_caracteristiques;
  console.log(caractéristiques);
  const caractéristiques_element = document.createElement("table");
  caractéristiques.forEach((car, i) => {
    if(car){
    let line = document.createElement("tr");
    let name = document.createElement("td");
    let value = document.createElement("td");
    line.appendChild(name);
    line.appendChild(value);
    line.className = "project_caracteristiques_line";
    name.className = "project_caracteristiques_name";
    value.className = "project_caracteristiques_value";

    let nameText = document.createElement("p");
    name.appendChild(nameText);
    let valueText = document.createElement("p");
    value.appendChild(valueText);

    nameText.innerHTML = caractéristiques_labels[i];
    valueText.innerHTML = car;

    if (car) caractéristiques_element.appendChild(line);
    }
  });
  caractéristiques_element.className = "project_caracteristiques";
  main.appendChild(caractéristiques_element);
}

    let images = [];



  let images_concept = project.links.filter(
    (link) => link.def === "REALISATION"
  );
  
  const section_concept = document.createElement("div");
  const section_conecpt_titre = document.createElement("h2");
  section_conecpt_titre.innerHTML = "Réalisation";
  section_conecpt_titre.className = "section_title";
  section_concept.className = "section";
  const images_concept_grille = document.createElement("div");
  images_concept_grille.className = "project_images_grille";
  images_concept.forEach((img) => {
    const image = document.createElement("img");
    image.src = img.url;
    image.className = "project_images";
    images_concept_grille.appendChild(image);
    images.push(image);
  });
  section_concept.appendChild(section_conecpt_titre);
  section_concept.appendChild(images_concept_grille);
  
  console.log(images_concept);

  let images_etude = project.links.filter((link) => link.def === "ETUDE");
  const section_etude = document.createElement("div");
  const section_etude_titre = document.createElement("h2");
  section_etude_titre.innerHTML = "Étude";
  section_etude_titre.className = "section_title";
  section_etude.className = "section";
  const images_etude_grille = document.createElement("div");
  images_etude_grille.className = "project_images_grille";
  images_etude.forEach((img) => {
    const image = document.createElement("img");
    image.src = img.url;
    image.className = "project_images";
    images_etude_grille.appendChild(image);
    images.push(image);
  });
  section_etude.appendChild(section_etude_titre);
  section_etude.appendChild(images_etude_grille);
  

  let images_dessin = project.links.filter((link) => link.def === "DESSIN");
  const section_dessin = document.createElement("div");
  const section_dessin_titre = document.createElement("h2");
  section_dessin_titre.innerHTML = "Dessin";
  section_dessin_titre.className = "section_title";
  section_dessin.className = "section";
  const images_dessin_grille = document.createElement("div");
  images_dessin_grille.className = "project_images_grille";
  images_dessin.forEach((img) => {
    const image = document.createElement("img");
    image.src = img.url;
    image.className = "project_images";
    images_dessin_grille.appendChild(image);
    images.push(image);
  });
  section_dessin.appendChild(section_dessin_titre);
  section_dessin.appendChild(images_dessin_grille);
  

  let images_chantier = project.links.filter((link) => link.def === "CHANTIER");
  const section_chantier = document.createElement("div");
  const section_chantier_titre = document.createElement("h2");
  section_chantier_titre.innerHTML = "Chantier";
  section_chantier_titre.className = "section_title";
  section_chantier.className = "section";
  const images_chantier_grille = document.createElement("div");
  images_chantier_grille.className = "project_images_grille";
  images_chantier.forEach((img) => {
    const image = document.createElement("img");
    image.src = img.url;
    image.className = "project_images";
    images_chantier_grille.appendChild(image);
    images.push(image);
  });
  section_chantier.appendChild(section_chantier_titre);
  section_chantier.appendChild(images_chantier_grille);


  

  images.forEach((img) => {
    img.addEventListener("click", () => {
      let overlay = document.createElement("div");
      overlay.className = "overlay";
      let overlayImage = img.cloneNode(true);
      overlayImage.className = "overlay_image";
      
      

      overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
      });

      let leftBtn = document.createElement("button");
      leftBtn.innerHTML = "←";
      leftBtn.className = "overlay_btn left_btn arrow_btn";
      let rightBtn = document.createElement("button");
      rightBtn.innerHTML = "→";
      rightBtn.className = "overlay_btn right_btn arrow_btn" ;
      overlay.appendChild(leftBtn);
      overlay.appendChild(overlayImage);
      overlay.appendChild(rightBtn);
      document.body.appendChild(overlay);

      let currentIndex = images.indexOf(img);

      leftBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        overlayImage.src = images[currentIndex].src;
      });

      rightBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        overlayImage.src = images[currentIndex].src;
      });

      overlayImage.addEventListener("dragstart", (e) => e.preventDefault());

      // Enable drag left/right to navigate images
      let startX = null;
      overlayImage.addEventListener("mousedown", (e) => {
        startX = e.clientX;
      });
      overlayImage.addEventListener("mouseup", (e) => {
        if (startX !== null) {
          const diff = e.clientX - startX;
          if (diff > 50) {
        // Dragged right, show previous image
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        overlayImage.src = images[currentIndex].src;
          } else if (diff < -50) {
        // Dragged left, show next image
        currentIndex = (currentIndex + 1) % images.length;
        overlayImage.src = images[currentIndex].src;
          }
        }
        startX = null;
      });

      // Touch support for mobile
      let touchStartX = null;
      overlayImage.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
        }
      });
      overlayImage.addEventListener("touchend", (e) => {
        if (touchStartX !== null && e.changedTouches.length === 1) {
          const diff = e.changedTouches[0].clientX - touchStartX;
          if (diff > 50) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        overlayImage.src = images[currentIndex].src;
          } else if (diff < -50) {
        currentIndex = (currentIndex + 1) % images.length;
        overlayImage.src = images[currentIndex].src;
          }
        }
        touchStartX = null;
      });


    });
  });

  let texts = project.project_textes;
  console.log(texts);

  texts.forEach((text) => {
    if(!text.content || !text.type || text == "") return;
    const textElement = document.createElement("p");
    textElement.innerHTML = text.content;
    textElement.className = "project_text";

    let targetSection;
    switch (text.type) {
      case "REALISATION":
        targetSection = images_concept_grille;
        break;
      case "ETUDE":
        targetSection = images_etude_grille;
        break;
      case "DESSIN":
        targetSection = images_dessin_grille;
        break;
      case "CHANTIER":
        targetSection = images_chantier_grille;
        break;
      default:
        console.warn(`Unknown type: ${text.type}`);
        return;
    }

    if (text.position === "START") {
      targetSection.insertBefore(textElement, targetSection.firstChild);
    } else if (text.position === "MIDDLE") {
      const middleIndex = Math.floor(targetSection.children.length / 2);
      targetSection.insertBefore(
        textElement,
        targetSection.children[middleIndex]
      );
    } else if (text.position === "END") {
      targetSection.appendChild(textElement);
    } else {
      console.warn(`Unknown position: ${text.position}`);
    }
  });



  if(images_concept_grille.children.length>0) main.appendChild(section_concept);
  if(images_etude_grille.children.length>0) main.appendChild(section_etude);
  if(images_dessin_grille.children.length>0) main.appendChild(section_dessin);
  if(images_chantier_grille.children.length>0) main.appendChild(section_chantier);


}
