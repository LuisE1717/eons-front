export const omitBy = (obj:any, fn:any) => {

    return Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc:any, key:any) => ((acc[key] = obj[key]), acc), {});

  }

export const transformDataToQuery = (dataH:any) =>{
    return("?" +
          Object.keys(omitBy(dataH, (x: any) => x === ""))
            .map((key) => {
              return `${key}=${encodeURIComponent(dataH[key])}`;
            })
            .join("&"));
}