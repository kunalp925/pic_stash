import crypto from 'crypto';

export var hashPassword = (password : string) =>
{
    let salt = crypto.randomBytes(16).toString('hex');

    return crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha256`).toString(`hex`);
}