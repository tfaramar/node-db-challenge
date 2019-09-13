
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Build Treehouse', description: '', completed: 0},
        {id: 2, name: 'Make Feast', description: 'Be sure to make enough food for 50 people!', completed: 0},
        {id: 3, name: 'Build Database', description: 'Create sample database', completed: 0}
      ]);
    });
};
