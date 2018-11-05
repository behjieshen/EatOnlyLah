const Knex = require('knex');
const prompt = require('prompt');

const FIELDS = ['user', 'password', 'database'];

prompt.start();

// Prompt the user for connection details
prompt.get(FIELDS, (err, config) => {
  if (err) {
    console.error(err);
    return;
  }

  // Connect to the database
  const knex = Knex({ client: 'mysql', connection: config });

  // Create the "visits" table
  knex.schema
    .createTable('withoutEmail', table => {
      table.increments();
      table.timestamp('timestamp');
      table.integer('age');
      table.string('gender');
      table.integer('weight_kg');
      table.integer('height_cm');
      table.string('goal');
      table.string('activity_level');
    })
    .then(() => {
      console.log(`Successfully created 'data' table.`);
      return knex.destroy();
    })
    .catch(err => {
      console.error(`Failed to create 'data' table:`, err);
      if (knex) {
        knex.destroy();
      }
    });
});
