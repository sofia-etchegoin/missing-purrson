export async function up(knex) {
  await knex.schema.createTable('sighted_cats', (table) => {
    table.increments('sighted_cat_id').primary()
    table.integer('user_id_sc')
    table.integer('cat_id_mc')
    table.string('color')
    table.string('description')
    table.date('date_seen')
    table.string('location_lat')
    table.string('location_lng')
    table.string('email')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('sighted_cats')
}
