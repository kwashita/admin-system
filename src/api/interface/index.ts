export interface Result {
	code: string;
	msg: string;
}

export interface ResultData<T = any> extends Result {
    data?: T;
}


export namespace Login{
    export interface ReqLoginForm{
        usename: string;
        password: string;
    }

    export interface ResLogin{
        access_token: string
    }

    export interface ResAuthButtons{
        [propName: string]: any;
    }
}

