import express from "express";
import aiResponse from "../controller/apiController.js";

const router = express.Router()

router.post("/",aiResponse)

export default router