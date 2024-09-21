import { injectable } from "inversify";
import { checkPassword, hashPassword } from "../Auth/AuthHelper";
import SQLClient from "../Clients/sql-client";
import { User } from "../Models/UserModel";
import { convertRecordToUserList } from "./UserHelpers";

@injectable()
export default class UserService
{
    private readonly _sqlClient;
    constructor(
        sqlClient : SQLClient
    )
    {
        this._sqlClient = sqlClient;
    }

    async DoesUserExist(
        username : string)
    {
        if (username == undefined)
        {
            return;
        }

        const userList = await this.FindUser(username);
        
        if (userList.length > 0)
        {
            return true;
        }

        return false;
    }

    async CreateUser(
        username : string,
        password: string)
    {
        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword);

        // Create a new user
        const user = new User(
            undefined,
            username,
            hashedPassword,
            SQLClient.GenerateSQLDateTime()
        );
        
        const insertRes = await this.InsertUser(user);

        return insertRes;
    }

    async VerifyUser(
        username : string,
        password: string)
    : Promise<(boolean | string | undefined)[]>
    {
        const userList = await this.FindUser(username);

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

    private async FindUser(
        username : string)
    {
        const usernameQuery = `SELECT * FROM Users WHERE Username = '${username}'`;
        const queryRes = await this._sqlClient.RunQuery(usernameQuery);

        return convertRecordToUserList(queryRes?.recordset);
    }

    private async InsertUser(
        userInfo : User)
    {   
        if (userInfo == undefined) {
            return false;
        }
        const insertQuery = `INSERT INTO Users (Username, PasswordHash, CreatedAt) VALUES ('${userInfo.userName}', '${userInfo.passwordHash}', '${userInfo.createdAt}');`;
        
        try
        {
            await this._sqlClient.RunQuery(insertQuery);
        }
        catch (err)
        {
            console.error("Unable to insert user");
            return false;
        }

        return true;
    }
}

