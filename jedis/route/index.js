const getJediListMW = require('../middleware/jedi/getJediListMW');
const delJediMW = require('../middleware/jedi/delJediMW');
const saveJediMW = require('../middleware/jedi/saveJediMW');
const getJediMW = require('../middleware/jedi/getJediMW');
const editJediMW = require('../middleware/jedi/editJediMW');
const getSaberListMW = require('../middleware/saber/getSaberListMW');
const delSaberMW = require('../middleware/saber/delSaberMW');
const saveSaberMW = require('../middleware/saber/saveSaberMW');
const getSaberMW = require('../middleware/saber/getSaberMW');
const editSaberMW = require('../middleware/saber/editSaberMW');
const renderMW =require('../middleware/renderMW');

const JediModel = require('../models/jedi');
const SaberModel = require('../models/saber');

module.exports = function(app) {
    const objRepo = {
        JediModel: JediModel,
        SaberModel: SaberModel
    };



    app.get('/jedi/del/:jediID',
    getJediMW(objRepo),
    delJediMW(objRepo)
    );

    app.use('/jedi/new',
    saveJediMW(objRepo),
    getSaberListMW(objRepo),
    renderMW(objRepo, 'jedinew')
    );

    app.use('/jedi/edit/:jediID',
    getJediMW(objRepo),
    editJediMW(objRepo),
    getSaberListMW(objRepo),
    renderMW(objRepo, 'jediedit')
    );

    app.get('/jedi',
    getJediListMW(objRepo),
    getSaberListMW(objRepo),
    renderMW(objRepo, 'index')
    );

    app.get('/saber/del/:saberID',
    getSaberMW(objRepo),
    delSaberMW(objRepo)
    );

    app.use('/saber/new',
    saveSaberMW(objRepo),
    renderMW(objRepo, 'sabertypesnew')
    );

    app.use('/saber/edit/:saberID',
    getSaberMW(objRepo),
    editSaberMW(objRepo),
    renderMW(objRepo, 'sabertypesedit')
    );

    app.get('/saber',
    getSaberListMW(objRepo),
    renderMW(objRepo, 'sabertypeslist'));

    app.get('/',
    getJediListMW(objRepo),
    getSaberListMW(objRepo),
    renderMW(objRepo, 'index'));


}
