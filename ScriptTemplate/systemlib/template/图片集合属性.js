function get_$fild_value() {
    var imgs = document.querySelectorAll("$xpath");
    if (imgs == null) return "";
    var imgsArray = [];
    imgs.forEach(function (img) {
        var aPath = "data-echo";
        var src = img.getAttribute(aPath);
        var md5 = mycmds.md5(src);
        var dir = "temp\\images";
        img.src = mycmds.UploadImage(src, dir, md5 + ".png");
        imgsArray.push(img.src);
        img.removeAttribute(aPath);
    });
    return JSON.stringify(imgsArray);
}