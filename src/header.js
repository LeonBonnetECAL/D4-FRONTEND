Array.from(document.getElementsByClassName('home')).forEach((home) => {
    home.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

document.getElementById('projects-page-button').addEventListener('click', () => {
    window.location.href = 'projects-page.html';
});

document.getElementById('agency-page-button').addEventListener('click', () => {
    window.location.href = 'agency-page.html';
});

document.getElementById('contact-page-button').addEventListener('click', () => {
    window.location.href = 'contact-page.html';
});

