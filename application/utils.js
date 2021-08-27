const validator = require('validator');

const makeValidationErrorStr = (fieldName) => `Ошибка в заполнении поля ${fieldName}`;

module.exports.customUrlValidation = (value, helpers, field) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(makeValidationErrorStr(field));
};
