export function cleanURL (url:string) {
    // Obtener la URL completa de la solicitud
    const fullUrl = window.location.href;

    // Crear un objeto URL a partir de la URL completa
    const urlObj = new URL(fullUrl);

    // Extraer la ruta de la URL
    const currentPath = urlObj.pathname;

    // Remover el primer slash si está presente
    const cleanCurrentPath = currentPath.startsWith('/')? currentPath.slice(1) : currentPath;

    //Remover el /es
    let pathForUse = cleanCurrentPath.replace('es/','')
    if(pathForUse == 'es')
        pathForUse = pathForUse.replace('es','')
    return pathForUse
}

export function findBackUrl(url: string): string {
    // Define la URL base contra la cual se comparará
    const urlBase = '/';
    
    // Divide la URL dada por sus segmentos
    const segments = url.split('/');
    
    // Filtra los segmentos vacíos (que pueden surgir al principio o al final)
    const filteredSegments = segments.filter(segment => segment!== '');
    
    // Comprueba si la URL base está presente en los segmentos filtrados
    if (filteredSegments.includes(urlBase)) {
        // Si la URL base está presente, elimina todos los segmentos desde la posición de la URL base + 1
        return '/' + filteredSegments.slice(0, filteredSegments.indexOf(urlBase) + 1).join('/');
    } else {
        // Si la URL base no está presente, simplemente devuelve la URL base
        return urlBase;
    }
}