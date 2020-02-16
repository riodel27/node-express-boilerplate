const multer = require('multer');
const { not } = require('ramda');

const upload = multer();

module.exports.upload = upload;

module.exports.handleUploadImages = (ImagesSharpService) => async (req, res, next) => {
  if (not(req.files)) return next();
  req.files.writeImages = await ImagesSharpService.storeImages(req.files.images);
  return next();
};
