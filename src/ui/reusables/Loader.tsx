import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative inline-block h-[35px] w-[35px] animate-spin-slow">
        {/* Dot 1 */}
        <div 
          className="absolute h-full w-[30%] bottom-[5%] left-0"
          style={{ 
            transform: 'rotate(60deg)',
            transformOrigin: '50% 85%'
          }}
        >
          <div 
            className="absolute h-0 w-full pb-[100%] bg-royal-purple rounded-full bottom-0 left-0 animate-wobble1"
            style={{ animationDelay: '-0.24s' }}
          />
        </div>
        
        {/* Dot 2 */}
        <div 
          className="absolute h-full w-[30%] bottom-[5%] right-0"
          style={{ 
            transform: 'rotate(-60deg)',
            transformOrigin: '50% 85%'
          }}
        >
          <div 
            className="absolute h-0 w-full pb-[100%] bg-royal-purple rounded-full bottom-0 left-0 animate-wobble1"
            style={{ animationDelay: '-0.12s' }}
          />
        </div>
        
        {/* Dot 3 */}
        <div 
          className="absolute h-full w-[30%] bottom-[-5%] left-0"
          style={{ transform: 'translateX(116.666%)' }}
        >
          <div className="absolute h-0 w-full pb-[100%] bg-royal-purple rounded-full top-0 left-0 animate-wobble2" />
        </div>
      </div>
    </div>
  );
};
