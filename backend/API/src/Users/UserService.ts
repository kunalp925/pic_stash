import { checkPassword, hashPassword } from "../Auth/AuthHelper";
import { RunQuery, generateSQLDateTime } from "../Clients/sql-client";
import { User } from "../Models/UserModel";
import { convertRecordToUserList } from "./UserHelpers";

export var doesUserExist = async (username : string) =>
{
    if (username == undefined)
    {
        return;
    }

    const userList = await findUser(username);
    
    if (userList.length > 0)
    {
        return true;
    }

    return false;
}

export var createUser = async (username : string, password: string) =>
{
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    // Create a new user
    const user = new User(
        undefined,
        username,
        hashedPassword,
        generateSQLDateTime()
    );
    
    const insertRes = await insertUser(user);

    return insertRes;
}

export var verifyUser = async (username : string, password: string)
: Promise<(boolean | string | undefined)[]> =>
{
    const userList = await findUser(username);

    if (userList.length != 1){
        console.log("User not found");
        return [false, undefined]
    }

    const foundUser = userList[0];
    const validPassword = await checkPassword(password, foundUser.passwordHash);

    if (validPassword)
    {
        console.log("found");
        return [true, 'token']
    }
    
    return [false, undefined];
}

var findUser = async (username : string ) =>
{
    const usernameQuery = `SELECT * FROM Users WHERE Username = '${username}'`;
    const queryRes = await RunQuery(usernameQuery);

    return convertRecordToUserList(queryRes?.recordset);
}

var insertUser = async (userInfo : User) =>
{   
    if (userInfo == undefined) {
        return false;
    }
    const insertQuery = `INSERT INTO Users (Username, PasswordHash, CreatedAt) VALUES ('${userInfo.userName}', '${userInfo.passwordHash}', '${userInfo.createdAt}');`;
    
    try
    {
        await RunQuery(insertQuery);
    }
    catch (err)
    {
        console.error("Unable to insert user");
        return false;
    }

    return true;
}