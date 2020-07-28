function get_$fild_value() {
    var img = document.querySelector("$xpath");
    if (img == null) return "";
    var md5 = mycmds.md5(img.src);
    var dir = "temp\\images";
    img.src = mycmds.UploadImage(img.src, dir, md5 + ".png");
    return img.src;
}