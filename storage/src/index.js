const app = require('./server/app');
const config = require('./server/config');

app.listen(config.PORT);
