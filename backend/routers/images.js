const express = require('express');
const cors = require('cors');
const router = express.Router();
const { uploadFromBuffer, removeImages } = require("../modules/images")

router.options('*', cors());
router.use((req, res, next) => {
    next();
});

//shows product with the matching id
router.post("/upload/:imageData", async (req, res) => {

    const { imageData } = req.files.file.data
    const uploadResponse = await uploadFromBuffer(imageData);
    res.send(uploadResponse)
})
//removes image with given url
router.post("/remove/:imageURL", async (req, res) => {
    const { imageURL } = req.params
    const removeResponse = await removeImages([imageURL], "default")
    res.status(200).send({ success: true, msg: "removed file from server", body: removeResponse })
})

module.exports = router;
