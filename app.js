var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : "",
  user  : "",
  database : "",
  password : ""
});

var app = express();

// ejs는 기본적으로 views폴더를 찾으므로 로컬변경시 set를 사용해야함
//app.set("views", "./");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'/public')));

var index = "first_index";
var data = {count:0};

// ===============================================================
app.get("/", function (req,res) {

  pool.getConnection(function(err, conn){
    conn.query("select * from login", function(err, rows){
      if(err){ console.error("err : " + err); }
      console.log("rows : " + JSON.stringify(rows));
      conn.release(); // 풀로 되돌려야줘야한다.
      data.rows = rows;
      data.count++;
      res.render(index, data);
    });
  });
});




app.get("/reset", function (req,res) {
  data.count = 0;
  res.render(index,data);
});



app.get("/set/count", function (req,res) {
  if(req.query.count){ data.count = req.query.count; }
  res.render(index,data);
});



// :num같이 가변적으로 해도 query도 같이 받는다
app.get("/set/:num", function (req,res) {
  console.log(req.params.num);
  console.log(req.query.dd);
  data.count = req.params.num;
  res.render(index,data);
});


app.listen(3000, function(){ console.log("Server On!");});
