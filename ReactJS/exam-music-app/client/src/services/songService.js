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
  const songTemplate = {
    ownerId: token.userId,
    title: title,
    artist: artist,
    album: album,
    creationYear: creationYear,
    youtubeUrl: youtubeUrl,
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
