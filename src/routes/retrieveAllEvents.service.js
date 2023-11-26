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
            //using map to return only the specified fields
            events: events.map((event) => {
                return {
                    _id: event._id,
                    title: event.title,
                    description: event.description,
                    image: event.image,
                    date: event.date,
                    time: event.time,
                    maxSeats: event.maxSeats,
                    bookedSeats: event.bookedSeats,
                    location: event.location,
                    organizer: event.organizer,
                    attendees: event.attendees,
                    price: event.price,
                    tags: event.tags,
                    createdAt: event.createdAt,
                    updatedAt: event.updatedAt,
                };
            }
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
