
import { injectable } from 'inversify';
import sql, { IResult } from 'mssql';
import { RetrieveEnvVars } from '../helpers/ConfigHelper';

@injectable()
export default class SQLClient
{
    constructor()
    {
        const env = process?.env;
        const SQLConfig = {
            user: <string>RetrieveEnvVars("SQL_USER", "defaultVal"),
            password: <string>RetrieveEnvVars("SQL_PASSWORD", "password"),
            server: <string>RetrieveEnvVars("SQL_HOST", "localhost"),
            port: <number>RetrieveEnvVars("SQL_PORT", 1433),
            database: <string>RetrieveEnvVars("SQL_DATABASE", "database"),
            options: {
                trustServerCertificate: <boolean>RetrieveEnvVars("SQL_TRUSTSERVERCERT", false)
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