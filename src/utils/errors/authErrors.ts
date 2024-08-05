export function authErrors(error,translation: Record<string, string>) {
    try {
        if(error.message == 'User Alredy exist')
        return 'e'
    } catch (error) {
        
    }
}