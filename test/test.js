// Endpoint testing with mocha and chai and chai-http

// Import libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
var mongoose = require("mongoose");

// Import server
var server = require('../app');

// Import Todo Model
var user = require("../Models/user");
var userPost = require("../Models/userPosts");
var weather = require("../Models/weather");


// use chaiHttp for making the actual HTTP requests        
chai.use(chaiHttp);

describe('User Auth', function () {

    it('should Signup user, Signin user', function (done) {
        chai.request(server)

            // register request
            .post('/auth/signup')

            // send user registration details
            .send({
                "name": "a",
                "email": "abcde@gmail.com",
                "password": "123"
            }

            )
            .end((err, res) => { // when we get a resonse from the endpoint

                // in other words,
                // the res object should have a status of 201
                res.should.have.status(201);

                // follow up with login
                chai.request(server)
                    .post('/auth/signin')
                    // send user login details
                    .send({
                        "email": "abcde@gmail.com",
                        "password": "123"
                    })

            })
    })
})