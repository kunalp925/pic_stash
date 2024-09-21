import bcrypt from 'bcrypt';

export var hashPassword = async (password : string) =>
{
    const salt = await bcrypt.genSalt();
    const hashedPasword = await bcrypt.hash(password, salt);

    return hashedPasword;
}

export var checkPassword = async (password : string,  hash: string) =>
{
    return await bcrypt.compare(password, hash);;
}
