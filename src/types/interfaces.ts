type str=string|null|undefined;

export interface IFormSignIn {
    firstName: string;
    lastName: string;
}

export interface IFormSignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IFormDefault {
    dueDate: string;
    title: string;
    description: string;
    status: string;
    activePage:number
}


