const express = require('express');
const router = express.Router();
const News = require('../models/news.js');

router.all('*', (req, res, next)=>{
  if(!req.session.admin){
    res.redirect('login')
  }
  next()
})

/* GET home page. */
router.get('/', (req, res) => {
  News.find({}, (err, data)=>{
    res.render('admin/index', {title: 'Admin', data})
  });
});

router.get('/news/add', (req, res)=>{
  res.render('admin/newsform', { title: 'Dodaj news', errors: {}, body: {} });

})

router.post('/news/add', (req, res)=>{
  const body = req.body;

  const newData = new News(body);
  const errors = newData.validateSync();

  console.log(errors)
  newData.save((err)=>{
    if(err)  {res.render('admin/newsform', {title: "Dodaj news", errors, body}); return;}
    else res.redirect('/admin')
  })

})

router.get('/news/delete/:id', (req, res)=>{
  News.findByIdAndDelete(req.params.id, (err)=>{
    res.redirect('/admin')
  })


})

module.exports = router;
