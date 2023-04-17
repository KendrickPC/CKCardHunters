import jwt from 'jsonwebtoken'

// id is the payload for our token
const generateToken = (id) => {
  return jwt.sign({id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generateToken

