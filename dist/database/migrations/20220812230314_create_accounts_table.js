"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("accounts", (table) => {
        table.uuid("id").primary().notNullable().unique();
        table.uuid("userId").references("id").inTable("users");
        table.uuid("senderId").references("id").inTable("users");
        table.integer("amount").nullable;
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("accounts");
}
exports.down = down;
//# sourceMappingURL=20220812230314_create_accounts_table.js.map