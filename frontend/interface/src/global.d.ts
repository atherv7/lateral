interface Window {
    api: {
        login: (arg: [string, string]) => Promise<any>; 
        register: (arg: [string, string]) => Promise<any>; 
        selectFile: () => Promise<any>; 
        friendRequest: (arg:string) => Promise<any>; 
    }; 
}