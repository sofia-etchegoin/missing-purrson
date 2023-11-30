export async function seed(knex) {
  await knex('cat_images').insert([
    {
      image_id: 1,
      cat_id_mc: 1,
      image_url: 'https://example.com/cat1.jpg',
      image_desc: 'Fluffy playing with a ball of yarn',
      cat_image_sighting: false,
    },
    {
      image_id: 2,
      cat_id_mc: 2,
      image_url: 'https://example.com/cat2.jpg',
      image_desc: 'Whiskers taking a nap in the sun',
      cat_image_sighting: true,
    },
    {
      image_id: 3,
      cat_id_mc: 3,
      image_url: 'https://example.com/cat3.jpg',
      image_desc: 'Mittens exploring the backyard',
      cat_image_sighting: false,
    },
    {
      image_id: 4,
      cat_id_mc: 1,
      image_url: 'https://example.com/cat4.jpg',
      image_desc: 'Fluffy posing for the camera',
      cat_image_sighting: true,
    },
    {
      image_id: 5,
      cat_id_mc: 4,
      image_url: 'https://example.com/cat5.jpg',
      image_desc: 'Shadow in a mysterious silhouette',
      cat_image_sighting: false,
    },
    {
      image_id: 6,
      cat_id_mc: 2,
      image_url: 'https://example.com/cat6.jpg',
      image_desc: 'Whiskers chasing a butterfly',
      cat_image_sighting: false,
    },
    {
      image_id: 7,
      cat_id_mc: 3,
      image_url: 'https://example.com/cat7.jpg',
      image_desc: 'Mittens with a curious expression',
      cat_image_sighting: true,
    },
    {
      image_id: 8,
      cat_id_mc: 4,
      image_url: 'https://example.com/cat8.jpg',
      image_desc: 'Shadow hiding in a cozy corner',
      cat_image_sighting: false,
    },
    {
      image_id: 9,
      cat_id_mc: 1,
      image_url: 'https://example.com/cat9.jpg',
      image_desc: 'Fluffy with a playful pose',
      cat_image_sighting: false,
    },
    {
      image_id: 10,
      cat_id_mc: 4,
      image_url: 'https://example.com/cat10.jpg',
      image_desc: 'Shadow gazing out of the window',
      cat_image_sighting: true,
    },
  ])
}
