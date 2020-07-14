exports.up = function (knex) {
  // NOTE: It's better practice to generate a new migration file rather than update an old one
  return knex.schema.createTable("pamphlets", function (table) {
    table.increments("id");
    table.string("pamphlet_slug", 255).notNullable();
    table.string("user", 255).defaultTo("ano");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.specificType("links_array", "text ARRAY").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pamphlets");
};
