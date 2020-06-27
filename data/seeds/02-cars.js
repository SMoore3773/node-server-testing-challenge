exports.seed = function(knex) {
      return knex('cars').insert([
        {car: 'corvette', year: '2004', color: 'silver', clean: 0, user_id: 1 },
        {car: 'prius', year: '2010', color: 'dark gray', clean: 0, user_id: 2},
        {car: 'carolla', year: '2009', color: 'white', clean: 0, user_id: 3}
      ]);
    };
