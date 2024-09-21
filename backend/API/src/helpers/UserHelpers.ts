import { User } from '../models/UserModel';
import { IRecordSet } from 'mssql';

export var convertRecordToUserList = (list : IRecordSet<any> | undefined) => 
{
    let userList = new Array<User>();

    if(list == undefined)
    {
        return userList;
    }

    list.forEach(element => {
        userList.push(convertJsonToUser(element));
    });

    return userList;
}

var convertJsonToUser = (obj : any) : User =>
{
    return new User (obj.ID, obj.Username, obj.PasswordHash, obj.CreatedAt);
}