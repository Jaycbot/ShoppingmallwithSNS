const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Like } = require('../models/Like');
const { DisLike, Dislike } = require('../models/DisLike');

//=================================
//             Product
//=================================

router.post('/getLikes', (req, res) => {

    let variable = {}

    if(req.body.commentId){
        variable = {commentId : req.body.commentId}
    }

    Like.find(variable)
    .exec((err , likes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success : true, likes})
    })
});


router.post('/getDisLikes', (req, res) => {

    let variable = {}

    if(req.body.commentId){
        variable = {commentId : req.body.commentId}
    }

    Dislike.find(variable)
    .exec((err , dislikes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success : true, dislikes})
    })
});

router.post('/upLike', (req, res) => {

    let variable = {}

    if(req.body.commentId){
        variable = {commentId : req.body.commentId , userId : req.body.userId}
    }

   // Like collection에 정보를 넣어 준다.
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.status(400).json({success : false , err})
        //만약 Dislike 이 이미 클릭 되어 있다면 , dislike을 1 줄여준다.
        Dislike.findOneAndDelete(variable)
        .exec((err , disLikeResult) => {
            if(err) return res.status(400).json({success : false , err})
            res.status(200).json({ success : true})
        })


    })
});



router.post('/unLike', (req, res) => {

    let variable = {}

    if(req.body.commentId){
        ariable = {commentId : req.body.commentId , userId : req.body.userId}
    }

    Like.findOneAndDelete(variable)
    .exec((err , result) => {
        if(err) return res.status(400).json({success : false , err})
        res.status(200).json({success : true})
    })
});

router.post('/unDislike', (req, res) => {

    let variable = {}

    if(req.body.commentId){
        ariable = {commentId : req.body.commentId , userId : req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
    .exec((err , result) => {
        if(err) return res.status(400).json({success : false , err})
        res.status(200).json({success : true})
    })
});

router.post('/upDislike', (req, res) => {

    let variable = {}

    if(req.body.commentId){
        ariable = {commentId : req.body.commentId , userId : req.body.userId}
    }

    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if(err) return res.status(400).json({success : false , err})
        //만약 Dislike 이 이미 클릭 되어 있다면 , dislike을 1 줄여준다.
        Like.findOneAndDelete(variable)
        .exec((err , likeResult) => {
            if(err) return res.status(400).json({success : false , err})
            res.status(200).json({ success : true})
        })


    })
});


module.exports = router;
