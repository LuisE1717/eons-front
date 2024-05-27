export const types = {
    normal:'normal',
    parado:'parado',
    montado:'montado',
    ambos_parados:'ambos_parados',
    tranversal:'tranversal',
    ambos_tranversal:'ambos_tranversal'
}

export function CoinsInterpreter (type:string,coin1:number,coin2:number) {
    switch (type){
        case types.normal:

            if(coin1 == 1 && coin2 == 1)
                return '01';
            if(coin1 == 2 && coin2 == 1)
                return '02';
            if(coin1 == 1 && coin2 == 2)
                return '03';
            if(coin1 == 2 && coin2 == 2)
                return '04';
        
        case types.parado:
            return '';
        
        case types.montado:
            return '';    
        
        case types.ambos_parados:
            return '';
            
        case types.tranversal:
            return '';
            
        case types.ambos_tranversal:
            return '';
        
        default:
            return '';
    }
}