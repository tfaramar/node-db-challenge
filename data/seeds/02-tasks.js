
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'Draft design for treehouse.', notes: 'Make reference to noted cabin designs', completed: 0, project_id: 1},
        {id: 2, description: 'Purchase wood according to design needs.', notes: 'Use Home Depot gift card', completed: 0, project_id: 1},
        {id: 3, description: 'Construct frame.', notes: '', completed: 0, project_id: 1},
        {id: 4, description: 'Plan meal', notes: 'Ask who has dietary restrictions', completed: 0, project_id: 2},
        {id: 5, description: 'Buy groceries', notes: '', completed: 0, project_id: 2},
        {id: 6, description: 'Cook!', notes: 'Allotted time: 3 hours', completed: 0, project_id: 2},
        {id: 7, description: 'Read Knex docs again', notes: '', completed: 0, project_id: 3},
        {id: 8, description: 'Finish test data', notes: '', completed: 0, project_id: 3},
      ]);
    });
};
