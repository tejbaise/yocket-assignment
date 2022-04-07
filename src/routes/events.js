import express from "express";

import * as eventController from "../controllers/event/event.controller.js";

const router = express.Router();

router.post("/create", eventController.create); // Event Create Route
router.get("/fetch", eventController.getEvent); // Fetch an event by id
router.get("/fetchAll", eventController.getAllEvents); // Fetch All Events (Upcoming & Live Events)

module.exports = router;
