import { ACTIONS, TYPES } from "./types";

interface Props {
  type: string;
  coin1: number;
  coin2: number;
}

export function coinsInterpreter(type:string, coin1:number, coin2:number ): string {
  switch (type) {
    case TYPES.NORMAL:
      if (coin1 == 1 && coin2 == 1) return "01";
      if (coin1 == 1 && coin2 == 2) return "02";
      if (coin1 == 2 && coin2 == 1) return "03";
      if (coin1 == 2 && coin2 == 2) return "04";

      return "00";

    case TYPES.MONTADO:
      if (coin1 == 1 && coin2 == 3) return "05";
      if (coin1 == 3 && coin2 == 1) return "06";
      if (coin1 == 2 && coin2 == 4) return "07";
      if (coin1 == 4 && coin2 == 2) return "08";
      if (coin1 == 1 && coin2 == 4) return "09";
      if (coin1 == 3 && coin2 == 2) return "10";
      if (coin1 == 4 && coin2 == 3) return "11";
      if (coin1 == 4 && coin2 == 1) return "12";

      return "00";

    case TYPES.PARADO:
      if (coin1 == 1 && coin2 == 3) return "13";
      if (coin1 == 1 && coin2 == 4) return "14";
      if (coin1 == 2 && coin2 == 3) return "15";
      if (coin1 == 2 && coin2 == 4) return "16";
      if (coin1 == 3 && coin2 == 1) return "17";
      if (coin1 == 3 && coin2 == 2) return "18";
      if (coin1 == 4 && coin2 == 1) return "19";
      if (coin1 == 4 && coin2 == 2) return "20";
      if (coin1 == 1 && coin2 == 1) return "21";
      if (coin1 == 1 && coin2 == 2) return "22";
      if (coin1 == 2 && coin2 == 1) return "23";
      if (coin1 == 2 && coin2 == 2) return "24";

    case TYPES.AMBOS_PARADOS:
      return "00";

    case TYPES.PARADO_MONTADO:
      if (coin1 == 1 && coin2 == 3) return "25";
      if (coin1 == 3 && coin2 == 1) return "26";
      if (coin1 == 2 && coin2 == 4) return "27";
      if (coin1 == 4 && coin2 == 2) return "28";
      if (coin1 == 1 && coin2 == 4) return "29";
      if (coin1 == 3 && coin2 == 2) return "30";
      if (coin1 == 2 && coin2 == 3) return "31";
      if (coin1 == 4 && coin2 == 1) return "32";

      return "00";

    case TYPES.TRANVERSAL:
      if (coin1 == 1 && coin2 == 0) return "34";
      if (coin1 == 2 && coin2 == 0) return "35";
      if (coin1 == 3 && coin2 == 0) return "36";
      if (coin1 == 4 && coin2 == 0) return "37";
      if (coin1 == 0 && coin2 == 0) return "33";

      return "00";

    default:
      return "00";
  }
}

export function actionsInterprete (action:string,response:string) {
  if(action >= '04'){
    if(response.includes('not') || response.includes('no')){
      return "/spiritual-family"
    }
    else if(action == '05'){

    }
    else if(action == '06'){
      
    }
  }
  else{
    return "/spiritual-family"
  }
}
