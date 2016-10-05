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

describe('Users', function(_){
    it('should list all users on /users GET');
});