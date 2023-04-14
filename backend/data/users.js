import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true
  },
  {
    name: 'Bo Jackson',
    email: 'bo@jackson.com',
    password: bcrypt.hashSync('password', 10)
  },
  {
    name: 'Prime Time',
    email: 'prime@time.com',
    password: bcrypt.hashSync('password', 10)
  }
]

export default users