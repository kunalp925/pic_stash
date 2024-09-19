export class User {
    public id : number | undefined;
    public userName : string;
    public passwordHash : string;
    public createdAt: string;

    constructor(id : number | undefined, userName:  string, passwordHash : string, createdAt : string)
    {
        if ( id != undefined){
            this.id = id;
        }

        this.userName = userName;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }
}

