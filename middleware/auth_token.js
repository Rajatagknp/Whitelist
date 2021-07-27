const admin = require('firebase-admin');

const auth_token = (req, res, next) => {
    let idToken = req.headers.authorization
    console.log(123)
    if(idToken){
        admin.auth().verifyIdToken(idToken).then((decodedToken) => {
            req.authtoken = 'decodedToken';
            req.uid = 'decodedToken.uid';
            req.contact = 'decodedToken.phone_number';
            next();
        })
        .catch((error) => {
            // res.send(error.message)
        })
        req.authtoken = 'decodedToken';
        req.uid = idToken;
        req.contact = idToken;
        next();
    }else{
        res.send({"Message":"Please pass header"})
    }
}

module.exports = auth_token