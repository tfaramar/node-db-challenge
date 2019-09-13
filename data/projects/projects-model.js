const db = require('../db-config.js');

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getResources,
    getTasks
};

function getProjects() {
    return db('projects')
        .then(projects => {
            return projects;
        });
};

function getProjectById(id) {
    return db('projects')
        .where({ id })
        .first();
}

function addProject(project) {
    return db('projects')
        .insert(project, 'id')
        .then((project) => {
            return project;
        });
};

//get all resources for a given project
function getResources(project) {
    return db('project_resources AS pr')
        .where({'pr.project_id': project})
        .select(
            'pr.resource_id',
            'pr.project_id',
            'projects.name AS project_name',
            'resources.name AS resource_name',
            'resources.description AS resource_description'
        )
        .join('projects', 'pr.project_id', 'projects.id')
        .join('resources', 'pr.resource_id', 'resources.id')
        .then(resources => {
            return resources
        });
};


//get all tasks for a given project
function getTasks(project) {
    return db('tasks')
        .where({'tasks.project_id': project})
        .select(
            'projects.name',
            'projects.description AS project_description',
            'tasks.id',
            'tasks.description AS task_description',
            'tasks.notes',
            'tasks.completed'
        )
        .join('projects', 'projects.id', 'tasks.project_id');
};

function addTask(task) {
    return db('tasks')
        .insert
}