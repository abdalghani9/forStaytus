import State from "./State.js";

// loading indicator
document.body.innerHTML = `<div class="flex h-screen w-screen items-center justify-center">
<div class="mx-auto h-20 w-20 origin-center animate-spin rounded-full border-8  border-solid border-amber-400 border-t-transparent"></div>
</div>
`;

let stateValues = [];

async function planets() {
  // empty the document after loading data
  document.body.innerHTML = "";
  const thePlanets = new Set();

  try {
    var planet = new Map();
    let filmsArray = new Map();
    let planetFilms = [];
    let url = await fetch("https://swapi.dev/api/planets/?format=json");
    let data = await url.json();
    let { results } = data;

    // get the planets (/planets) who had been appeared in at least two movies
    for (let i = 0; i < results.length; i++) {
      if (results[i].films.length >= 2 && results[i].residents.length > 0) {
        planet.set(results[i].name, results[i].residents);
        planetFilms.push(results[i].films);
        stateValues.push([
          results[i].name,
          `${new Date(results[i].edited).toDateString()}`,
          `Created: ${new Date(results[i].created).getDate()}/${
            new Date(results[i].created).getMonth() + 1
          }/${new Date(results[i].created).getFullYear()}`,
          [],
          results[i].climate,
        ]);
      }
    }

    //fetching films , get their title and url
    let films = await (await fetch("https://swapi.dev/api/films/")).json();
    let { results: filmResults } = films;
    for (let i = 0; i < filmResults.length; i++) {
      filmsArray.set(filmResults[i].url, filmResults[i].title);
    }

    for (let i = 0; i < planetFilms.length; i++) {
      for (let j = 0; j < planetFilms[i].length; j++) {
        // add films to planets card
        stateValues[i][3][j] = filmsArray.get(planetFilms[i][j]);
      }
    }
  } catch (e) {
    throw new Error(`can't load films`);
  }

  //check planets who residents (/people) have reptiles (/species) and get the people
  function people() {
    try {
      planet.forEach((value, key) => {
        for (let people of value) {
          fetch(people)
            .then((result) => result.json())
            .then((value) => {
              let { species } = value;
              if (species.length > 0) {
                return key;
              }
            });
        }
        thePlanets.add(key);
      });
      console.log(thePlanets);
    } catch (e) {
      console.log(e);
    }
  }
  people();
}

setTimeout(() => {
  planets()
    .then(() => {
      for (let i = 0; i < stateValues.length; i++) {
        new State().renderData(...stateValues[i]);
      }
    })
    .catch(() => {
      {
        document.body.innerHTML = `<div class="flex flex-col h-screen w-screen items-center justify-center">
      <div id="report" class="flex items-center justify-center  font-semibold text-lg w-40 h-11 hover:bg-amber-300 cursor-pointer rounded-xl bg-amber-200">Report</div>
      <h3 class="text-2xl mt-5">Can't reload the data!</h3>
      </div>`;
        document.getElementById("report").addEventListener("click", () => {
          document.getElementById("report").innerHTML = `Sent`;
          document
            .getElementById("report")
            .setAttribute(
              "class",
              "flex items-center justify-center  font-semibold text-lg w-40 h-11  cursor-pointer rounded-xl bg-slate-400"
            );
        });
      }
    });
}, 1000);
