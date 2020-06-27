exports.seed = function(knex) {
  return knex('users').insert([
    {name: 'Sam'},
    {name: 'Bob'},
    {name: 'Kim'}
    ]);
};
