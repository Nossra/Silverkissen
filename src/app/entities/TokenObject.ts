export class TokenObject {

    private tokenVal: string;
    constructor(token: string) {
        this.tokenVal = token;
    }

    public get token(): string {
        return this.tokenVal;
    }

}