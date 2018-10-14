// @flow

// const {
//     NODE_ENV
// } = process.env

// const isProd = NODE_ENV === 'production'
import { FastifyInstance,FastifyRequest, FastifyReply,RouteShorthandOptions } from 'fastify'
import urljoin from 'url-join'
import Client from './lib/Client'
// // this function is executed for every request before the handler is executed
// beforeHandler: async (request, reply) => {
//     // E.g. check authentication
//   },

import {
    BadRequest,
    Unauthorized,
    Forbidden
} from 'http-errors'

const {
    JWT_AUTH_API_URL,
    JWT_AUTH_APP_ID
} = process.env

if (!JWT_AUTH_API_URL?.length){
    throw new TypeError('Required environment variable not set: JWT_AUTH_API_URL')
}
if (!JWT_AUTH_APP_ID?.length){
    throw new TypeError('Required environment variable not set: JWT_AUTH_APP_ID')
}
const _verify = async ({ token,scopes,UserId }:{token:string,scopes:Array<string>,UserId:string})=>{
    return Client.post(urljoin(JWT_AUTH_API_URL,'/verify'),{
        UserId,
        token,
        scopes,
        appIdReference: JWT_AUTH_APP_ID
    }).catch((err)=>{
        switch(err?.response?.status){
        case 403:
            throw new Forbidden('You do not have access to this resource')
        default:
            throw new Unauthorized('Invalid credentials')
        }
    })
}

module.exports = async (request:FastifyRequest, reply:FastifyReply) => {

    if (!request.auth){
        request.auth = {}
    }

    request.auth.hasScopes = async (scopes:Array<string>)=>{

        if (!scopes || !scopes.length || !scopes[0].length){
            throw TypeError('At least 1 scope must be specified when calling hasScopes()')
        }

        if (!request.headers?.authorization?.length){
            throw new Unauthorized('Required Authorization header not set')
        }

        if (!request.headers['X-User-Id']?.length){
            throw new Unauthorized('Required X-User-Id header not set')
        }
        let token = ''
        let parts = request.headers.authorization.split(' ')
        if (parts.length === 2) {
                    
            let scheme = parts[0]
            token = parts[1]

            if (!/^Bearer$/i.test(scheme) || !token.length) {
                throw new BadRequest('Format is Authorization: Bearer [token]')
            }
        }

        const UserId = request.headers['X-User-Id']
       
        await _verify({ token,scopes,UserId })

        return true
    }
}