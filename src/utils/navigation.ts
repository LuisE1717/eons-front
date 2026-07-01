import { LanguagesArray } from "../i18n";

export function cleanURL (url:string) {
    // Obtener la URL completa de la solicitud
    const fullUrl = url;

    // Crear un objeto URL a partir de la URL completa
    const urlObj = new URL(fullUrl);

    // Extraer la ruta de la URL
    const currentPath = urlObj.pathname;

    // Remover el primer slash si está presente
    //const cleanCurrentPath = currentPath.startsWith('/')? currentPath.slice(1) : currentPath;

    //Remover el idioma
    let lang
    LanguagesArray.forEach(element => {
        if(currentPath.includes(`/${element}`))
            lang = element
    });

    let pathForUse = currentPath.replace(`${lang}/`,'')
    if(lang)
        pathForUse = pathForUse.replace(`/${lang}`,'/')
    //console.log(pathForUse)
    return pathForUse
}

