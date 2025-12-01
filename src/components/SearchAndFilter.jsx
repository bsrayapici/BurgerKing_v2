// Basit bir arama ve filtreleme bileşeni
import React, { useState } from 'react';

function SearchAndFilter({ onSearch, onReset }) {
    const [searchType, setSearchType] = useState('none');
    const [searchValue, setSearchValue] = useState('');

    const handleApply = () => {
        if (searchType !== 'none' && searchValue) {
            onSearch(searchType, searchValue);
        }
    };

    const handleReset = () => {
        setSearchType('none');
        setSearchValue('');
        onReset();
    };

    return (
        <div>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="none">Filtre Tipi Seçiniz</option>
                <option value="price">Fiyattan Büyük Olanlar</option>
                <option value="breadType">Ekmek Tipine Göre</option>
                <option value="content">İçeriğe Göre</option>
            </select>

            {searchType !== 'none' && (
                <input 
                    type={searchType === 'price' ? 'number' : 'text'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={searchType === 'price' ? 'Min Fiyat Girin' : 'Arama Değeri Girin'}
                />
            )}
            
            <button onClick={handleApply} disabled={searchType === 'none' || !searchValue}>Filtrele</button>
            <button onClick={handleReset}>Listeyi Sıfırla</button>
        </div>
    );
}

export default SearchAndFilter;