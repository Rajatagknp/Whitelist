const router = require('express').Router()
const auth_token = require('../middleware/auth_token');
const {Users,UsersPermissions,ServiceProviders} = require('../models');


router.get("/", async (req, res) => {
    let idToken = req.headers.authorization
    if(idToken){
        // let decodedToken = admin.auth().verifyIdToken(idToken)
        // let uid = (await decodedToken).uid
        let uid = idToken
        let user = await Users.findOne({
            where:{
                "uid": uid
            }
        })
        if(user){
            console.log(idToken)
            let providers = await ServiceProviders.findAll({
                attributes: ['id','service','name','pincode','contact']
            },{
                where:{
                    "Status": 'Approved'
                }
            })
            res.send(providers)
            return;
        }else{
            res.send({"message":"Sorry You are not the User"})
        }
    }else{
        let providers = await ServiceProviders.findAll({
            attributes: ['id','service','name','pincode']
        },{
            where:{
                "Status": 'Approved'
            }
        })
        res.send(providers)
        return;
    }
})

router.post("/", auth_token, async (req, res) => {
    let uid = req.uid
    let user = await UsersPermissions.findOne({
        where:{
            "uid": uid
        }
    })
    let req_body = {
        ...req.body,
        "uid":uid,
    }
    let isadmin = user.permission
    if(isadmin==='admin'){
        req_body = {
            ...req_body,
            "status":'Approved'
        }
        let save_user = await ServiceProviders.create(req_body)
        res.send(save_user)
        return;
    }
    let save_user = await ServiceProviders.create(req_body)
    res.send(save_user)
})

router.put("/",auth_token, async (req, res) => {
    let provider_id = req.query.provider_id
    let uid = req.uid
    let provider = await ServiceProviders.update({
        ...req.body
    },{
        where:{
            "id": provider_id,
            "uid": uid
        }
    })
    if(!provider[0]){
        res.send({"message":"Provider is Not Avilable"})
        return;
    }else{
        res.send(provider)
        return;
    }
})

router.delete("/",auth_token, async (req, res) => {
    let provider_id = req.query.provider_id
    let uid = req.uid
    let provider = await ServiceProviders.destroy({
        where:{
            "id": provider_id,
            "uid": uid
        }
    })
    if(!provider){
        res.send({"message":"Provider is Not Avilable"})
        return;
    }else{
        res.send({"message":"Deleted"})
        return;
    }
})

router.get("/pending",auth_token, async (req, res) => {
    let uid = req.uid
    let user = await UsersPermissions.findOne({
        where:{
            "uid": uid
        }
    })
    let isadmin = user.permission
    if(isadmin==='admin'){
        let providers = await ServiceProviders.findAll({
            where:{
                "status": 'Pending'
            }
        })
        res.send(providers)
        return;
    }
    res.send({"message":"You are not allowed, Only for Admin"})
})

router.put("/change_status",auth_token, async (req, res) => {
    let provider_id = req.query.provider_id
    let uid = req.uid
    let user = await UsersPermissions.findOne({
        where:{
            "uid": uid
        }
    })
    let isadmin = user.permission
    if(isadmin==='admin'){
        let provider = await ServiceProviders.update({
            ...req.body
        },{
            where:{
                'id': provider_id,
            }
        })
        if(!provider[0]){
            res.send({"message":"Provider is Not Avilable"})
            return;
        }else{
            res.send({"message":"Updated"})
            return;
        }
    }
    res.send({"Message":"You are not allowed, Only for Admin"})
})

router.get("/status",auth_token, async (req, res) => {
    let uid = req.uid
    let providers = await ServiceProviders.findAll({
        where:{
            "uid": uid
        }
    })
    res.send(providers)
})

module.exports = router