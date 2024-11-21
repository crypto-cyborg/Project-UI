import React from 'react';
import './FeatureCard.scss'; 
import { FeatureCardProps } from '../../Data/Models/Home.model';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, linkText, iconColor }) => {
    return (
        <div className="card">
            <i className={`icon ${icon}`} style={{ color: iconColor || '#3b82f6' }}></i> 
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={linkText}>{linkText} →</a>
        </div>
    );
};

export default FeatureCard;