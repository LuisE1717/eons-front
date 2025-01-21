import React, {type ReactElement} from 'react';

const Frame: React.FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className="frame relative w-full h-screen">
            <div className="relative w-full h-full flex items-center justify-center">
                <img
                    src="/marco-ok.png"
                    alt="marco"
                    className="object-contain w-full h-full "
                />
                <div className="absolute inset-0 flex mt-28 items-center justify-center" >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Frame;