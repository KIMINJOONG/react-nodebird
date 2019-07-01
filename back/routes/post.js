const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('./middleware');
const db = require("../models");
const multer = require('multer');
const path = require('path');

// 파일업로드를 위한 multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },  
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); // 제로초.png, ext=== .png, basename === 제로초
            done(null, basename + new Date().valueOf() + ext); // 파일명이 같더라도 업로드하는 시간을 넣어줌으로써 기존파일에 덮어씌우는것을 방지
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, //용량을 제한 현재 최대 20mb 해커들이 서버를 공격못하게 제한해주는게 좋다
});

// 주소들은 텍스트라서 none을 사용
// 파일들은 req.files , 일반값 -> req.body 
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post
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
        if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
           if (Array.isArray(req.body.image)) {
               const images = await Promise.all(req.body.image.map((image) => {
                   return db.Image.create({ src: image });
               }));
               await newPost.addImages(images);
           }  else { // 이미지를 하나만 올리면 image: 주소1
               const image = await db.Image.create({ src: req.body.image});
               await newPost.addImage(image);
           }
        }
        // const User = aiwat newPost.getUser();
        // newPost.User =User;
        // res.json(newPost)
        // 이 방법도 가능
        const fullPost = await db.Post.findOne({
            where: {id : newPost.id},
            include: [{
                model: db.User,
            }, {
                model: db.Image
            }]
        })
        res.json(fullPost); 
    } catch(e){
        console.error(e);
        next(e);
    }
});



// postForm.js 에서 formData에서 append하는 이름과 array안에 이름이 겹쳐야함
// 이미지를 한장만 올릴때는 single, 여러장올릴때는 array
// upload.none() => 이미지나 파일을 하나도 안올릴때
// upload.fileds => 이미지가 각각 이름이 틀릴때
router.post("/images", upload.array('image') ,(req, res) => {
    // single이면 file, arrray, fileds면 files
    console.log(req.files);
    res.json(req.files.map(v => v.filename));
});

router.get('/:id/comments', async (req, res, next) => {
    try{
        const post = await db.Post.findOne({ where : {id: req.params.id } });
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        return res.json(comments);
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.post('/:id/comment', isLoggedIn,async(req, res, next) => { // POST /api/post/1000000/comment
    try{
        const post = await db.Post.findOne({ where : {id: req.params.id } });
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        return res.json(comment);
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try{
        const post = await db.Post.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!post){
            return res.status(400).send('포스트가 존재하지 않습니다.');
        }
        await post.addLiker(req.user.id);
        res.json({ userId: req.user.id});
    } catch(e){
        console.error(e);
        next(e);
    }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
    try{
        const post = await db.Post.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!post){
            return res.status(400).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id});
    } catch(e){
        console.error(e);
        next(e);
    }
});

router.post('/:id/retweet', isLoggedIn, async (req, res) => {
    try{
        const post = await db.Post.findOne({ where: {id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        if(req.user.id === post.UserId) {
            return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await db.Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            }
        });
        if(exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }
        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        });
        const retweetWithPrevPost = await db.Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: db.Image
                }]
            }],
        });
        res.json(retweetWithPrevPost);
    }catch(e){
        console.error(e);
        next(e);
    }
})

module.exports = router;
