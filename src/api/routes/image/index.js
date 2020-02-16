const express = require('express');
const middlewares = require('../middlwares');

const router = express.Router();

const { CustomError } = require('../../../utils/error');

const ImageController = require('../../controllers/image.controller');

module.exports = (params) => {
  const { imageService: ImageService } = params;

  router.post(
    '/',
    middlewares.upload.fields([{ name: 'images' }]),
    middlewares.handleUploadImages(ImageService),
    ImageController.createImageEntities(ImageService),
  );

  router.get(
    '/:filename',
    async (req, res, next) => {
      try {
        res.type('png');
        const thumbnail = await ImageService.default(req.params.filename);
        return res.end(thumbnail, 'binary');
      } catch (error) {
        return next(new CustomError(error.code || 'ERROR_GET_IMAGE', error.status || 500, error.message));
      }
    },
  );

  // get original image using original url
  router.get(
    '/original/:filename',
    (req, res, next) => {
      try {
        res.type('png');
        return res.sendFile(ImageService.filepath(req.params.filename));
      } catch (error) {
        return next(new Error(error.message));
      }
    },
  );

  // get thumbnail image using thumbnail url
  router.get(
    '/thumbnail/:filename',
    async (req, res, next) => {
      try {
        res.type('png');
        const thumbnail = await ImageService.thumbnail(req.params.filename);
        return res.end(thumbnail, 'binary');
      } catch (error) {
        return next(new CustomError(error.code || 'ERROR_GET_THUMBNAIL_IMAGE', error.status || 500, error.message));
      }
    },
  );

  router.delete(
    '/:filename',
    async (req, res) => {
      await ImageService.delete(req.params.filename);
      return res.send(202);
    },
  );

  return router;
};
