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
    <div className="coin"  onClick={onFlip}>
      <div className={`face ${isFaceUp ? 'face-up' : 'face-down'}`}>
          <MoneyCircle className="money-circle" isOuterCircleFilled={isFaceUp} coin={coin} />
      </div>
    </div>
  );
};

export default Coin;

