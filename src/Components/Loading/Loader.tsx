import React, { ReactNode } from "react";
import Lottie from "lottie-react";
import "./Loader.scss";

interface LoaderProps {
  isLoading: boolean;
  animationData: any;
  children: ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, animationData, children }) => {
  return (
    <div className="loader-container">
      {isLoading && (
        <div className="loader-overlay">
          <div className="animation">
            <Lottie animationData={animationData} style={{ width: 300, height: 150 }} />
          </div>
        </div>
      )}
      <div className={isLoading ? "content-disabled" : ""}>{children}</div>
    </div>
  );
};

export default Loader;