exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pamphlets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pamphlets").insert([
        {
          id: 1,
          pamphlet_uri: "nice-quirky-pig",
          created_at: knex.fn.now(),
          links_array: ["https://devhints.io/knex#connect-1"],
        },
        {
          id: 2,
          pamphlet_uri: "annoyed-groggy-dolphin",
          created_at: "2020-01-01T00:00:00-05:00",
          links_array: ["https://devhints.io/knex#connect-1"],
        },
        {
          id: 3,
          pamphlet_uri: "angry-hyper-ant",
          created_at: knex.fn.now(),
          links_array: ["https://devhints.io/knex#connect-1"],
        },
      ]);
    });
};
