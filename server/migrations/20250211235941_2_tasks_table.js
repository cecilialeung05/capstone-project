/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary().unsigned(); 
      table.string('title').notNullable();
      table.text('description'); 
      table.enu('status', ['open', 'in progress', 'completed', 'blocked']).defaultTo('open'); 
      table.date('due_date');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable('tasks');
  };