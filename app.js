const dataSource =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSM4xeFrd6dEYHlJ8R7TiS5vlMQ_39VZ7WX6kNQxWHpsmAQFhjlC7T-p8EOiFhkD-2ShLv3LoflMg7W/pub?gid=0&single=true&output=csv';

const serieTv = [];
const serieTvBench = [];

// interruttore per tracciare da quale array sto estraendo e quale sto gradualmente popolando
let switchSerie = true;

const loadData = () => {
  Papa.parse(dataSource, {
    download: true,
    header: true,
    complete: function (results) {
      console.log(results);
    },
  });
};

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
  if (listaSerie.length === 0) {
    switchSerie = false;
  } else if (listaSerieBench.length === 0) {
    switchSerie = true;
  }

  return randomSerie;
};

// refresh contenuti della card
const refreshSerie = (serie) => {
  const card = document.querySelector('#random_serie');
  card.querySelector('img').src = serie.img;
  card.querySelector('.card-title').innerText = serie.title;
  card.querySelector(
    '.card-subtitle'
  ).innerText = `${serie.year} - Rating: ${serie.rating}`;
  card.querySelector('.card-text').innerText = serie.desc;
};

const shuffle = () => {
  if (switchSerie === true) {
    refreshSerie(getRandomSerie(serieTv, serieTvBench));
  } else {
    refreshSerie(getRandomSerie(serieTvBench, serieTv));
  }
};

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
  intro.className += ' d-none';

  const series_card = document.getElementById('series-card');
  series_card.className = series_card.className.replace('d-none', '');
}
