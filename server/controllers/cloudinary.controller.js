import { v2 as cloudinary } from 'cloudinary' ;

const uploadFile = async(req, res, nxt) => {
    try {
        const { url } = await cloudinary.uploader.upload(req.file.path, { folder: `chatter/${req.userID}` });
        console.log(`1 image uploaded`);

        return res.json({ url });
    } catch (err) {
        nxt(err)
    }
}

const uploadMultiple = async(req, res, nxt) => {
    try {
        let urls = [];

        for (let file of req.files) {
            const { url } = await cloudinary.uploader.upload(file.path, { folder: `chatter/${req.userID}` });
            urls.push(url)
            }
        console.log(`${req.files.length} images uploaded`);

        return res.json({ urls })
    } catch (err) {
        nxt(err)
    }
}

export {
    uploadFile,
    uploadMultiple
}