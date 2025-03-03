/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('task_tags', (table) => {
      table.increments('id').primary();
      table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks').onDelete('CASCADE');
      table.integer('tag_id').unsigned().notNullable().references('id').inTable('tags').onDelete('CASCADE');
      table.unique(['task_id', 'tag_id']);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTableIfExists('task_tags');
  }