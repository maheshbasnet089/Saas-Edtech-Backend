import bcrypt from 'bcrypt'

const generateTeacherPassword = (name:string)=>{
    const randomNumber = Math.floor(10000 + Math.random() * 90000)
    return bcrypt.hashSync(`${randomNumber}_${name}`,10)
}

export default generateTeacherPassword