import {getData} from './firebase.js';

let aboutData = getData('about').then((data) => {
    console.log(data);

    let description = data[0].description;
    let image1 = data[0].image1;
    let image2 = data[0].image2;


    const paragraphs = description.split('\n').filter(paragraph => paragraph.trim() !== '');
    console.log(paragraphs);

    const main = document.getElementById('main');
    const about_grid = document.createElement('div');
    about_grid.className = 'about_grid';
    paragraphs.forEach((paragraph, index) => {
        const textElement = document.createElement('p');
        textElement.innerHTML = paragraph;
        about_grid.appendChild(textElement);

        // Intertwine images after specific paragraphs
        if (index === 0 && image1) {
            const image1Element = document.createElement('img');
            image1Element.src = image1;
            image1Element.className = 'about_image';
            about_grid.appendChild(image1Element);
        } else if (index === 1 && image2) {
            const image2Element = document.createElement('img');
            image2Element.src = image2;
            image2Element.className = 'about_image';
            about_grid.appendChild(image2Element);
        }
    });
    main.appendChild(about_grid);
});
