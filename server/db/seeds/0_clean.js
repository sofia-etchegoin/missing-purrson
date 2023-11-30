export async function seed(knex) {
  await knex('missing_cats').del()
  await knex('users').del()
  await knex('sighted_cats').del()
  await knex('cat_images').del()
}
