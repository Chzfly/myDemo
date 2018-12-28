const express = require('express');
const formidable = require('formidable');
const path = require("path");
const mongoose = require("mongoose");
const Mood = require("./models/Mood.js");
const moment = require("moment");


const app = express();
//静态化路由
app.use(express.static("./uploads"));
//链接数据库
mongoose.connect("mongodb://127.0.0.1/shuoshuo");
//上传接口
app.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        res.json({
            "result": path.parse(files.file.path).base
        })
    })
});
//发送说说接口
app.post("/shuoshuo", (req, res) => {
    //创建form
    var form = new formidable.IncomingForm();
    //解析request
    form.parse(req, (err, fields, files) => {
        //处理请求带来的数据
        Mood.create({
            nickName: fields.nickName,
            avatarUrl: fields.avatarUrl,
            content: fields.content,
            fwqPics: fields.fwqPics,
            time: moment().format('YYYY年MM月DD日 h:mm:ss a')
        },function (){
            //告诉前端已经写入
            res.json({
                "result": 0
            })
        });
    })
})
//请求数据库中所有说说信息
app.get("/list", (req, res) => {
    //按照时间倒序查找排序
    Mood.find({}).sort({"time": -1}).exec((err, docs) => {
        res.json({
            "result": docs
        })
    })
})
//监听
app.listen(3000);