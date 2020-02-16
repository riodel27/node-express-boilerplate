const express = require('express');
const middlewares = require('../middlwares');

const router = express.Router();

const { CustomError } = require('../../../utils/error');

const ImageController = require('../../controllers/image.controller');

module.exports = (params) => {
  const { imageService, imagesSharpService } = params;

  router.post(
    '/',
    middlewares.upload.fields([{ name: 'images' }]),
    middlewares.handleUploadImages(imagesSharpService),
    ImageController.createImageEntities(imageService),
  );

  router.get(
    '/:filename',
    async (req, res, next) => {
      try {
        res.type('png');
        const thumbnail = await imagesSharpService.default(req.params.filename);
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
        return res.sendFile(imagesSharpService.filepath(req.params.filename));
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
        const thumbnail = await imagesSharpService.thumbnail(req.params.filename);
        return res.end(thumbnail, 'binary');
      } catch (error) {
        return next(new CustomError(error.code || 'ERROR_GET_THUMBNAIL_IMAGE', error.status || 500, error.message));
      }
    },
  );

  router.delete(
    '/:filename',
    async (req, res) => {
      await imagesSharpService.delete(req.params.filename);
      return res.send(202);
    },
  );

  return router;
};
