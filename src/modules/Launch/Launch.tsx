import React, { useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';

interface CoinState {
    isFaceUp: boolean;
    isOuterCircleFilled: boolean;
}

const Launch: React.FC = () => {
    const [coinPositions, setCoinPositions] = useState<CoinState[]>([
        { isFaceUp: true, isOuterCircleFilled: false },
        { isFaceUp: true, isOuterCircleFilled: false },
    ]);

    const handleCoinFlip = (index: number) => {
        console.log('Coin flipped!');
        setCoinPositions((prev) =>
            prev.map((coin, i) =>
                i === index ? { ...coin, isFaceUp: !coin.isFaceUp } : coin
            )
        );
    };

    const handleSubmit = async () => {
        try {
            await fetch('/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coinPositions),
            });
            console.log('Data sent successfully');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <Frame>
            <div className="launch-container">
                <h5>Que símbolos cayeron hacia arriba?</h5>
                <div className="coin-container">
                    <div className="flex flex-col items-center">
                        <Coin
                            coin={true}
                            isFaceUp={coinPositions[0].isFaceUp}
                            isOuterCircleFilled={coinPositions[0].isOuterCircleFilled}
                            onFlip={() => handleCoinFlip(0)}
                        />
                        <span className='mt-2'>Moneda 1</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Coin
                            coin={false}
                            isFaceUp={coinPositions[1].isFaceUp}
                            isOuterCircleFilled={coinPositions[1].isOuterCircleFilled}
                            onFlip={() => handleCoinFlip(1)}
                        />
                        <span className='mt-2'>Moneda 2</span>
                    </div>


                </div>
                <Stepper totalSteps={4} onSubmit={handleSubmit} />
            </div>
        </Frame>
    );
};

export default Launch;
