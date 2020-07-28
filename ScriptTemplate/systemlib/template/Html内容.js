function get_$fild_value() {
    var ele = document.querySelector("$xpath");
    if (ele == null) return "";

    var imgs = ele.querySelectorAll("img");
    if (imgs == null) return "";
    var dir = "temp\\images";
    imgs.forEach(function (img) {
        var md5 = mycmds.md5(img.src);
        img.src = mycmds.UploadImage(img.src, dir, md5 + ".png");
    });

    var eles = ele.querySelectorAll(':not([style=""])');
    if (eles == null) return "";
    eles.forEach(function (ele) {
        ele.style = null;
    });


    var alinks = ele.querySelectorAll('a');
    if (alinks == null) return "";

    alinks.forEach(function (a) {
        a.removeAttribute("href");
    });
    
    var html = ele.outerHTML;
    return html;
}