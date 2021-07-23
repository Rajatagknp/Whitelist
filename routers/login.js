const router = require('express').Router();
const auth_token = require('../middleware/auth_token');
const { Users,UsersPermissions } = require("../models");


router.post("/",auth_token, async (req, res) => {
    let uid = req.uid
    let contact = req.contact
    let req_body = {
        "contact": contact,
        "uid": uid
    }
    let per_req_body = {
        'uid': uid
    }
    let user = await Users.findOne({
        where:{
            "uid": uid
        }
    })
    if(user){
        console.log('Phone No. is already in use')
        res.send({"message":"Phone No. is already in use"});
        return;
    }else{
        await UsersPermissions.create(per_req_body)
        await Users.create(req_body)
        console.log('Phone No. is now registered')
        res.send({"Message":"Now you are Registered"})
        return;
    }
})

module.exports = router