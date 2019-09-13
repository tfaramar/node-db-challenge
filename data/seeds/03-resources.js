
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('recourse').insert([
        {id: 1, name: 'Hammer', description: ''},
        {id: 2, name: 'Pine wood', description: 'Cut into 2 x 4'},
        {id: 3, name: 'Cast iron pan', description: 'Heavy'},
        {id: 4, name: 'Oven', description: ''},
        {id: 5, name: 'Computer', description: ''}
      ]);
    });
};
