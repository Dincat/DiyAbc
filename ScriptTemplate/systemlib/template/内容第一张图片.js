function get_$fild_value() {
    var ele = document.querySelector("$xpath");
    if (ele == null) return "";

    var imgs = ele.querySelectorAll("img");
    if (imgs == null) return "";

    var dir = "temp\\images";
    var img = imgs[0];//取第一张图片
    if (!img)
        return "";
    var md5 = mycmds.md5(img.src);
    img.src = mycmds.UploadImage(img.src, dir, md5 + ".png");

    return img.src;
}