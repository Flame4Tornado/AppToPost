const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
    const search = req.query.search || '';

    const data = News
    .find({title: new RegExp(search.trim(), 'i')})
    .sort({created: -1});
    data.exec((err, dataAc)=>{
        res.render('news', {title: 'News', dataAc, search })
    })
});



module.exports = router;
