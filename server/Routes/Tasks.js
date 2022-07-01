import express from "express";

const router = express.Router();



router.post("/create/:userId");
router.get("/read/:userId");

router.route("/:id")
    .get()
    .put()
    .delete();



export default router;