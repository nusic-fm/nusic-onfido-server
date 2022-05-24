exports = module.exports = function (app) {

    console.log("process.env.name === ", process.env.name);
    console.log("process.env.NODE_ENV === ", process.env.NODE_ENV);
    console.log("process.env.mongodburl === ", process.env.mongodburl);
    console.log("process.env.ONFIDO_API_TOKEN === ", process.env.ONFIDO_API_TOKEN);

    if (process.env.NODE_ENV == 'production') {
        
        app.set("crosDomains", process.env.crosDomains || 'http://localhost:3000');
        app.set("jwtsalt", process.env.jwtsalt| "somemagicalwords");
        app.set("ONFIDO_API_TOKEN", process.env.ONFIDO_API_TOKEN || 'api_sandbox.J_lUx0wY7TW.8RdDbggIvDme4P5xMFVXZrB7axeTvMGi');
    }
    else {
        app.set("crosDomains", process.env.crosDomains || 'http://localhost:3000');
        app.set("jwtsalt", "somemagicalwords");
        app.set("ONFIDO_API_TOKEN", process.env.ONFIDO_API_TOKEN || 'api_sandbox.J_lUx0wY7TW.8RdDbggIvDme4P5xMFVXZrB7axeTvMGi');
    }   
}
