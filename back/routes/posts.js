const express = require("express");
const router = express.Router();
const db = require('../models');

router.get("/", async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC']], // desc 는 내림차순, asc는 오름차순
        });
        res.json(posts);
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;
