
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name', 255)
                .notNullable();
            tbl.text('description');
            tbl.integer('completed')
                .defaultTo(0)
                .notNullable();
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('description', 500)
                .notNullable();
            tbl.text('notes');
            tbl.integer('completed')
                .defaultTo(0)
                .notNullable();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects');
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name', 255)
                .notNullable()
                .unique();
            tbl.text('description');
        })
        .createTable('project_resources', tbl => {
            tbl.increments();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects');
};
