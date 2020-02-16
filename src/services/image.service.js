class ImageService {
  constructor(image) {
    this.image = image;
  }

  async createImages(data) {
    const images = await this.image.create(data);
    return images;
  }
}

module.exports = ImageService;
