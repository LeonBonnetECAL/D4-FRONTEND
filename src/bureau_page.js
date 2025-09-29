import {getData} from './firebase.js';

let aboutData = getData('about').then((data) => {
    console.log(data);

    let description = data[0].description;
    let image1 = data[0].image1;
    let image2 = data[0].image2;


    const main = document.getElementById('main');
    const about_grid = document.createElement('div');
    about_grid.className = 'about_grid';

    // Check if description exists and is not empty
    if (description && description.trim().length > 0) {
        // If description exists, create paragraphs and intertwine with images
        const paragraphs = description.split('\n').filter(paragraph => paragraph.trim() !== '');
        console.log(paragraphs);

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

        // Always add remaining images if they weren't added during paragraph iteration
        if (paragraphs.length === 0 && image1) {
            const image1Element = document.createElement('img');
            image1Element.src = image1;
            image1Element.className = 'about_image';
            about_grid.appendChild(image1Element);
        }
        if (paragraphs.length <= 1 && image2) {
            const image2Element = document.createElement('img');
            image2Element.src = image2;
            image2Element.className = 'about_image';
            about_grid.appendChild(image2Element);
        }
    } else {
        // If no description, just add images
        if (image1) {
            const image1Element = document.createElement('img');
            image1Element.src = image1;
            image1Element.className = 'about_image';
            about_grid.appendChild(image1Element);
        }
        
        if (image2) {
            const image2Element = document.createElement('img');
            image2Element.src = image2;
            image2Element.className = 'about_image';
            about_grid.appendChild(image2Element);
        }
    }
    main.appendChild(about_grid);
});
