// @flow

import path from 'path'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default (fastify: FastifyInstance, opts: Object, next: () => void) => {

    fastify.addHook('preHandler',require('../../../dist'))

    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        
        reply.status(200)
        reply.send({ error: false })
    })

    // const ss=jwtauth(['admin'])
    // console.log('ss',ss)
    fastify.get('/testauth' ,{
        // beforeHandler: [
        //     require('/Users/edwardtidbury/Documents/jwtauth.git/')
        // ]
    },async (req: FastifyRequest, reply: FastifyReply) => {
        
        await req.auth.hasScopes(['admin'])
        
        reply.status(200)
        reply.send({ headers: req.headers })
    })

    next()
}
