const spotsModel = require('../models/spotsModels')

async function teste(){
    let teste = await spotsModel.getSpotsForListByIdOrderBy(1, 'rateDesc')
    console.log(teste.data)
}

teste()