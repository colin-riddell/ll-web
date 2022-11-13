function (user, context, callback) {
    const NAMESPACE = "http://thecodercareer.com";
const count = context.stats && context.stats.loginsCount ? context.stats.loginsCount : 0;


if (count > 1) {
    context.idToken[`${NAMESPACE}/roles`] = user.roles;
    context.accessToken[`${NAMESPACE}/roles`] = user.roles;
    context.authorization.roles = user.roles;
    return callback(null, user, context);
}

const ManagementClient = require('auth0@2.27.0').ManagementClient;
const management = new ManagementClient({
  token: auth0.accessToken,
  domain: auth0.domain
});
let roles = [context.request.query.role];
const params =  { id : user.user_id};
const data = { "roles" : roles};

//new
context.idToken[`${NAMESPACE}/roles`] = roles;
context.accessToken[`${NAMESPACE}/roles`] = roles;
context.authorization.roles = roles;
//new
management.users.assignRoles(params, data, function (err, user) {
if (err) {
    // Handle error.
    console.log(err);
 }
callback(null, user, context);
});


// new sstuff
user.app_metadata = user.app_metadata || {};
// update the app_metadata that will be part of the response
user.app_metadata.roles = user.app_metadata.roles || [];
user.app_metadata.roles.push(roles[0]);

// persist the app_metadata update
auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
.then(function(){
  callback(null, user, context);
})
.catch(function(err){
  callback(err);
});

}