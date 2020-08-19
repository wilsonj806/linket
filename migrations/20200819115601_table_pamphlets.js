exports.up = function (knex) {
  // const data = await knex.select().from("pamphlets");
  // knex.schema.dropTable("pamphlets");
  return knex.schema.createTable("pamphlets", function (table) {
    table.increments("id");
    table.string("pamphlet_name", 255).notNullable();
    table.string("pamphlet_slug", 255).notNullable();
    table.string("user", 255).defaultTo("ano");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.json("links_array").notNullable();
  });
  // const newData = data.map(entry => {
  //   return {...entry, links_array: JSON.stringify(entry.links_array)}
  // })
  // return knex("pamphlets").insert(newData)
  // NOTE: It's better practice to generate a new migration file rather than update an old one
};

exports.down = function (knex) {
  return knex.schema.dropTable("pamphlets");
};
