export const types = {
    normal:'normal',
    parado:'parado',
    parado_montado:'parado_montado',
    montado:'montado',
    tranversal:'tranversal',
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
        case types.montado:
            if(coin1 == 1 && coin2 == 3)
                return '05';
            if(coin1 == 1 && coin2 == 4)
                return '06';
            if(coin1 == 2 && coin2 == 3)
                return '07';
            if(coin1 == 2 && coin2 == 4)
                return '08';
            if(coin1 == 3 && coin2 == 1)
                return '09';
            if(coin1 == 3 && coin2 == 2)
                return '10';
            if(coin1 == 4 && coin2 == 1)
                return '11';
            if(coin1 == 4 && coin2 == 2)
                return '12';
                
        case types.parado:
            if(coin1 == 3 && coin2 == 1)
                return '13';
            if(coin1 == 3 && coin2 == 2)
                return '14';
            if(coin1 == 4 && coin2 == 1)
                return '15';
            if(coin1 == 4 && coin2 == 2)
                return '16';
            if(coin1 == 1 && coin2 == 3)
                return '17';
            if(coin1 == 2 && coin2 == 3)
                return '18';
            if(coin1 == 1 && coin2 == 4)
                return '19';
            if(coin1 == 2 && coin2 == 4)
                return '20';
            if(coin1 == 3 && coin2 == 3)
                return '21';
            if(coin1 == 4 && coin2 == 4)
                return '22';
            if(coin1 == 3 && coin2 == 4)
                return '23';
            if(coin1 == 4 && coin2 == 3)
                return '24'; 

        case types.parado_montado:
            if(coin1 == 1 && coin2 == 3)
                return '25';
            if(coin1 == 1 && coin2 == 4)
                return '26';
            if(coin1 == 2 && coin2 == 3)
                return '27';
            if(coin1 == 2 && coin2 == 4)
                return '28';
            if(coin1 == 3 && coin2 == 1)
                return '29';
            if(coin1 == 3 && coin2 == 2)
                return '30';
            if(coin1 == 4 && coin2 == 1)
                return '31';
            if(coin1 == 4 && coin2 == 2)
                return '32';
            
        case types.tranversal:
            if(coin1 == 1 && coin2 == 0)
                return '34';
            if(coin1 == 2 && coin2 == 0)
                return '35';
            if(coin1 == 0 && coin2 == 1)
                return '36';
            if(coin1 == 0 && coin2 == 2)
                return '37';
            if(coin1 == 0 && coin2 == 0)
                return '33';
        
        default:
            return '';
    }
}