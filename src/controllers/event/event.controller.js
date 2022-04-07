import { Event } from "../../models";
import { successResponse, errorResponse } from "../../helpers";
import { Op } from "sequelize";

export const create = async (req, res) => {
  try {
    const { name, startTime, duration } = req.body;
    const payload = {
      name, // Event Name
      startTime, // Event Start Date & Time
      duration, // Event Duration
    };

    const newEvent = await Event.create(payload);
    // console.log("Event Created:", newEvent);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.query;
    const event = await Event.findByPk(id);
    // console.log("Event fetched:", event);
    return successResponse(req, res, { event });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    // Limit and Offset for Pagination Needs.
    const { limit = 10, offset = 0 } = req.query;

    // Current Date Time
    const dateTimeNow = new Date();

    // Current Date Time + 10 mins for 'Live Events'
    let dateTimePlusTenMinutes = new Date(dateTimeNow);
    dateTimePlusTenMinutes.setMinutes(dateTimeNow.getMinutes() + 10);

    // Upcoming Events
    const upcomingEvents = await Event.findAndCountAll({
      where: {
        start_time: {
          [Op.gt]: dateTimeNow.toISOString(),
        },
      },
      limit,
      offset,
    });

    // Live Events List
    const liveEvents = await Event.findAndCountAll({
      where: {
        start_time: {
          [Op.between]: [
            dateTimeNow.toISOString(),
            dateTimePlusTenMinutes.toISOString(),
          ],
        },
      },
      limit,
      offset,
    });
    // console.log("upcomingEvents fetched:", upcomingEvents);
    // console.log("liveEvents fetched:", liveEvents);
    return successResponse(req, res, { upcomingEvents, liveEvents });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
