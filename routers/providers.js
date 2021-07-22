const router = require('express').Router()

const {Users,UsersPermission,ServiceProviders} = require('../models');

router.get("/", async (req, res) => {
    let providers = await ServiceProviders.findAll({
        where:{
            "Status": 'Approved'
        }
    })
    res.send(providers)
})

router.post("/", async (req, res) => {
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    let uid = 'uid2'
    let user = await UsersPermission.findOne({
        where:{
            "UID": uid
        }
    })
    let req_body = {
        ...req.body,
        "UID":uid,
    }
    let isadmin = user.Permission
    if(isadmin==='admin'){
        req_body = {
            ...req_body,
            "Status":'Approved'
        }
        let save_user = await ServiceProviders.create(req_body)
        res.send(save_user)
        return;
    }
    let save_user = await ServiceProviders.create(req_body)
    res.send(save_user)
})

router.put("/", async (req, res) => {
    let provider_id = req.query.provider_id
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    let uid = 'uid'
    let provider = await ServiceProviders.update({
        ...req.body
    },{
        where:{
            id: provider_id,
            UID: uid
        }
    })
    if(!provider[0]){
        res.send({"Message":"Provider is Not Avilable"})
        return;
    }else{
        res.send({"Message":"Updated"})
        return;
    }
})

router.delete("/", async (req, res) => {
    let provider_id = req.query.provider_id
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    let uid = 'uid2'
    let provider = await ServiceProviders.destroy({
        where:{
            id: provider_id,
            UID: uid
        }
    })
    if(!provider){
        res.send({"Message":"Provider is Not Avilable"})
        return;
    }else{
        res.send({"Message":"Deleted"})
        return;
    }
})

router.get("/pending", async (req, res) => {
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    let uid = 'uid2'
    let user = await UsersPermission.findOne({
        where:{
            "UID": uid
        }
    })
    let isadmin = user.Permission
    if(isadmin==='admin'){
        let providers = await ServiceProviders.findAll({
            where:{
                "Status": 'Pending'
            }
        })
        res.send(providers)
        return;
    }
    res.send({"Message":"You are not allowed, Only for Admin"})
})

router.put("/change_status", async (req, res) => {
    let provider_id = req.query.provider_id
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    let uid = 'uid2'
    let user = await UsersPermission.findOne({
        where:{
            "UID": uid
        }
    })
    let isadmin = user.Permission
    if(isadmin==='admin'){
        let provider = await ServiceProviders.update({
            ...req.body
        },{
            where:{
                'id': provider_id,
            }
        })
        if(!provider[0]){
            res.send({"Message":"Provider is Not Avilable"})
            return;
        }else{
            res.send({"Message":"Updated"})
            return;
        }
    }
    res.send({"Message":"You are not allowed, Only for Admin"})
})

router.get("/status", async (req, res) => {
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    let uid = 'uid2'
    let providers = await ServiceProviders.findAll({
        where:{
            "UID": uid
        }
    })
    res.send(providers)
})

module.exports = router