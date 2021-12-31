var fs = require("fs");

let langArr=['en','zh','jp','fr','de','sp','it']

let keyArr=[]

langArr.forEach((n)=>{
    let url='./assets/'+n+'.txt'
    fs.readFile(url, function (err, data) {
        if (err) {
           return console.error(err);
        }
        let arr=data.toString().split('\r\n')
        console.log(n)
        console.log(arr)
        console.log(arr.length)
        let o={}
        arr.forEach((n,index)=>{
           o[index]=n
        })
        let Wurl='./assets/i18n/'+n+'.json'
        let WriteStr=JSON.stringify(o,null,'\t')
        fs.writeFile(Wurl,WriteStr,
         function(err){
            if (err) {
               return console.error(err);
            }
            console.log('写入成功',n)
         }  
         )
        
        // console.log("Asynchronous read: " + data.toString().split('\n'));
     });
})
// i18n


 
 
//  fs.readFile('input.json', function (err, data) {
//     if (err) {
//        return console.error(err);
//     }
//     console.log("Asynchronous read: " + data.toString());
//  });
