const Pictures = require("../models/pictures");
const cloudinary = require("cloudinary");
const Restaurant = require("../models/restaurant")
const Menu = require("../models/menu")

// remember to add your credentials to .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = async (req, res) => {
  const { files, restaurant_id, menu_id } = req.body;
  let pictures = files.map((pic) => {
    if (menu_id){
    return {
      public_id: pic.uploadInfo.public_id,
      photo_url: pic.uploadInfo.secure_url,
      menu_id: menu_id,
      restaurant_id: restaurant_id,
    }} else {
      return {
        public_id: pic.uploadInfo.public_id,
        photo_url: pic.uploadInfo.secure_url,
        restaurant_id: restaurant_id,
      }
    }
  });

  try {
    const created = await Pictures.create(pictures);
    console.log(created);
    res.json({ ok: true, created });
  } catch (error) {
    res.json({ ok: false });
  }
};


const getPictureMenu = async (req, res) => {
  const { menu_id } =req.body;
  try {
    const pictures = await Pictures.findOne({menu_id});
    res.json({ ok: true, pictures });
  } catch (error) {
    res.json({ ok: false });
  }
};

const getPictureRestaurant = async (req, res) => {
  const { restaurant_id } =req.body;
  try {
    const pictures = await Pictures.findOne({restaurant_id});
    res.json({ ok: true, pictures });
  } catch (error) {
    res.json({ ok: false });
  }
};

const getMenusOfRestaurant = async (req, res) => {
  const { restaurant_id } =req.body;
  try {
    const pictures = await Pictures.find({restaurant_id});
    res.json({ ok: true, pictures });
  } catch (error) {
    res.json({ ok: false });
  }
};



const remove = async (req, res) => {
  const { _id } = req.params;

  try {
    const deleted = await Pictures.findByIdAndRemove({ _id: _id });
    if (deleted.public_id) {
      await cloudinary.v2.api.delete_resources([deleted.public_id]);
      res.json({ ok: true, deleted });
    } else {
      res.json({ ok: false });
    }
  } catch (error) {
    res.json({ ok: false });
  }
};

module.exports = {
  upload,
  remove,
  getPictureMenu,
  getPictureRestaurant,
  getMenusOfRestaurant
};