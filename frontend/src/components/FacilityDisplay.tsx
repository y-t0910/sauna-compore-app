import React from 'react';
import { SaunaFacility } from '../types';

// propsの型定義をexportして他のファイルからも参照できるようにする
export interface FacilityDisplayProps {
  facility: SaunaFacility;
}

const FacilityDisplay: React.FC<FacilityDisplayProps> = ({ facility }) => {
  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-md">
      <h3 className="font-bold text-lg mb-2">施設情報</h3>
      <div className="text-sm">
        <p>サウナ室温度: <span className="font-medium">{facility.temperatureRoom}℃</span></p>
        <p>水風呂温度: <span className="font-medium">{facility.waterBath}℃</span></p>
        <p>休憩スペース: <span className="font-medium">{facility.restArea ? 'あり' : 'なし'}</span></p>
        <div className="mt-2">
          <h4 className="font-medium">設備</h4>
          <ul className="list-disc list-inside">
            {facility.facilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <h4 className="font-medium">アメニティ</h4>
          <ul className="list-disc list-inside">
            {facility.amenities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-2">営業時間: <span className="font-medium">{facility.businessHours}</span></p>
        <p>料金: <span className="font-medium">¥{facility.price}</span></p>
        <p className="mt-2 italic">{facility.description}</p>
      </div>
    </div>
  );
};

export default FacilityDisplay;