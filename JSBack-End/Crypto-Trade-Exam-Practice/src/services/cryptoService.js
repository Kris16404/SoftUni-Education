const Crypto = require('../models/Crypto.js');

exports.getAllCryptos = async () => {
  const cryptos = await Crypto.find().lean().exec();
  return cryptos;
};

exports.createCrypto = async (
  name,
  image,
  price,
  description,
  paymentMethod,
  ownerId
) => {
  parsedPrice = Number(price);

  const cryptoTemplate = {
    name: name,
    image: image,
    price: parsedPrice,
    description: description,
    paymentMethod: paymentMethod,
    owner: ownerId,
  };

  await Crypto.create(cryptoTemplate);
};

exports.getCryptoById = async (cryptoId) => {
  const crypto = await Crypto.findById(cryptoId).lean().exec();
  return crypto;
};
