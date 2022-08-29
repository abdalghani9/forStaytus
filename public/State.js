export default class State {
  renderData = function (
    planetName,
    dateEdited,
    dateCreated,
    planetFilms,
    planetClimate
  ) {
    document.body.innerHTML += `
    <div class="container rounded-lg mt-10 bg-zinc-800 mx-auto px-12 py-6 w-9/12  flex flex-col " >
    <h3 class="text-amber-200">
    ${dateEdited}
    </h3>
    <div class="flex flex-row justify-between items-between  flex-wrap px-6 py-6">
        <div class="flex justify-between">
            <div class="text-amber-200  px-2">logo</div>
            <div class="flex flex-col ">
                <h2 class="text-slate-50 font-bold text-lg" id="name">${planetName}</h2>
                <h3 class="flex flex-wrap text-zinc-400 font-semibold">${planetFilms}</h3>
            </div>
      </div>
    <div>
        <div  class="text-amber-200">${dateCreated}</div>
        <div class="text-zinc-400 font-semibold">${planetClimate}</div>
    </div>
  </div>`;
  };
}
