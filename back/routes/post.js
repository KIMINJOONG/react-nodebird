const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async (req, res, next) => { // POST /api/post
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
            UserId: req.user.id
        });
        if(hashtags) {
            const result = await Promise.all (hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { 
                    name: tag.slice(1).toLowerCase()
                },
            })));
            await newPost.addHashtags(result.map(r=> r[0]));
        }
        // const User = aiwat newPost.getUser();
        // newPost.User =User;
        // res.json(newPost)
        // 이 방법도 가능
        const fullPost = await db.Post.findOne({
            where: {id : newPost.id},
            include: [{
                model: db.User,
            }]
        })
        res.json(fullPost); 
    } catch(e){
        console.error(e);
        next(e);
    }
});

router.post("/api/post/images", (req, res) => {});

module.exports = router;
