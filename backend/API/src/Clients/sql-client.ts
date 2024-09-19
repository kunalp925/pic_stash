
import sql, { IRecordSet } from 'mssql';

// Storing here for now but configs should remain in another folder and sensitive information should be stored in keyvault
let config = {
    "user": "ApplicationUser",
    "password": "Change_This_1",
    "server": "localhost,5434",
    "database": "PicStash",
    "options": {
        "encrypt": false
    }
}

sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

export var RunQuery = (query: string) => {
    new sql.Request().query(query, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            return result?.recordset;
        }
    });
}
 