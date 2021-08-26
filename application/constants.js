// Mongodb variables
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const mongoUrl = 'mongodb://localhost:27017/bitfilmsdb';

// url and email regex
const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
const urlCheck = new RegExp(urlRegex, 'i');
const emailRegex = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$';
const emailCheck = new RegExp(emailRegex);

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

// JWT for development
const jwtDevelopment = 'super-hard-pass';

module.exports = {
  mongoOptions,
  mongoUrl,
  urlCheck,
  emailCheck,
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
};
