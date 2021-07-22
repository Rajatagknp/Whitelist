const router = require('express').Router();

const admin = require('firebase-admin');
const { Users,UsersPermission } = require("../models");

router.post("/", async (req, res) => {
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    // let contact = (await decodedToken).phone_number
    let uid = 'uid'
    let contact = 'contact'
    let user = await Users.findOne({
        where:{
            UID: uid
        }
    })
    if(user){
        console.log('Phone No. is already in use')
        res.send({"Message":"Phone No. is already in use"});
        return;
    }else{
        let req_body = {
            'Contact': contact,
            'UID': uid
        }
        let permis_req_body = {
            'UID': uid
        }
        console.log('Phone No. is now registered')
        await Users.create(req_body)
        await UsersPermission.create(permis_req_body)
        res.send({"Message":"Now you are Registered"})
        return;
    }
})


router.post("/asAdmin", async (req, res) => {
    // let idToken = req.headers.firebasetoken
    // let decodedToken = admin.auth().verifyIdToken(idToken)
    // let uid = (await decodedToken).uid
    // let contact = (await decodedToken).phone_number
    let uid = 'uid2'
    let contact = 'contact2'
    let user = await UsersPermission.findOne({
        where:{
            UID: uid
        }
    })
    if(user){
        console.log('Phone No. is already in use')
        res.send({"Message":"Phone No. is already in use"});
        return;
    }else{
        let req_body = {
            'Contact': contact,
            'UID': uid
        }
        let permis_req_body = {
            'UID': uid,
            'Permission':'admin'
        }
        console.log('Phone No. is now registered')
        await Users.create(req_body)
        await UsersPermission.create(permis_req_body)
        res.send({"Message":"Now you are Registered as Admin"})
        return;
    }
})

module.exports = router