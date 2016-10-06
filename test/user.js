/**
 * Created by Pierre on 05/10/2016.
 */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('GET /users', function(_) {
    it('should list all users on /users GET', function(done) {
    chai.request(server)
        .get('/users')
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('POST /users ', function(_) {

    it('it should NOT POST a user', function(done) {
        const user = {};
        chai.request(server)
            .post('/users')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                /*res.body.user.should.have.property('name');
                res.body.user.should.have.property('firstname');
                res.body.user.should.have.property('email');
                res.body.user.should.have.property('password');
                res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });

    it('it should NOT POST a user because a user already exist', function(done) {
        const user = {
            name: "Bob",
            firstname: "Josh",
            email: "bob.josh@aol.fr"
        };

        const an = {
            name: "Bob",
            firstname: "Josh",
            email: "bob.josh@aol.fr"
        };
        chai.request(server)
            .post('/users')
            .send(user)
            .send(an)
            .end(function(err, res) {
                /*res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.user.should.have.property('name');
                 res.body.user.should.have.property('firstname');
                 res.body.user.should.have.property('email');
                 res.body.user.should.have.property('password');
                 res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });

    it('it should POST a user', function(done) {
        const user = {
            name: "Bob",
            firstname: "Josh",
            email: "bob.josh@aol.fr"
        };

        chai.request(server)
            .post('/users')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                /*res.body.user.should.have.property('name');
                res.body.user.should.have.property('firstname');
                res.body.user.should.have.property('email');
                res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });
});