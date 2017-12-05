var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.render('wishList',{
        wishts:[{
            name:'mobil',
            fullfilled:true
        },{
            name:'motor',
            fullfilled:false
        },{
            name:'becak',
            fullfilled:true
        }],
        pageTitle:'ADD WHISTLIST'
    })
})
router.post('/',function(req,res) {
    res.send()
})
router.get('/add',function(req,res) {
    res.render('wishtForm',{
        wisht:{
            name:'Mobil'
        },
        pageTitle:'Wisht Add'
    })
})

module.exports=router