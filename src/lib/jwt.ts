import jwt, { SignOptions } from 'jsonwebtoken'

function getJwtSecret(): string {
  const s = process.env.JWT_SECRET ?? process.env.NEXTAUTH_SECRET
  if (!s) {
    throw new Error('JWT secret is not configured. Set JWT_SECRET or NEXTAUTH_SECRET in your environment.')
  }
  return s
}

const JWT_SECRET: string = getJwtSecret()

export function signToken(payload: object, options: SignOptions = { expiresIn: '7d' }) {
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token: string){
  return jwt.verify(token, JWT_SECRET)
}

export function verifyUserToken(token: string){
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    return null
  }
}

export function verifyAdminToken(token: string){
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    return null
  }
}