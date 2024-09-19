
import sql, { IResult } from 'mssql';

// Storing here for now but configs should remain in another folder and sensitive information should be stored in keyvault
let config = {
    "user": "ApplicationUser",
    "password": "Change_This_1",
    "server": "localhost",
    "port":5434,
    "database": "PicStash",
    options: {
        trustServerCertificate: true // true only for local dev
    }
}


sql.connect(config, err => {
    if (err) 
    {
        throw err;
    }

    console.log("Connection Successful!");
});

export var RunQuery = async (query: string) =>
{
    return new Promise<IResult<any> | undefined>((resolve, reject) =>
    {
        sql.query(query, (err, result) => 
        {
            if (err)
            {
                reject(err);
            }
            resolve(result);
        });
    });
}

export var generateSQLDateTime = () =>
{
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}