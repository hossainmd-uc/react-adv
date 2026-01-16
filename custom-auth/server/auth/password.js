
import bcrypt from 'bcrypt'

export async function hashPassword(password) {
    const saltOrRounds = 12;
    return bcrypt.hash(password, saltOrRounds);
}

export async function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

