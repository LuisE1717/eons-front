import React, { useState } from 'react';
import MoneyCircle from './MoneyCircle';

interface CoinProps {
    coin: boolean;
    isFaceUp: boolean;
    isOuterCircleFilled: boolean;
    onFlip: () => void;
  } 
const Coin: React.FC<CoinProps>  = ({
    coin = true,
    isFaceUp,
    isOuterCircleFilled,
    onFlip
  }) => {

  return (
    <div className="coin relative cursor-pointer" onClick={onFlip}>
      <div className={`face ${isFaceUp ? 'face-up' : 'face-down'}`}>
          <MoneyCircle className="money-circle" isOuterCircleFilled={isFaceUp} coin={coin} />
      </div>
      {/* Efecto de brillo místico */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`absolute w-24 h-24 rounded-full bg-purple-500 opacity-0 transition-opacity duration-700 ${isFaceUp ? 'opacity-20 animate-ping' : ''}`}></div>
      </div>
    </div>
  );
};

export default Coin;