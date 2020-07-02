const dataSource =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSM4xeFrd6dEYHlJ8R7TiS5vlMQ_39VZ7WX6kNQxWHpsmAQFhjlC7T-p8EOiFhkD-2ShLv3LoflMg7W/pub?gid=0&single=true&output=csv';

let serieTv = [];
const serieTvBench = [];

window.addEventListener('DOMContentLoaded', (event) => {
  system_setup();
});


function system_setup() {
  const ilBottone = document.getElementById('start-me-up');
  ilBottone.addEventListener('click', (event) => {
    start_application();
  });
  loadData();
}

const loadData = () => {
  Papa.parse(dataSource, {
    download: true,
    header: true,
    complete: function (results) {
       serieTv = results.data;
       console.log(serieTv);
       stop_loading_and_show_start_panel();
    },
  });
};

// nasconde il loader
// mostra pannello di start
const stop_loading_and_show_start_panel = () => {
  const loader = document.getElementsByClassName('loading')[0];
  loader.className += ' d-none';

  const starter_div = document.getElementById('intro-button');
  starter_div.className = starter_div.className.replace('d-none', '');

}


function start_application() {
  const intro = document.getElementById('intro');
  intro.className += ' d-none';

  const series_card = document.getElementById('series-card');
  series_card.className = series_card.className.replace('d-none', '');

  shuffle();

}

// ottieni nuova serie random e implementa la logica dei "due array"
const getRandomSerie = (listaSerie, listaSerieBench) => {
  // ottieni nuova serie random e salvala in randomSerie, restituisci il suo valore a fine funzione
  const maxRange = listaSerie.length;
  const randomNumber = Math.floor(Math.random() * maxRange);
  const randomSerie = listaSerie[randomNumber];

  // rimuovi la serie trovata dal primo array
  listaSerie.splice(randomNumber, 1);
  // inserisci la serie trovata nel secondo array
  listaSerieBench.push(randomSerie);
  // gestione interruttore
  // if (listaSerie.length === 0) {
  //   switchSerie = false;
  // } else if (listaSerieBench.length === 0) {
  //   switchSerie = true;
  // }

  return randomSerie;
};

// refresh contenuti della card
const displaySerie = (serie) => {
  const card = document.querySelector('#series-card');
  card.querySelector('img').src = serie.img;
  card.querySelector('.card-title').innerText = serie.title;
  card.querySelector(
    '.card-subtitle'
  ).innerText = `${serie.year} - Rating: ${serie.rating}`;
  card.querySelector('.card-text').innerText = serie.desc;
};

const shuffle = () => {
  displaySerie(getRandomSerie(serieTv, serieTvBench));
};
