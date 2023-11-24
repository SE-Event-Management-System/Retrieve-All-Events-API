const Event = require('../models/events');
const { v4 } = require('uuid');

const errors = require('../../errors/errors');

module.exports = async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from the database
        
        return res.status(200).json({
            statusCode: 0,
            timestamp: Date.now(),
            requestId: req.body.requestId || v4(),
            data: {
                events,
            },
            info: {
                code: errors['000'].code,
                message: errors['000'].message,
                displayText: errors['000'].displayText,
            },
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 1,
            timestamp: Date.now(),
            requestId: req.body.requestId || v4(),
            info: {
                code: errors['002'].code,
                message: error.message || errors['002'].message,
                displayText: errors['002'].displayText,
            },
            error: error,
        });
    }
};
