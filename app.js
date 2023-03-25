const posts = [];
const express = require('express');
const bodyparser = require('body-parser');
const ejs  = require('ejs');


const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.use(express.static("public"));


const homeContent= "the wisnter of our discontent Made glorious summer by this sun of York And all the clouds that lourd upon our house In the deep bosom of the ocean buried Now are our brows bounds with victorious wreaths.";

const aboutContent = "Our stern alarums changed to merry meetings Our dreadful marches to delightful measures Grim-visaged war hath smoothd his wrinkled front And now, instead of mounting barded steeds."

const contactContent = "To fright the souls of fearful adversaries He capers nimbly in a lady chamberTo the lascivious pleasing of a lute. But i that am not shaped for sportive tricks, Nor made to court an amorous looking-glass";
 

// passing content from server(app.js) to home.ejs(or template)
app.get('/' , function(req,res){
res.render('home' , {varr1 : homeContent ,/*key(from template) : value(from app.js)*/
                     posts : posts 
                    
                    });
});

app.get('/about' , function(req,res){
    res.render('about' , {varr2 : aboutContent});
});

app.get('/contact' , function(req,res){
    res.render('contact' , {varr4 : contactContent});
});

app.get('/compose' , function(req,res){
    res.render('compose');
});



app.post('/compose' , function(req,res){
 // made js oject using syntax->
/*
 var object = {
    key : value;
    key :{
        key : value ,
        key : value
    }
 }*/
    
  const post = {
    title :  req.body.posttitle,
    content :  req.body.postbody
  };
     
   //console.log(req.body.postbody);
 //  console.log(post);
   posts.push(post);

   res.redirect('/');
});

 const _ = require('lodash');
 
  app.get('/posts/:posttitle' , (req,res)=>{
 
    var s = _.lowerCase(req.params.posttitle);
   
    for(let i = 0 ; i < posts.length ; i++){
        var p = _.lowerCase(posts[i].title);
        if(s === p){
            // console.log('Match Found!!');
            res.render('posts' , {titlep : posts[i].title , contp : posts[i].content});
            break;
        }
    }  
});




app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000");
});