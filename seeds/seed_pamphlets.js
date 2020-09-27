exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pamphlets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pamphlets").insert([
        {
          id: 1,
          pamphlet_name: "mything",
          pamphlet_slug: "nicequirkypig",
          created_at: knex.fn.now(),
          links_array: JSON.stringify([
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
          ]),
        },
        {
          id: 2,
          pamphlet_name: "mything",
          pamphlet_slug: "annoyedgroggydolphin",
          created_at: "2020-01-01T00:00:00-05:00",
          links_array: JSON.stringify([
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
          ]),
        },
        {
          id: 3,
          pamphlet_name: "mything",
          pamphlet_slug: "angryhyperant",
          created_at: knex.fn.now(),
          links_array: JSON.stringify([
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
            { link: "https://devhints.io/knex#connect-1", name: "baby shark" },
          ]),
        },
      ]);
    });
};
