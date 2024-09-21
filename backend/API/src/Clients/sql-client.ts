
import { injectable } from 'inversify';
import sql, { IResult } from 'mssql';

@injectable()
export default class SQLClient
{
    constructor()
    {
        const env = process?.env;
        const SQLConfig = {
            user: "ApplicationUser",
            password: "Change_This_1",
            server: "localhost",
            port: 5434,
            database: "PicStash",
            options: {
                trustServerCertificate: true
            }
        }

        sql.connect(SQLConfig, err => {
            if (err) 
            {
                throw err;
            }
        
            console.log("SQL Connection Successful!");
        });
    }
    
    RunQuery(query: string)
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
    
    static GenerateSQLDateTime()
    {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}