const Image = require('./imageModel');

async function add(params) {
  console.log(params);

  return params;
  //   const image = new Image(params);

  //   await image.save();
}

module.exports = {
  add
};
