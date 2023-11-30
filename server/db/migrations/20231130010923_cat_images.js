export async function up(knex) {
  await knex.schema.createTable('cat_images', (table) => {
    table.increments('image_id').primary()
    table.integer('cat_id_image')
    table.string('image_url')
    table.string('image_desc')
    table.boolean('cat_image_sighting')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('cat_images')
}
