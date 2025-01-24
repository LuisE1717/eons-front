import React, {type ReactElement} from 'react';

const Frame: React.FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className="frame relative w-full h-screen">
            <div className="relative w-full h-full flex items-center justify-center">
                <img
                    src="/marco-ok.png"
                    alt="marco"
                    className="object-contain w-full desktop:h-[80%] laptop:h-[80%] tablet:h-[88%] phone:h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8" >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Frame;