const spotsModel = require('../models/spotsModels')

let obj = {
    ow_us_id: 1,
    ow_sp_id: 1,
    sr_text_request: "test",
    sr_validation: false,
    psr_ph_id: 1,
    psr_sr_id: 1
}

let obj2 = {
    teste: 1,
    teste2: 2,
    teste3: 3
}

let obj3 = {
    ...obj,
    ...obj2
}

let obj4 = {
    obj: "teste",
}

console.log(obj4)

obj4.teste = "link aqui"

console.log(obj4)