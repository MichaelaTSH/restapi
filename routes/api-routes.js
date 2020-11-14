// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import expense controller
var expenseController = require('../controllers/expenseController');

// expense routes
router.get('/expense', expenseController.index);
router.post('/expense', expenseController.new);

router.get('/expense/:expense_id', expenseController.view)
router.patch('/expense/:expense_id', expenseController.update)
router.put('/expense/:expense_id', expenseController.update)
router.delete('/expense/:expense_id', expenseController.delete);

// Export API routes
module.exports = router;
