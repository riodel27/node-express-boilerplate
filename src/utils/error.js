/* eslint-disable max-classes-per-file */
class UserInputError extends Error {
  constructor(status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputError);
    }

    this.code = 'BAD_USER_INPUT';
    this.status = status;
  }
}

class AuthenticationError extends Error {
  constructor(status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputError);
    }

    this.code = 'UNAUTHENTICATED';
    this.status = status;
  }
}

class ForbiddenError extends Error {
  constructor(status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputError);
    }

    this.code = 'UNAUTHORIZED';
    this.status = status;
  }
}

class DatabaseError extends Error {
  constructor(status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputError);
    }

    this.code = 'DATABASE_ERROR';
    this.status = status;
  }
}

class CustomError extends Error {
  constructor(code = 'GENERIC', status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputError);
    }

    this.code = code;
    this.status = status;
  }
}

module.exports = {
  UserInputError,
  AuthenticationError,
  CustomError,
  ForbiddenError,
  DatabaseError,
};
