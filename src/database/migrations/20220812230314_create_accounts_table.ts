import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique();
    table.uuid("userId").references("id").inTable("users");
    table.uuid("senderId").references("id").inTable("users");
    table.integer("amount").nullable;
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}
