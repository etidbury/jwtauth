module.exports = Object.assign(
    require('tpl-lib-helpers/config/jest')
    ,{
        'testPathIgnorePatterns': ['/node_modules','__tests__/demo-api']
    }
)