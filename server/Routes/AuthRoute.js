import express from "express";

router = express.Router();

router.route("/auth")
.get()
.post();

router.route("/auth/:id")
.put()
.delete();

export default router;