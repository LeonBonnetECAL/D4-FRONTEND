import {getData} from './firebase.js';

let aboutData = getData('about').then((data) => {
    let name = data[0].name;
    let adress = data[0].adresse;
    let telephone = data[0].telephone;
    let email = data[0].email;
    let fax = data[0].fax;

    console.log(data);

    const paragraph1 = document.createElement('p');
    paragraph1.innerHTML = name + '<br>' + adress;
    paragraph1.style.cursor = 'pointer';
    paragraph1.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data[0].adresse)}`, '_blank');
    });
    const paragraph2 = document.createElement('p');
    paragraph2.innerHTML = "Tel : " + telephone + '<br>' + "Fax : " + fax;
    const paragraph3 = document.createElement('p');
    paragraph3.innerHTML = "Email : " + email;
    paragraph3.style.cursor = 'pointer';
    paragraph3.addEventListener('click', () => {
        window.location.href = `mailto:${data[0].email}`;
    });
    paragraph1.className = 'contact_paragraph';


    let info = document.getElementById('info');

    info.appendChild(paragraph1);
    info.appendChild(paragraph2);
    info.appendChild(paragraph3);
    const main = document.getElementById('main');
    main.appendChild(info);
});
