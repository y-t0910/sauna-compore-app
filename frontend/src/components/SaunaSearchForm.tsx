import React, { useState } from 'react';
import { SaunaSearchParams } from '../types';

interface Props {
  onSearch: (params: SaunaSearchParams) => void;
}

const SaunaSearchForm: React.FC<Props> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SaunaSearchParams>({
    location: '',
    minTemp: undefined,
    maxTemp: undefined,
    hasRestArea: false,
    keyword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded-lg">
      <div className="mb-2">
        <input
          type="text"
          placeholder="キーワード検索"
          value={searchParams.keyword || ''}
          onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="場所"
          value={searchParams.location || ''}
          onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex mb-2">
        <div className="mr-2">
          <label className="block text-sm">最低温度</label>
          <input
            type="number"
            placeholder="最低温度"
            value={searchParams.minTemp || ''}
            onChange={(e) => setSearchParams({...searchParams, minTemp: Number(e.target.value) || undefined})}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm">最高温度</label>
          <input
            type="number"
            placeholder="最高温度"
            value={searchParams.maxTemp || ''}
            onChange={(e) => setSearchParams({...searchParams, maxTemp: Number(e.target.value) || undefined})}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={searchParams.hasRestArea || false}
            onChange={(e) => setSearchParams({...searchParams, hasRestArea: e.target.checked})}
            className="mr-2"
          />
          休憩スペースあり
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">検索</button>
    </form>
  );
};

export default SaunaSearchForm;