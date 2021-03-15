import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

chai.should();

chai.use(chaiHttp);

describe("/ should display Revie App API", () => {
    it("it should get the home page", (done) => {
        chai
            .request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("it should return 404 error not found for no existing routes", (done) => {
        chai
            .request(server)
            .get("/abc_zyx")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

export default describe;