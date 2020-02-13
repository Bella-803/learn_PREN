import chai from "chai";
import request from "supertest";
import app from "../app";

// chai.use(chaiHttp);
chai.should();

describe('signup',() => {
    request(app)
    .post('/fgfd')
    .send({})
    .end((err, res) => {
        console.log('.....', res.body)
    })
});