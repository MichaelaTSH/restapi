// Import expense model
var Expense = require('../models/expenseModel');

// Handle index actions
module.exports.index = function (req, res) {
    Expense.get(function (err, expenses) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Expenses retrieved successfully",
            data: expenses
        });
    });
};

// Handle create expense actions
module.exports.new = function (req, res) {
    var expense = new Expense();
    expense.name = req.body.name ? req.body.name : expense.name;
    expense.cost = req.body.cost;

    // save the expense and check for errors
    expense.save(function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: 'New expense created!',
                data: expense
            });
        }
    });
};

// Handle view expense info
module.exports.view = function (req, res) {
    Expense.findById(req.params.expense_id, function (err, expense) {
        if (err)
            res.send(err);
        res.json({
            message: 'Expense details loading..',
            data: expense
        });
    });
};

// Handle update expense info
module.exports.update = function (req, res) {
    Expense.findById(req.params.expense_id, function (err, expense) {
        if (err)
            res.send(err);

        expense.name = req.body.name ? req.body.name : expense.name;
        expense.cost = req.body.cost;

        expense.save(function (err) {
            res.json({
                message: 'Expense Info updated',
                data: expense
            });
        });
    });
};

// Handle delete expense
module.exports.delete = function (req, res) {
    Expense.remove({
        _id: req.params.expense_id
    }, function (err, expense) {
        res.json({
                status: "success",
                message: 'Expense deleted'
            });
    });
};
