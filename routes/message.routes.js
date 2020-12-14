const express = require('express');
const { expression } = require('joi');
const router = express.Router();
const Message = require('../models').message;
const User = require('../models').user;

router.post('/allmessages', async (req, res) => {
    console.log(req, body);
    try{
        // 전체 받은 메시지
        const received_msg = await Message.findAll({
            include: [User],
            where: {receiverId: req.body.userId},
            order: [['createdAt', 'DESC']]
        });

        // 전체 보낸 메시지
        const sent_msg = await Message.findAll({
            include: [User],
            where: {senderId: req.body.userId},
            order: [['createdAt', 'DESC']]
        });
        console.log(sent_msg);
        res.json({received_msg, sent_msg});
    }catch(err){
        console.log(err);
    }
});

router.post('/send', async(req, res)=>{
    console.log(req.body);
    // const message = req.body.message;
    const messageId = '1';
    // const senderId = req.body.senderId
    const senderId = "f2689463-30a6-4901-b774-bf3dffcc3317" //테스트용
    // const senderName = req.body.senderName;
    // const receiverId = req.body.receiverId
    const receiverId = "f2689463-30a6-4901-b774-bf3dffcc3317" //테스트용
    const post = "d9ea86ef-97e8-4822-a548-ddf57bb8f894" //테스트용
    try{
        const result = await Message.create({
            messageId,
            senderId,
            receiverId,
            post
        });
        console.log(result);
        res.json({message: true});
    }catch(err){
        console.log(err);
    }
});

module.exports=router;