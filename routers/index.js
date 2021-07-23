const router = require('express').Router();
const { Users,UsersPermission } = require("../models");


router.use('/providers',require('./providers'))
router.use('/login',require('./login'))

// router.post("/Create_Admin", async (req, res) => {
//     // let idToken = req.headers.firebasetoken
//     // let decodedToken = admin.auth().verifyIdToken(idToken)
//     // let uid = (await decodedToken).uid
//     // let contact = (await decodedToken).phone_number
//     let uid = 'uid3'
//     let contact = 'contact3'
//     let user = await Users.findOne({
//         where:{
//             "Contact": contact
//         }
//     })
//     if(user){
//         console.log('Phone No. is already in use')
//         res.send({"Message":"Phone No. is already in use"});
//         return;
//     }else{
//         let req_body = {
//             'Contact': contact,
//             'UID': uid
//         }
//         let permis_req_body = {
//             'UID': uid,
//             'Permission':'admin'
//         }
//         console.log('Phone No. is now registered')
//         await Users.create(req_body)
//         await UsersPermission.create(permis_req_body)
//         res.send({"Message":"Now you are Registered as Admin"})
//         return;
//     }
// })



module.exports = router