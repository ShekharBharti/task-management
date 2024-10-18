const createError = require('http-errors');
const mongoose = require('mongoose');
const Task = require('../schemas/task');

exports.Create = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return next(createError(401, 'Bad Request!'));
        }

        let { id, description } = req.body;
        Task.create({
            _id: new mongoose.Types.ObjectId(),
            description: description
        }).then((response) => {
            if (response.length < 1)
                return next(createError(401, 'Error while saving data.'));

            res.status(201).json({
                status: 201,
                message: 'Task Created',
                data: response
            });
        }).catch((error) => {
            next(createError(401, error));
        })
    }
    catch (error) {
        next(error);
    }
}

exports.Update = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return next(createError(401, 'Bad Request!'));
        }

        let { id, description } = req.body;
        if (id != '' && mongoose.Types.ObjectId.isValid(id)) {
            const _id = new mongoose.Types.ObjectId(id);
            const update = {
                'description': description
            };

            Task.findByIdAndUpdate(_id, update).
                then((data) => {
                    if (data.length < 1)
                        return next(createError(401, 'Error while updating data.'));

                    res.status(201).json({
                        status: 201,
                        message: 'Task Updated',
                        data: data
                    });
                })
                .catch((error) => {
                    next(createError(401, error));
                })

        }
    }
    catch (error) {
        next(error);
    }
}

exports.GetAll = async (req, res, next) => {
    try {

        const tasks = await Task.find({});
        return res.status(200).json({
            statusCode: 200,
            message: 'Task List',
            data: tasks || []
        });
    }
    catch (error) {
        next(error);
    }
}

exports.Delete = async (req, res, next) => {
    try {

        const deleteId = req.params['id'];
        const _id = new mongoose.Types.ObjectId(deleteId);
        const deleteResponse = await Task.findByIdAndDelete(_id);
        return res.status(200).json({
            statusCode: 200,
            message: 'Task Deleted',
            data: deleteResponse
        });
    }
    catch (error) {
        next(error);
    }
}