exports.up = function(knex) {
    return knex.schema
        .createTable('users', (tbl)=> {
            tbl.increments()
            tbl.string('name',128).notNullable().unique()    
    })
        .createTable('cars', (tbl)=> {
            tbl.increments()
            tbl.string('car', 128).notNullable()
            tbl.string('year', 128).notNullable()
            tbl.string('color', 128)
            tbl.boolean('clean').notNullable().default(0)
            tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
        })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('cars')
        .dropTableIfExists('users')
};
