const app = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`listening port ${PORT}`);
});
