import jwt from 'jsonwebtoken'
import { generateKeySync, randomBytes } from 'node:crypto'

const secret = randomBytes(32).toString('hex')
// console.log(secret2)
const secret2 = generateKeySync('hmac', { length: 256 })
    .export()
    .toString('hex')
// console.log(secret)

jwt.sign(
    { name: 'John Doe', audience: '19950304' },
    secret,
    { expiresIn: '1h' },
    (err, token) => {
        if (err) {
            console.error('Error signing token:', err)
        } else {
            // The Token used in the Authorization header should be in the format: 'Bearer <token>'
            console.log('Generated Token:', token)

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.error('Error verifying token:', err)
                } else {
                    console.log('Decoded Payload:', decoded)
                }
            })
        }
    },
)
