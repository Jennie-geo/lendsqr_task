"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users", (table) => {
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
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("users");
}
exports.down = down;
//# sourceMappingURL=20220812092154_create_users_table.js.map