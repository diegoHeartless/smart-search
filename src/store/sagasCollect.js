/*
var fs = require('fs');

const collectAllSagas = () => {
    const modulesPath = process.cwd().replace('store', 'modules')
    const modulesArray = fs.readdirSync('../modules/')
    const sagasPath = modulesArray
        .filter((mod) => mod !== 'rest-services')
        .map((mod) => '../modules/' + mod + '/sagas/index.ts')
    console.log(sagasPath)
    const sagas = sagasPath.map((sp, index) => {
        const s = import(sp);
        console.log(s)
      return   s
    })

    console.log('Current directory: ' + sagas);
    return sagas
}*/
