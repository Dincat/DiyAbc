function get_$fild_value() {
    var domain = document.domain;
    var ddd = domain.split(".");
    mylog.log(ddd.length + "");
    var myTopDomain = "";
    let arrNew = new Array()
    if (ddd.length > 2) {
        for (let i = 1; i < ddd.length; i++) {
            arrNew.push(ddd[i]);
        }
        myTopDomain = arrNew.join('.');
    }
    return myTopDomain;
}