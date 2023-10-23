const Electronic = require('../models/Electronic.js');

exports.createElectronic = async (
  name,
  type,
  production,
  exploitation,
  damages,
  image,
  price,
  description,
  ownerId
) => {
  const electronicTemplate = {
    name: name,
    type: type,
    damages: damages,
    image: image,
    description: description,
    production: production,
    exploitation: exploitation,
    price: price,
    owner: ownerId,
  };

  await Electronic.create(electronicTemplate);
};

exports.getAllElectronics = async () => {
  const electronics = await Electronic.find().lean().exec();

  return electronics;
};

exports.getElectronicById = async (electronicId) => {
  const electronic = await Electronic.findById(electronicId).lean().exec();

  return electronic;
};

exports.updateElectronicById = async (
  name,
  type,
  production,
  exploitation,
  damages,
  image,
  price,
  description,
  electronicId
) => {
  const electronicTemplate = {
    name: name,
    type: type,
    damages: damages,
    image: image,
    description: description,
    production: production,
    exploitation: exploitation,
    price: price,
  };

  await Electronic.findByIdAndUpdate(electronicId, electronicTemplate, {
    runValidators: true,
  });
};

exports.deleteElectronicById = async (electronicId) => {
  await Electronic.findByIdAndDelete(electronicId);
};

exports.buyElectronic = async (electronicId, user) => {
  const userId = user._id;
  await Electronic.findByIdAndUpdate(electronicId, {
    $push: { buyingList: userId },
  });
};

exports.searchElectronic = async (searchName, searchType) => {
  let electronics = await this.getAllElectronics();

  if (searchName) {
    electronics = electronics.filter((electronic) =>
      electronic.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  if (searchType) {
    electronics = electronics.filter((electronic) =>
      electronic.type.toLowerCase().includes(searchType.toLowerCase())
    );
  }

  return electronics;
};
