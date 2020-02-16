const multer = require('multer');
const { not } = require('ramda');

const upload = multer();

module.exports.upload = upload;

module.exports.handleUploadImages = (ImageService) => async (req, res, next) => {
  if (not(req.files)) return next();
  req.files.writeImages = await ImageService.storeImages(req.files.images);
  return next();
};
