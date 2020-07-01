window.addEventListener('DOMContentLoaded', (event) => {
    system_setup();
});

function system_setup() {
    const ilBottone = document.getElementById('start-me-up');
    ilBottone.addEventListener('click', (event) => {
        start_application();
    });
}

function start_application() {
    const intro = document.getElementById('intro');
    intro.className += " d-none";


    const series_card = document.getElementById('series-card');
    series_card.className = series_card.className.replace('d-none', '');

}