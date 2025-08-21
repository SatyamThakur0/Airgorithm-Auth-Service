import pgtools from 'pgtools';

import { DB_NAME } from './env.config.js';
import { config } from '../utils/db.utils.js';

const db_name = DB_NAME;

pgtools
  .dropdb(config, db_name)
  .then(() => {
    console.log(`Database ${db_name} deleted successfully`);
  })
  .catch((error) => {
    if (error.name === 'duplicate_database') {
      console.log(`Database ${db_name} does not exists`);
    } else {
      console.error(`Error deleting database ${db_name}:`, error);
    }
  });
