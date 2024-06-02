// Define las URLs base para las diferentes peticiones de la API
const freeGames = "https://www.cheapshark.com/api/1.0/deals?upperPrice=0";
const listOfGames = "https://www.cheapshark.com/api/1.0/games";
const listDeals = "https://www.cheapshark.com/api/1.0/deals";
const bestDeals = "https://www.cheapshark.com/api/1.0/deals?sortBy=Savings";
const newDeals = "https://www.cheapshark.com/api/1.0/deals?sortBy=Recent";

//getFreeGames() not used
export async function getFreeGames() {
  const urlFetch = freeGames;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getListGames(name) used in SearchGame
export async function getListGames(name) {
  const urlFetch = listOfGames + `?title=${name}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getExactGame(title) not used
export async function getExactGame(title) {
  const urlFetch = listOfGames + `?title=${title}&exact=1`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getListDeals() used in Home
export async function getListDeals() {
  const urlFetch = listDeals + `?upperPrice=15&pageSize=10`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//Best deals card used in Home.jsx
export async function getBestDeals() {
  const urlFetch = bestDeals + `&pageSize=7`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//New deals card used in Home.jsx
export async function getNewDeals() {
  const urlFetch = newDeals + `&pageSize=7`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getAllListDeals() used in InterestingTitles
export async function getAllListDeals(page) {
  const urlFetch = listDeals + `?pageNumber=${page}&pageSize=25`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getAllBestDeals() used in BestDeals
export async function getAllBestDeals(page) {
  const urlFetch = bestDeals + `&pageNumber=${page}&pageSize=25`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getAllNewDeals() used in NewDeals
export async function getAllNewDeals(page) {
  const urlFetch = newDeals + `&pageNumber=${page}&pageSize=25`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getAllListDealsFilter(price, time, aaa, steamworks, onSale, page) used in Filter
export async function getAllListDealsFilter(price, time, aaa, steamworks, onSale, page) {
  const urlFetch =
    listDeals + `?upperPrice=${price}&maxAge=${time}&AAA=${aaa}&steamworks=${steamworks}&onSale=${onSale}&pageNumber=${page}&pageSize=25`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getAllListDealsFilter(price, time, aaa, steamworks, onSale, page) used in Filter
export async function getAllBestDealsFilter(price, time, aaa, steamworks, onSale, page) {
  const urlFetch =
    bestDeals + `&upperPrice=${price}&maxAge=${time}&AAA=${aaa}&steamworks=${steamworks}&onSale=${onSale}&pageNumber=${page}&pageSize=25`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getAllNewDealsFilter(price, time, aaa, steamworks, onSale, page) used in Filter
export async function getAllNewDealsFilter(price, time, aaa, steamworks, onSale, page) {
  const urlFetch =
    newDeals + `&upperPrice=${price}&maxAge=${time}&AAA=${aaa}&steamworks=${steamworks}&onSale=${onSale}&pageNumber=${page}&pageSize=25`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//getInfoGame(id) used in GameDetails
export async function getInfoGame(id) {
  const urlFetch = listOfGames + `?id=${id}`;
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
// Second API used to get game information and images
//////////////////////////////////////////////////////////////////////////////////
// const apiRAWGKey = process.env.REACT_APP_RAWG_API_KEY;

// const searchGames = `https://api.rawg.io/api/games`;

//searchGame(name) used in Home, SearchGame, InterestingTitles, BestDeals, NewDeals
export async function searchGame(name) {
  // const urlFetch = searchGames + `?key=${apiRAWGKey}&search=${name}&page_size=1`;
  const response = await fetch(`http://142.93.160.137:11287/searchGame?name=${name}`);
  const json = await response.json();
  return json;
}

//searchGameInfo(id) used in GameDetails
export async function searchGameInfo(id) {
  // const urlFetch = searchGames + `/${id}?key=${apiRAWGKey}`;
  const response = await fetch(`http://142.93.160.137:11287/searchGameInfo?id=${id}`);
  const json = await response.json();
  return json;
}
