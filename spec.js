/**
 * Created by abhinavnathgupta on 21/11/16.
 */
var request = require('supertest');
describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./app');
    });
    afterEach(function () {
        server.close();
    });
    it('responds to ping', function testSlash() {
        request(server)
            .get('/api/ping')
            .expect({status:1,message:"ok"});
    });
});