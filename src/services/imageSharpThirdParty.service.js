/* eslint-disable no-unused-expressions */
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const util = require('util');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { CustomError } = require('../utils/error');

const fsunlink = util.promisify(fs.unlink);

class ImageSharpService {
  constructor(directory, baseUrl, thumbnailSize, defaultSize) {
    this.directory = directory;
    this.baseurl = baseUrl;
    this.thumbnailsize = thumbnailSize;
    this.defaultsize = defaultSize;
  }

  async storeImages(buffers) {
    !fs.existsSync(this.directory) && mkdirp.sync(this.directory);

    const writeImages = await Promise.all(buffers.map(async (image) => {
      const filename = ImageSharpService.filename();
      const filepath = this.filepath(filename);

      await sharp(image.buffer)
        .toFile(filepath);
      return {
        url: `${this.baseurl}/image/${filename}`,
        originalUrl: `${this.baseurl}/image/original/${filename}`,
        thumbnailUrl: `${this.baseurl}/image/thumbnail/${filename}`,
      };
    }));

    return writeImages;
  }

  async thumbnail(filename) {
    try {
      return await sharp(this.filepath(filename))
        .resize(this.thumbnailsize, this.thumbnailsize)
        .toBuffer();
    } catch (error) {
      throw new CustomError('ERROR_READING_IMAGE_AT_THUMBNAIL', 404, error.message);
    }
  }

  async default(filename) {
    try {
      return await sharp(this.filepath(filename))
        .resize(this.defaultsize, this.defaultsize, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toBuffer();
    } catch (error) {
      throw new CustomError('ERROR_READING_IMAGE_AT_SHARP_DEFAULT', 404, error.message);
    }
  }

  async delete(filename) {
    return fsunlink(this.filepath(filename));
  }

  static filename() {
    return `${uuidv4()}.png`;
  }

  filepath(filename) {
    return path.resolve(`${this.directory}/${filename}`);
  }
}

module.exports = ImageSharpService;
