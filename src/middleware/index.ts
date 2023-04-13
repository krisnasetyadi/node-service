import express from 'express'
import { get, merge } from 'lodash'

import { getUsersBySessionToken } from '../db/users'

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['kris-auth']

        if(!sessionToken) {
            return res.sendStatus(400)
        }

        const existingUser = await getUsersBySessionToken(sessionToken)

        if(!existingUser) {
            return res.sendStatus(403)
        }
        merge(req, { identity: existingUser })
        return next()
    } catch (error) {
        console.log('error middleware', error)
        return res.sendStatus(400)
    }
}