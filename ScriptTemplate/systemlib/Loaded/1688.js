function getMemberId(data) {
    if (!data) {
        return "";
    }

    var items = data.split('^');

    if (items.length < 1) {
        return '';
    }


    for (var i = 0; i < items.length; i++) {
        var str = items[i];

        if (str.indexOf('object_member_id@') > -1) {
            return str.split('@')[1];
        }
        
    }

    return "";
}


function get_all_linkes() {
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
        //alert(myTopDomain);
        mylog.log("myTopDomain=" + myTopDomain);
    }

    if (!myTopDomain) {
        //alert(myTopDomain + "   !!!");
        mylog.log("错误的域名");
        return [];
    }

    let items = document.getElementsByClassName('card-container');
    mylog.log("商品数:" + items.length);

    var links = [];

    for (let i = 0; i < items.length; i++) {

        var data = items[i].getAttribute('data-aplus-report');
        //mylog.log("商品data:" + data);
        var memberId = getMemberId(data);
        //mylog.log("memberId:" + memberId);
        if (!memberId) {
            continue;
        }

        var link = 'https://corp.1688.com/page/index.htm?memberId=' + memberId+'&fromSite=company_site&tab=companyWeb_contact';
        links.push(link);
        //mylink.Add(link);
       // mylog.log("add:" + link);
    }

    var json = JSON.stringify(links);
    //mylog.log("json:" + json);
    return json;
}
get_all_linkes();