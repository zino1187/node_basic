var url= require("url");
var qs = require("querystring");
var http=require("http");

var server = http.createServer(function(request, response){
    
    //전체 경로 중, 쿼리string은 경로에서 제외시킨 값 구하기
    var uri = url.parse(request.url).pathname;
    
    switch(uri){
        case "/member/regist":insert(request, response);break;
        case "/member/update":edit(request, response);break;
        case "/member/delete":del(request, response);break;
        case "/member/list":getList(request, response);break;
        case "/member/detail":getDetail(request, response);break;
    }
});

//post 파라미터 받기
function insert(request, response){
    var postData="";
    
    //data 는 버퍼를 이용하기 때문에, 쌓아놓아야 한다.
    request.on("data", function(param){
        postData += param;
    });
    request.on("end", function(){    
        console.log(qs.parse(postData));
    });
}

//get 파라미터 받기
function getDetail(request, response){
    console.log("상세보기 요청 detail");
    var jsonParam = url.parse(request.url, true).query;
    console.log(jsonParam.name, jsonParam.pass);
    response.end("detail finished");
}

server.listen(8888, function(){
    console.log("Server is running at 8888 port...");
});