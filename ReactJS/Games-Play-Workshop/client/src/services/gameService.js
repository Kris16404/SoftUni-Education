const url = 'http://localhost:3030/data/games';

export const getAllGames = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
