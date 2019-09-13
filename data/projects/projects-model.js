const db = require('../db-config.js');

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getResourcesByProject,
    addResource,
    getTasks,
    addTask
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
function getResourcesByProject(project) {
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

function addResource(resource) {
    return db('resources')
        .insert(resource, 'id')
        .then((resource) => {
            return resource;
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

function addTask(task, project_id) {
    return db('tasks')
        .insert(task, {'project_id': project_id})
        .then((task) => {
            return task;
        });

}