const dataURL = (img) => {
	let canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	let ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
	let dataURL = canvas.toDataURL("image/jpeg");
	return dataURL;
}

export default (src) => {
    let image = new Image();
    //解决canvas无法读取画布问题 
    image.setAttribute('crossOrigin', 'Anonymous');
    image.src = src;
    //通加载图片完毕保证快速读取
    return new Promise((resolve, reject) => {
        image.onload = () => {
            let base64 = dataURL(image);
            resolve(base64)
        }
        image.onerror = () => {
            reject()
            this.$message.error('提取失败')
        }
    })
}