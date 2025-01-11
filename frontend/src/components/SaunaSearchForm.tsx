import React, { useState } from 'react';

interface SearchFormProps {
    onSearch: (searchParams: SearchParams) => void;
}

interface SearchParams {
    keyword: string;
    area?: string;
    priceRange?: string;
}

const SaunaSearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        keyword: '',
        area: '',
        priceRange: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div>
                <input
                    type="text"
                    name="keyword"
                    placeholder="サウナ名を検索"
                    value={searchParams.keyword}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <select name="area" value={searchParams.area} onChange={handleInputChange}>
                    <option value="">エリアを選択</option>
                    <option value="tokyo">東京</option>
                    <option value="osaka">大阪</option>
                    <option value="fukuoka">福岡</option>
                </select>
            </div>
            <div>
                <select name="priceRange" value={searchParams.priceRange} onChange={handleInputChange}>
                    <option value="">価格帯を選択</option>
                    <option value="0-1000">1000円以下</option>
                    <option value="1001-2000">1001円〜2000円</option>
                    <option value="2001-3000">2001円〜3000円</option>
                    <option value="3001">3001円以上</option>
                </select>
            </div>
            <button type="submit">検索</button>
        </form>
    );
};

export default SaunaSearchForm;