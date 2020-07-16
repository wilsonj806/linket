exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pamphlets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pamphlets").insert([
        {
          id: 1,
          pamphlet_slug: "nicequirkypig",
          created_at: knex.fn.now(),
          links_array: [
            "https://devhints.io/knex#connect-1",
            "https://devhints.io/knex#connect-1",
            "https://devhints.io/knex#connect-1",
            "https://devhints.io/knex#connect-1",
          ],
        },
        {
          id: 2,
          pamphlet_slug: "annoyedgroggydolphin",
          created_at: "2020-01-01T00:00:00-05:00",
          links_array: [
            "https://devhints.io/knex#connect-1",
            "https://devhints.io/knex#connect-1",
            "https://devhints.io/knex#connect-1",
            "https://devhints.io/knex#connect-1",
          ],
        },
        {
          id: 3,
          pamphlet_slug: "angryhyperant",
          created_at: knex.fn.now(),
          links_array: ["https://devhints.io/knex#connect-1"],
        },
      ]);
    });
};
