import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.string("id").primary().defaultTo("").notNullable().unique();
    table.string("first_name", 255).defaultTo("").notNullable();
    table.string("last_name", 255).defaultTo("").notNullable();
    table.string("email", 255).defaultTo("").notNullable().unique();
    table.string("password", 255).defaultTo("").notNullable();
    table.string("account_number", 255).defaultTo("").notNullable();
    table.integer("balance").defaultTo(0).nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
