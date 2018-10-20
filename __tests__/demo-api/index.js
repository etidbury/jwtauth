require('dotenv').config()

const {
    NODE_ENV,
    HOST,
    PORT,
    DISABLE_LOGS
} = process.env

const isProd = NODE_ENV === 'production'

if (isProd) {
    require('babel-polyfill')
}

require('tpl-api-helpers/util/log')

const fastify = require('fastify')()

if (!DISABLE_LOGS){
    // Pretty prints all available routes ( fastify.blipp() inside callback to fastify.listen() )
    fastify.register(require('fastify-blipp'))
        .after(()=>{   
            console.info('> Loaded plugin: fastify-blipp') 
        })
}

fastify.register(require('tpl-api-helpers/fastify'))

// Avoid throwing 404 with /favicon.ico
fastify.register(require('fastify-no-icon'))

// Parse form data
fastify.register(require('fastify-formbody'))

// https://expressjs.com/en/advanced/best-practice-security.html
fastify.register(require('fastify-helmet'))

// tip: set to {global:false} and use reply.compress() where needed
fastify.register(require('fastify-compress'), { global: true })

fastify.use(require('cors')())

fastify.register(require('fastify-multipart'))

if (!PORT || !PORT.length) {
    throw new TypeError('Required environment variable not set: PORT')
}
fastify.setErrorHandler(async (err, req, reply) => {
    console.error(err)
})
// Start server
fastify.listen(PORT, HOST || '127.0.0.1', (err, address) => {
    try {
        if (err) {
            throw err
        }
       
        if (fastify.blipp)
            fastify.blipp()

        console.info(`> Ready at ${address}`)

    } catch (err) {
        console.error(err)
        // console.trace(err)
        process.exit(1)
    }
})