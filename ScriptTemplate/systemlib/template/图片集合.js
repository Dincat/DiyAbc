function get_$fild_value() {
    var imgs = document.querySelectorAll("$xpath");
    if (imgs == null) return "";
    var imgsArray = [];
    imgs.forEach(function (img) {
        var src = img.src;
        var md5 = mycmds.md5(src);
        var dir = "temp\\images";
        img.src = mycmds.UploadImage(src, dir, md5 + ".png");
        imgsArray.push(img.src);
    });
    return JSON.stringify(imgsArray);
}