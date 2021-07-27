const router = require('express').Router()
const auth_token = require('../middleware/auth_token');

const db = require('../models')

router.get("/", async (req, res) => {
    let idToken = req.headers.authorization
    if(idToken){
        // let decodedToken = admin.auth().verifyIdToken(idToken)
        // let uid = (await decodedToken).uid
        let user = await db.users.findOne({
            where:{
                "uid": idToken
            }
        })
        if(user){
            let providers = await db.service_providers.findAll({
                where:{'status':'approved'},
                attributes: ['id','service_type','name','pincode','contact']
            })
            console.log(providers)
            res.send(providers)
        }else{
            let providers = await db.service_providers.findAll({
                where:{'status':'approved'},
                attributes: ['id','service_type','name','pincode']
            })
            res.send(providers)
        }
    }else{
        let providers = await db.service_providers.findAll({
            where:{'status':'approved'},
            attributes: ['id','service_type','name','pincode']
        })
        res.send(providers)
    }
})

router.post("/", auth_token, async (req, res) => {
    let uid = req.uid
    let user = await db.user_permissions.findOne({
        where:{
            "user_uid": uid
        }
    })
    let req_body = {
        ...req.body,
        "user_uid":uid,
    }
    let sysadmin = (user.permission_role==='admin')
    if(sysadmin){
        req_body = {
            ...req_body,
            "status":'approved'
        }
    }
    let save_user = await db.service_providers.create(req_body)
    res.send(save_user)
})

router.put("/",auth_token, async (req, res) => {
    let provider_id = req.query.provider_id
    let uid = req.uid
    let provider = await db.service_providers.update({
        ...req.body
    },{
        where:{
            "id": provider_id,
            "user_uid": uid
        }
    })
    console.log(provider)
    if(!provider[0]){
        res.send({"message":"Provider is Not Available"})
    }else{
        res.send(provider)
    }
})

router.delete("/",auth_token, async (req, res) => {
    let provider_id = req.query.provider_id
    let uid = req.uid
    let provider = await db.service_providers.destroy({
        where:{
            "id": provider_id,
            "user_uid": uid
        }
    })
    if(!provider){
        res.send({"message":"Provider is Not Available"})
    }else{
        res.send({"message":"Deleted"})
    }
})

router.get("/pending",auth_token, async (req, res) => {
    let uid = req.uid
    let user = await db.user_permissions.findOne({
        where:{
            "user_uid": uid
        }
    })
    let sysadmin = (user.permission==='admin')
    if(sysadmin){
        let providers = await db.service_providers.findAll({
            where:{
                "status": 'pending'
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
    let user = await db.user_permissions.findOne({
        where:{
            "user_uid": uid
        }
    })
    let sysadmin = user.permission
    if(sysadmin==='admin'){
        let provider = await db.service_providers.update({
            ...req.body
        },{
            where:{
                'id': provider_id,
            }
        })
        if(!provider[0]){
            res.send({"message":"Provider is Not Available"})
            return;
        }else{
            res.send({"message":"Updated"})
            return;
        }
    }
    res.send({"message":"You are not allowed, Only for Admin"})
})

router.get("/status",auth_token, async (req, res) => {
    let uid = req.uid
    let providers = await db.service_providers.findAll({
        where:{
            "user_uid": uid
        },
        attributes: ['id','service_type','name','pincode','contact']
    })
    res.send(providers)
})

module.exports = router