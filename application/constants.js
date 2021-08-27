// Mongodb variables
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const { NODE_ENV, MONGO_URL } = process.env;
const mongoUrlDev = 'mongodb://localhost:27017/moviesdb';
const mongoUrl = NODE_ENV === 'production' ? MONGO_URL : mongoUrlDev;

// error messages
const loginErrorMessage = 'Неправильная почта или пароль';
const notFoundMessage = 'Пользователь не найден';
const emailDuplicatedMessage = 'Пользователь с таким email уже существует';
const invalidDataMessage = 'Неверно поданы данные';
const movieNotFoundMessage = 'Фильм с переданным movieId не существует';
const accessDenied = 'Ошибка доступа';
const internalServerError = 'На сервере произошла ошибка';
const authError = 'Необходима авторизация';
const pageNotFound = 'Страница по заданному маршруту не существует';
const queryLimitExceedError = 'Превышен лимит запросов';

// JWT for development
const jwtDevelopment = 'super-hard-pass';

module.exports = {
  mongoOptions,
  mongoUrl,
  loginErrorMessage,
  notFoundMessage,
  emailDuplicatedMessage,
  invalidDataMessage,
  movieNotFoundMessage,
  accessDenied,
  internalServerError,
  authError,
  jwtDevelopment,
  pageNotFound,
  queryLimitExceedError,
};
