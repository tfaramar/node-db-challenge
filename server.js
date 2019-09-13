const express = require('express');

const Projects = require('./data/projects/projects-model.js');

const server = express();
server.use(express.json());


//project operations
server.get('/projects', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error retrieving the projects.' })
        });
});

server.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    Projects.getProjectById(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({ message: 'There was an error retrieving the projects.' })
    });
});

server.post('/projects', (req, res) => {
    const newProject = req.body;
    Projects.addProject(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to create new project.' }); 
        });
});

//resource operations
server.get('/projects/:id/resources', (req, res) => {
    const { id } = req.params;
    Projects.getResourcesByProject(id)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error retrieving the resources for this project.' });
        });
});

server.post('/resources', (req, res) => {
    const newResource = req.body;
    Projects.addResource(newResource)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to create new resource.' }); 
        });
});

//task operations
server.get('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.getTasks(id)
        .then(tasks => {
            if (tasks.length) {
                res.status(200).json(tasks)
            } else {
                res.status(404).json({ message: 'Could not find tasks for given project.' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error retrieving the tasks for this project.' });
        });
});

server.post('/projects/:id', (req, res) => {
    const newTask = req.body;
    const { id } = req.params;
    
    Projects.getProjectById(id)
    .then(project => {
        if (project) {
            Projects.addTask(newTask, id)
            .then(task => {
              res.status(201).json(task);
            })
          } else {
            res.status(404).json({ message: 'Could not find project with given id.' })
          }
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to create new task.' });
    });
});

module.exports = server;