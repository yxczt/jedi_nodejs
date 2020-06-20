var expect = require('chai').expect;
var getSaberMW = require('../../../middleware/saber/getSaberMW');

describe('getSaberMW middleware ', function () {

  it('should set res.locals.saber with a saber from db', function (done){
      const mw = getSaberMW({
        SaberModel:{
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '123'});
            cb(null, 'mocksaber')
          }
        }
      });

      const resMock={
        locals: {}
      };
      mw(
          {
            params: {
            saberID: '123'
            }

          },
      resMock,
      (err)=>{
          expect(err).to.be.eql(undefined);
          expect(resMock.locals).to.be.eql({saber: 'mocksaber'});
          done();
      });
  });
  it('should call next when there is a problem', function (done){
      const mw = getSaberMW({
        SaberModel:{
          findOne: (p1, cb) => {

            expect(p1).to.be.eql({_id: '123'});
            cb('db hiba', null)
          }
        }
      });

      const resMock={
        locals: {}
      };
      mw(
          {
            params: {
            saberID: '123'
            }

          },
      resMock,
      (err)=>{
          expect(err).to.be.eql('db hiba');
          done();
      });
  });
  it('should call next when there is no saber found in db', function (done){
      const mw = getSaberMW({
        SaberModel:{
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '123'});
            cb(undefined, null)
          }
        }
      });

      const resMock={
        locals: {}
      };
      mw(
          {
            params: {
            saberID: '123'
            }

          },
      resMock,
      (err)=>{
          expect(err).to.be.eql(undefined);
          expect(resMock.locals).to.be.eql({});
          done();
      });
  });

});
