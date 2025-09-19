import React, { useState } from 'react';
import MoneyCircle from './MoneyCircle';

interface CoinProps {
    coin: boolean;
    isFaceUp: boolean;
    isOuterCircleFilled: boolean;
    isConfirmed: boolean;
    onFlip: () => void;
  } 
const Coin: React.FC<CoinProps>  = ({
    coin = true,
    isFaceUp,
    isOuterCircleFilled,
    isConfirmed,
    onFlip
  }) => {

  return (
    <div className={`coin relative cursor-pointer ${isConfirmed ? 'confirmed' : ''}`} onClick={onFlip}>
      <div className={`face ${isFaceUp ? 'face-up' : 'face-down'} ${isConfirmed ? 'gold-glow' : ''}`}>
          <MoneyCircle className="money-circle" isOuterCircleFilled={isFaceUp || isConfirmed} coin={coin} isConfirmed={isConfirmed} />
      </div>
      {/* Efecto de brillo místico */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`absolute w-24 h-24 rounded-full bg-purple-500 opacity-0 transition-opacity duration-700 ${isConfirmed ? 'opacity-30 animate-ping' : ''}`}></div>
      </div>
      
      {/* Efecto de orbes espirituales cuando está confirmado */}
      {isConfirmed && (
        <div className="spiritual-orbs">
          <div className="spiritual-orb orb-1"></div>
          <div className="spiritual-orb orb-2"></div>
          <div className="spiritual-orb orb-3"></div>
        </div>
      )}
    </div>
  );
};

export default Coin;