const router = require('express').Router();
const auth_token = require('../middleware/auth_token');
const db = require('../models')

router.post('/',auth_token,async (req,res) => {
    let user_table = {
        'uid':req.uid,
        'contact':req.contact,
    }
    let user_table_per = {
        'user_uid':user_table.uid,
    }
    let user = await  db.users.findOne({
        where:{
            'uid':user_table.uid,
        }
    })
    if(user){
        res.send({'message':'login'})
    }else{
        await db.users.create(user_table)
        await db.user_permissions.create(user_table_per)
        res.send({'message':'created'})
    }
})


module.exports = router