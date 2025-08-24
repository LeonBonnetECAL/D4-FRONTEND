import {getData} from './firebase.js';

getData('about').then((data) => {
    document.getElementById('adresse').textContent = data[0].adresse;
    document.getElementById('adresse').style.cursor = 'pointer';
    document.getElementById('adresse').addEventListener('click', () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data[0].adresse)}`, '_blank');
    });
    document.getElementById('telephone').textContent = data[0].telephone;
    document.getElementById('email').textContent = data[0].email;
    document.getElementById('email').style.cursor = 'pointer';
    document.getElementById('email').addEventListener('click', () => {
        window.location.href = `mailto:${data[0].email}`;
    });
}).catch((error) => {
    console.error("Error fetching footer data:", error);
});