import { RunQuery } from "../Clients/sql-client";
import { User } from "../Models/UserModel";

export var findUserFromUsername = (username : string) =>
{
    if (username == undefined)
    {
        return;
    }

    let usernameQuery = `SELECT * FROM Users WHERE Username = '${username}'`;

    return RunQuery(usernameQuery);
}

export var insertUser = async (userInfo : User) =>
{   
    if (userInfo == undefined) {
        return false;
    }
    let insertQuery = `INSERT INTO Users (Username, PasswordHash, CreatedAt) VALUES ('${userInfo.userName}', '${userInfo.passwordHash}', '${userInfo.createdAt}');`;
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