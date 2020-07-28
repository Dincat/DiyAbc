function get_all_linkes() {
    var domain = document.domain;
    var ddd = domain.split(".");
    mylog.log(ddd.length + "");
    var myTopDomain = "";
    let arrNew = new Array()
    if(ddd.length>2){
         mylog.log("222");
        for (let i = 1; i < ddd.length; i++) {
            arrNew.push(ddd[i]);
        }
        myTopDomain = arrNew.join('.');
        //alert(myTopDomain);

    }



    let imgs = document.getElementsByTagName('a');
   // let imgsUrl = [];
    //alert(imgs.length);
    for (let i = 0; i < imgs.length; i++) {
        //imgsUrl.push(imgs[i].href);
        var temphref = imgs[i].href;
        if(temphref.indexOf(myTopDomain) != -1) {
            mylink.Add(temphref);
        }
        else {
            //mylog.log("丢弃！temphref=" + temphref);
        }
    }

    //const lsit = Array.from(document.querySelectorAll('img[src]')).map(item=>item.getAttribute('src'))
    //mylog.log(JSON.stringify(imgsUrl));
    //alert(JSON.stringify(imgsUrl));

   // var rttext = mylinks2.MyExcute("getalllinks", imgsUrl.toJSONString());//获取的是绝对路径 
   //// var json = JSON.parse(rttext); // 将字符串转换为JSON对象
   // return rttext;
}
get_all_linkes();