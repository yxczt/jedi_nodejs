var expect = require('chai').expect;
var getJediMW = require('../../../middleware/jedi/getJediMW');

describe('getJediMW middleware ', function () {

  it('should set res.locals.jedi with a jedi from db', function (done){
      const mw = getJediMW({
        JediModel:{
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '13'});
            cb(null, 'mockjedi')
          }
        }
      });

      const resMock={
        locals: {}
      };
      mw(
          {
            params: {
            jediID: '13'
            }

          },
      resMock,
      (err)=>{
          expect(err).to.be.eql(undefined);
          expect(resMock.locals).to.be.eql({jedi: 'mockjedi'});
          done();
      });
  });
  it('should call next when there is a problem', function (done){
      const mw = getJediMW({
        JediModel:{
          findOne: (p1, cb) => {

            expect(p1).to.be.eql({_id: '13'});
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
            jediID: '13'
            }

          },
      resMock,
      (err)=>{
          expect(err).to.be.eql('db hiba');
          done();
      });
  });
  it('should call next when there is no jedi found in db', function (done){
      const mw = getJediMW({
        JediModel:{
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '13'});
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
            jediID: '13'
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
