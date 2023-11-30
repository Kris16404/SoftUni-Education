const url = 'http://localhost:3030/data/music';

export const getAllSongs = async () => {
  const res = await fetch(url);
  const songs = await res.json();

  return songs;
};

export const createSong = async (
  token,
  title,
  artist,
  album,
  creationYear,
  youtubeUrl,
  description
) => {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = youtubeUrl.match(videoIdRegex);
  const youtubeId = matches && matches[1];

  const songTemplate = {
    ownerId: token.userId,
    title: title,
    artist: artist,
    album: album,
    creationYear: Number(creationYear),
    youtubeUrl: youtubeUrl,
    youtubeId: youtubeId,
    description: description,
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.accessToken,
    },
    body: JSON.stringify(songTemplate),
  });

  const result = await res.json();

  return result;
};

export const getSongById = async (songId) => {
  const res = await fetch(`${url}/${songId}`);
  const song = await res.json();

  return song;
};

export const editSong = async (
  songId,
  token,
  title,
  artist,
  album,
  creationYear,
  youtubeUrl,
  description
) => {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = youtubeUrl.match(videoIdRegex);
  const youtubeId = matches && matches[1];

  const songTemplate = {
    ownerId: token.userId,
    title: title,
    artist: artist,
    album: album,
    creationYear: Number(creationYear),
    youtubeUrl: youtubeUrl,
    youtubeId: youtubeId,
    description: description,
    createdAt: new Date().toISOString(),
  };
  console.log(songTemplate);
  const res = await fetch(`${url}/${songId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.accessToken,
      'X-Requested-With': token.accessToken,
    },
    body: JSON.stringify(songTemplate),
  });

  const result = await res.json();

  console.log(result);
  return result;
};
