import React from "react";

const CardGlare: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-xl">
      
      {/* Glare 1 */}
      <div className="glare glare-1" />

      {/* Glare 2 */}
      <div className="glare glare-2" />

      {/* Glare 3 */}
      <div className="glare glare-3" />
    </div>
  );
};

export default CardGlare;
