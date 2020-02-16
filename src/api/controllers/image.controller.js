
module.exports = {
  createImageEntities: (ImageService) => async (req, res, next) => {
    try {
      const { body: input } = req;

      const images = req.files.writeImages.map((image) => ({
        ...input,
        ...image,
      }));

      const imageEntities = await ImageService.createImages(images);

      return res.status(201).json(imageEntities);
    } catch (error) {
      return next(new Error(error.message));
    }
  },
};
