function get_$fild_value() {
    var alink = location.href;
    var matchReg1 = /$reg/;
    var t1 = alink.match(matchReg1);

    if (t1 instanceof Array) {
        if (t1.length > 0) {
            return t1[0];
        }
    }

    return t1;
}