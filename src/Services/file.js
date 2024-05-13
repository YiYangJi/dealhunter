const freeGames = "https://www.cheapshark.com/api/1.0/deals?upperPrice=0";
const listOfGames = "https://www.cheapshark.com/api/1.0/games";
const listDeals = "https://www.cheapshark.com/api/1.0/deals";
const bestDeals = "https://www.cheapshark.com/api/1.0/deals?sortBy=Savings&pageSize=7";
const topRatedGames = "https://www.cheapshark.com/api/1.0/deals?sortBy=Recent&pageSize=7";
const ExactGame = "https://www.cheapshark.com/api/1.0/games?exact=1";

export async function getFreeGames() {
  const urlFetch = freeGames;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getListGames(name) {
  const urlFetch = listOfGames + `?title=${name}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getListDeals() {
  const urlFetch = listDeals + `?upperPrice=15&pageSize=10`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getAllListDeals() {
  const urlFetch = listDeals;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getInfoGame(id) {
  const urlFetch = listOfGames + `?id=${id}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getBestDeals() {
  const urlFetch = bestDeals;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getTopRated() {
  const urlFetch = topRatedGames;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getExactGame(title) {
  const urlFetch = listOfGames + `?title=${title}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//////////////////////////////////////////////////////////////////////////////////
// const apiKey = process.env.REACT_APP_ISTHEREANYDEAL_API_KEY;

// const searchGames = `https://api.isthereanydeal.com/games/search/v1?key=${apiKey}`;

// const gameInfo = `https://api.isthereanydeal.com/games/info/v2?key=${apiKey}`;

// export async function searchGameTitle(name) {
//   const urlFetch = searchGames + `&title=${name}`;
//   const response = await fetch(urlFetch);
//   const json = await response.json();
//   return json;
// }

// export async function searchGameInfo(id) {
//   const urlFetch = gameInfo + `&id=${id}`;
//   const response = await fetch(urlFetch);
//   const json = await response.json();
//   return json;
// }

//////////////////////////////////////////////////////////////////////////////////
const apiRAWGKey = process.env.REACT_APP_RAWG_API_KEY;

const searchGames = `https://api.rawg.io/api/games`;

export async function searchGame(name) {
  const urlFetch = searchGames + `?key=${apiRAWGKey}&search=${name}&page_size=1`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function searchGameInfo(id) {
  const urlFetch = searchGames + `/${id}?key=${apiRAWGKey}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}
