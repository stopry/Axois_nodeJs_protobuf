const express = require('express');

const app = express();

const protoRoot = require('./proto/proto');

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

let PBMessageResponse = protoRoot.lookup('framework.PBMessageResponse');

let PBStudent = protoRoot.lookup('school.PBStudent');//学生对象
let studentObj = {
    studentId:13,
    user:{
        userId:14,
        name:'小明',
        mobile:'13855662323',
    },
    class:{
        classId: 10086,
        name:'三年级',
    },
    degree:1
};
let PBStudentRes = PBStudent.encode(studentObj).finish();

let resData = {
    type:0,
    messageData:PBStudentRes,
    resultCode: 0,
    resultInfo: '2'
};
let ret = PBMessageResponse.create(resData);
let responseData =  PBMessageResponse.encode(ret).finish();

app.post('/api',function(req,res){
    res.writeHead(200, {"Content-Type": "application/x-protobuf"});
    res.end(JSON.stringify(responseData));//nodejs buffer转化为字符串发送给前端。
});

app.get('/cocostest',function(req,res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
        success:'true',
        msg:'请求成功',
        code:0,
        data:{
            name:"种地",
            age:19,
            desc:'专业种地大汉'
        }
    }));//返回json 测试接口
});

app.post('/getUserInfo',function(req,res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
        success:'true',
        msg:'请求成功',
        code:0,
        data:{
            isFirst:1,
            avatar:2,
            money:1000,
            rice:200,
            level:100,
            name:'王小明'
        }
    }));//返回json 测试接口
});

const server = app.listen(8081,function(){

});