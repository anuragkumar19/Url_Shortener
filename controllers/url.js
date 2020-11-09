const validUrl = require('valid-url');
const Url = require('../models/Url');

module.exports = async (req, res) => {
    let url = req.body.url;

    if (typeof url == 'string') {
        url = url.trim();

        if (!url) {
            res.status(401).json({
                message: 'Url Cannot be Empty!',
            });
        } else if (!validUrl.isUri(url)) {
            res.status(401).json({
                message: 'Url Not Valid.',
            });
        } else {
            try {
                let urlDoc = await Url.findOne({
                    longUrl: url,
                }).lean();

                if (urlDoc) {
                    urlDoc.shortUrl = process.env.URL_HOST + urlDoc.urlCode;
                    res.status(200).json(urlDoc);
                } else {
                    let newurlDoc = new Url({
                        longUrl: url,
                    });

                    await newurlDoc.save();

                    urlDoc = await Url.findOne({
                        longUrl: url,
                    }).lean();

                    urlDoc.shortUrl = process.env.URL_HOST + urlDoc.urlCode;
                    res.status(200).json(urlDoc);
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: err.message,
                });
            }
        }
    } else {
        res.status(401).json({
            message: 'Url badly Formatted',
        });
    }
};
