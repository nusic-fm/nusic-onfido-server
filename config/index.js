exports = module.exports = function (app) {

    console.log("process.env.name === ", process.env.name);
    console.log("process.env.NODE_ENV === ", process.env.NODE_ENV);
    console.log("process.env.mongodburl === ", process.env.mongodburl);
    console.log("process.env.ONFIDO_API_TOKEN === ", process.env.ONFIDO_API_TOKEN);

    if (process.env.NODE_ENV == 'production') {
        app.set("mongodb-url", process.env.mongodburl);
        app.set("crosDomains", process.env.crosDomains || 'http://localhost:3000');
        app.set("jwtsalt", process.env.jwtsalt| "somemagicalwords");
        app.set("cloud_name", process.env.cloud_name || 'dgtzrxfyd');
        app.set("api_key", process.env.api_key || '893115935379578');
        app.set("api_secret", process.env.api_secret || 'lWY5FkcFfahA-oaU8KFwD2buQDY');
        app.set("ONFIDO_API_TOKEN", process.env.ONFIDO_API_TOKEN || 'api_sandbox.J_lUx0wY7TW.8RdDbggIvDme4P5xMFVXZrB7axeTvMGi');

    }
    else {
        app.set("mongodb-url", "mongodb+srv://devuser:demomyride@cluster0.as3vk.mongodb.net/myride?retryWrites=true&w=majority"); 
        app.set("crosDomains", process.env.crosDomains || 'http://localhost:3000');
        app.set("jwtsalt", "somemagicalwords");
        app.set("cloud_name", process.env.cloud_name || 'zeeshanshanif');
        app.set("api_key", process.env.api_key || '559961586433129');
        app.set("api_secret", process.env.api_secret || '4nlL1iLNHAugCRHo5dUGexUuc9M');
        app.set("ONFIDO_API_TOKEN", process.env.ONFIDO_API_TOKEN || 'api_sandbox.J_lUx0wY7TW.8RdDbggIvDme4P5xMFVXZrB7axeTvMGi');
    }   
}
