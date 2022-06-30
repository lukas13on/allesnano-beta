const compress_images = require('compress-images');
const dir = "public/static/img/";

function minifyImg() {
    compress_images(
        "public/static/assets/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,svg,SVG}",
        dir,
        { compress_force: false, statistic: false, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: false } },
        { png: { engine: "pngquant", command: false } },
        { svg: { engine: "svgo", command: false } },
        { gif: { engine: false, command: false } },
        function (err) {
            console.log(err);
        }
    );
}

minifyImg();