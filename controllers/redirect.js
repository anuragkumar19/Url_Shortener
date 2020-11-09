const Url = require('../models/Url');

module.exports = async (req, res) => {
    const id = req.params.id;

    const urlDoc = await Url.findOne({
        urlCode: id,
    });

    if (urlDoc) {
        res.redirect(urlDoc.longUrl);
    } else {
        res.status(404).json({
            message: 'Not Found',
        });
    }
};
