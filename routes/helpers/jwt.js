exports = module.exports = function(app, mongoose) {

    app.jwt = {};
    var jwt = require('jsonwebtoken');
   
    app.jwt.createJWTTokenWithObject = function(jwtKeyValueObject){
        console.log("Test jwt ",jwtKeyValueObject);
        let jwtToken = jwt.sign(jwtKeyValueObject, app.get('jwtsalt'));
        return jwtToken;
    }
    
    app.jwt.createJWTToken = function(valueToBeUsedInJWT){
        let jwtToken = jwt.sign({
            key: valueToBeUsedInJWT
        }, app.get('jwtsalt'));
        return jwtToken;
    }

    app.jwt.verifyToken = function(token){
        return jwt.verify(token, app.get("jwtsalt"));
    }
}