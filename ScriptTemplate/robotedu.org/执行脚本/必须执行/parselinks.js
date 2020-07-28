function get_all_linkes() {
    var domain = document.domain;
    var ddd = domain.split(".");
    mylog.log(ddd.length + "");
    var myTopDomain = "";
    let arrNew = new Array()
    if(ddd.length>2){         
        for (let i = 1; i < ddd.length; i++) {
            arrNew.push(ddd[i]);
        }
        myTopDomain = arrNew.join('.');
        //alert(myTopDomain);
        mylog.log("myTopDomain=" + myTopDomain);
    }
    let imgs = document.getElementsByTagName('a');
    for (let i = 0; i < imgs.length; i++) {
        var temphref = imgs[i].href;
        if(temphref.indexOf(myTopDomain) != -1) {
            mylink.Add(temphref);
        }
        else {
            //mylog.log("丢弃！temphref=" + temphref);
        }
    }
    return "ok";
}
get_all_linkes();