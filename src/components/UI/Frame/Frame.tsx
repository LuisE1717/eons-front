import React, {type ReactElement} from 'react';

const Frame: React.FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className="frame relative w-full h-screen overflow-hidden">
            {/* Fondo místico */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-80 z-0"></div>
            
            {/* Efecto de partículas */}
            <div className="absolute inset-0 z-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-purple-500 opacity-50"
                        style={{
                            width: `${Math.random() * 20 + 5}px`,
                            height: `${Math.random() * 20 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center z-10">
                <img
                    src="/marco-ok.png"
                    alt="marco"
                    className="object-contain w-full max-w-4xl desktop:h-[75%] laptop:h-[75%] tablet:h-[80%] phone:h-[85%]"
                />
                <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6" >
                    {children}
                </div>
            </div>
            
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
            `}</style>
        </div>
    );
};

export default Frame;