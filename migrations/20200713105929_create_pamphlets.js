exports.up = function (knex) {
  return knex.schema.createTable("pamphlets", function (table) {
    table.increments("id");
    table.string("pamphlet_uri", 255).notNullable();
    table.string("user", 255).defaultTo("anon");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.specificType("links_array", "text ARRAY").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pamphlets");
};
