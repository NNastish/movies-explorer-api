// Mongodb variables
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const mongoUrl = 'mongodb://localhost:27017/bitfilmsdb';


module.exports = {
  mongoOptions,
  mongoUrl,
};
