export async function up(knex) {
  await knex.schema.createTable('missing_cats', (table) => {
    table.increments('cat_id').primary()
    table.boolean('microchip')
    table.string('microchip_number')
    table.integer('user_id_mc').references('users.user_id')
    table.integer('cat_name')
    table.integer('breed')
    table.integer('color')
    table.integer('description')
    table.date('date_lost')
    table.string('location_lat')
    table.string('location_lng')
    table.boolean('cat_missing')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('missing_cats')
}
