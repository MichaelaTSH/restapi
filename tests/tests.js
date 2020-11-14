import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe("POST GET expenses", () => {
    describe('POST expense', () => {
        it('it should not POST an expense without the cost field', (done) => {
            let exp = {
                name: "Shirt"
            };
            chai.request(app)
                .post('/api/expense')
                .send(exp)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        });
        it('it should POST an expense ', (done) => {
            let exp = {
                name: "Shirt",
                cost: 15
            }
            chai.request(app)
                .post('/api/expense')
                .send(exp)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.should.have.property('data').property('name').eql('Shirt');
                    res.body.should.have.property('data').property('cost').eql(15);
                    res.body.should.have.property('message').eql("New expense created!");
                    done();
                });
        });
    });

    describe('GET expense', () => {
        it('it should GET all the expenses', (done) => {
            chai.request(app)
                .get('/api/expense')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.not.eql(0);
                    done();
                });
        });
    });
});


describe('PUT DELETE expense', () => {
    var id = 0;
    beforeEach((done) => {
        let exp = {
            name: "Shirt",
            cost: 15
        }
        chai.request(app)
            .post('/api/expense')
            .send(exp)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('data').property('name').eql('Shirt');
                id = res.body.data._id;
                done();
            });
    });

    describe('PUT expense', () => {
        it('it should UPDATE an expense', (done) => {
            let exp2 = {
                name: "Shorts"
            }
            chai.request(app)
                .put(`/api/expense/${id}`)
                .send(exp2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.should.have.property('data').property('name').eql('Shorts');
                    res.body.should.have.property("message").eql("Expense Info updated");
                    done();
                });
        });
    });

    describe('DELETE expense', () => {
        it('it should DELETE an expense', (done) => {
            chai.request(app)
                .delete(`/api/expense/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("Expense deleted");
                    done();
                });
        });
    });
});
