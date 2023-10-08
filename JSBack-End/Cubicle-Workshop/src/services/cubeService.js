const uniqId = require('uniqid');

let cubes = [
  {
    id: '1',
    name: 'Gan356 Air SM',
    description:
      'Magnets in AirSM will not drop, and their positions will be more precise with the Magnets-Snap-On design. With the use of 3mm*2mm magnets, the handfeel will be more stable and more comfortable. P.S. This design is brand new for the AirSM.',
    imageUrl:
      'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg',
    difficulty: 5,
  },
];

const getAllCubes = () => {
  return [...cubes];
};

const createCube = (name, description, imageUrl, difficulty) => {
  const cube = {
    id: uniqId(),
    name,
    description,
    imageUrl,
    difficulty,
  };

  cubes.push(cube);
};

const searchCubes = (search, from, to) => {
  filterCubes = [...cubes];

  if (search) {
    filterCubes = filterCubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (from) {
    filterCubes = filterCubes.filter((cube) => cube.difficulty >= Number(from));
  }

  if (to) {
    filterCubes = filterCubes.filter((cube) => cube.difficulty <= Number(to));
  }

  return filterCubes;
};

exports.getAllCubes = getAllCubes;
exports.createCube = createCube;
exports.searchCubes = searchCubes;
