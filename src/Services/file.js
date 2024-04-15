const freeGames = "https://www.cheapshark.com/api/1.0/deals?upperPrice=0";
const getListOfGames = "https://www.cheapshark.com/api/1.0/games";
const topDeals = "https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5";

export async function getFreeGames() {
  const urlFetch = freeGames;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getListGames(name) {
  const urlFetch = getListOfGames + `?title=${name}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function getTopDeals() {
  const urlFetch = topDeals;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

//////////////////////////////////////////////////////////////////////////////////
const apiKey = process.env.REACT_APP_API_KEY;

const searchGames = `https://api.isthereanydeal.com/games/search/v1?key=${apiKey}`;

const gameInfo = `https://api.isthereanydeal.com/games/info/v2?key=${apiKey}`;

export async function searchGameTitle(name) {
  const urlFetch = searchGames + `&title=${name}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export async function searchGameInfo(id) {
  const urlFetch = gameInfo + `&id=${id}`;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}
