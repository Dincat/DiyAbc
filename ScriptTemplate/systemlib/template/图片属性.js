function get_$fild_value() {
    var img = document.querySelector("$xpath");
    if (img == null) return "";
    var aPath = "data-echo";
    var src = img.getAttribute(aPath);
    var md5 = mycmds.md5(src);
    var dir = "temp\\images";
    img.src = mycmds.UploadImage(src, dir, md5 + ".png");
    img.removeAttribute(aPath);
    return img.src;
}