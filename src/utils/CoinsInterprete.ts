export const types = {
    normal:'normal',
    parado:'parado',
    ambos_parados:'ambos_parados',
    parado_montado:'parado_montado',
    montado:'montado',
    tranversal:'tranversal',
}

export function CoinsInterpreter (type:string,coin1:number,coin2:number) {
    switch (type){
        case types.normal:
            if(type=='normal')
            {if(coin1 == 1 && coin2 == 1)
                return '01';
            if(coin1 == 1 && coin2 == 2)
                return '02';
            if(coin1 == 2 && coin2 == 1)
                return '03';
            if(coin1 == 2 && coin2 == 2)
                return '04';}
        
        case types.montado:
            if(type=='montado')
            {if(coin1 == 1 && coin2 == 3)
                return '05';
            if(coin1 == 3 && coin2 == 1)
                return '06';
            if(coin1 == 2 && coin2 == 4)
                return '07';
            if(coin1 == 4 && coin2 == 2)
                return '08';
            if(coin1 == 1 && coin2 == 4)
                return '09';
            if(coin1 == 3 && coin2 == 2)
                return '10';
            if(coin1 == 4 && coin2 == 3)
                return '11';
            if(coin1 == 4 && coin2 == 1)
                return '12';
            }
                
        case types.parado:
            if(type=='parado')
            {if(coin1 == 1 && coin2 == 3)
                return '13';
            if(coin1 == 1 && coin2 == 4)
                return '14';
            if(coin1 == 2 && coin2 == 3)
                return '15';
            if(coin1 == 2 && coin2 == 4)
                return '16';
            if(coin1 == 3 && coin2 == 1)
                return '17';
            if(coin1 == 3 && coin2 == 2)
                return '18';
            if(coin1 == 4 && coin2 == 1)
                return '19';
            if(coin1 == 4 && coin2 == 2)
                return '20';
            if(coin1 == 1 && coin2 == 1)
                return '21';
            if(coin1 == 1 && coin2 == 2)
                return '22';
            if(coin1 == 2 && coin2 == 1)
                return '23';
            if(coin1 == 2 && coin2 == 2)
                return '24'; 
            }

        case types.ambos_parados:
            if(type=='ambos_parados'){

            }

        case types.parado_montado:
            if(type=='parado_montado')
            {if(coin1 == 1 && coin2 == 3)
                return '25';
            if(coin1 == 3 && coin2 == 1)
                return '26';
            if(coin1 == 2 && coin2 == 4)
                return '27';
            if(coin1 == 4 && coin2 == 2)
                return '28';
            if(coin1 == 1 && coin2 == 4)
                return '29';
            if(coin1 == 3 && coin2 == 2)
                return '30';
            if(coin1 == 2 && coin2 == 3)
                return '31';
            if(coin1 == 4 && coin2 == 1)
                return '32';
            }
            
        case types.tranversal:
            if(type=='tranversal'){
            if(coin1 == 1 && coin2 == 0)
                return '34';
            if(coin1 == 2 && coin2 == 0)
                return '35';
            if(coin1 == 3 && coin2 == 0)
                return '36';
            if(coin1 == 4 && coin2 == 0)
                return '37';
            if(coin1 == 0 && coin2 == 0)
                return '33';
            }
            
        default:
            return '00';
    }
}