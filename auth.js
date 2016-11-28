/**
 * Created by abhinavnathgupta on 14/11/16.
 */
var jwt = require('jwt-simple');
var config = require('./DataConfig');
var auth = {
    login: function (username, password) {
        if (username == 'admin@admin.com' && password == 'admin') {
            return false;
        }
        else {
            return true;
        }
    },
    genToken: function (secret) {
        var dateObj = new Date();
        var expires = dateObj.setDate(dateObj.getSeconds() + config.timeout);
        var token = jwt.encode({
            exp: expires
        }, secret);
        return {
            session: token,
            expires: expires,
        };
    }
};
module.exports = auth;