import React from 'react';

interface FacilityFeatures {
    saunaTemp?: number;
    waterTemp?: number;
    capacity?: number;
    hasRestingRoom: boolean;
    hasRestaurant: boolean;
    features: string[];
}

interface FacilityDisplayProps {
    facilityName: string;
    features: FacilityFeatures;
}

const FacilityDisplay: React.FC<FacilityDisplayProps> = ({ facilityName, features }) => {
    return (
        <div className="facility-display">
            <h2>{facilityName}</h2>
            <div className="facility-features">
                {features.saunaTemp && (
                    <div className="feature-item">
                        <span>サウナ温度:</span> {features.saunaTemp}℃
                    </div>
                )}
                {features.waterTemp && (
                    <div className="feature-item">
                        <span>水風呂温度:</span> {features.waterTemp}℃
                    </div>
                )}
                {features.capacity && (
                    <div className="feature-item">
                        <span>収容人数:</span> {features.capacity}人
                    </div>
                )}
                <div className="feature-item">
                    <span>休憩スペース:</span> {features.hasRestingRoom ? 'あり' : 'なし'}
                </div>
                <div className="feature-item">
                    <span>レストラン:</span> {features.hasRestaurant ? 'あり' : 'なし'}
                </div>
                {features.features.length > 0 && (
                    <div className="feature-item">
                        <span>その他の特徴:</span>
                        <ul>
                            {features.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacilityDisplay;