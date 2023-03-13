export class User {
    constructor(
        public id:string,
        public email:string,
        public userName: string,
        public gender: string,
        public phone: number,
        public role: string,
        public status: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    //return token only if it is valid 
    get token() { 
        if(!this._tokenExpirationDate || this._tokenExpirationDate < new Date){
            return null;
        }
        return this._token;
    }
}
