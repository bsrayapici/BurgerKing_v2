// Basit bir örnek form yapısı
import React, { useState, useEffect } from 'react';

const initialBurgerState = {
    id: null, name: '', price: 0, isVegan: false,
    breadType: 'NORMAL', contents: '' 
};
// BreadType, Controller'ınızdaki enum değerlerine uygun olmalı
const BREAD_TYPES = ['NORMAL', 'WHOLE_WHEAT', 'WRAP', 'NONE']; 

function BurgerForm({ initialData, onSave, onCancel }) {
    const [formData, setFormData] = useState(initialBurgerState);

    useEffect(() => {
        // Eğer düzenleme modundaysa formu doldur
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(initialBurgerState);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fiyatı sayıya dönüştür
        const dataToSend = { ...formData, price: parseFloat(formData.price) };
        onSave(dataToSend);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Adı" required />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Fiyatı" required min="0" step="0.01" />
            <label>
                <input name="isVegan" type="checkbox" checked={formData.isVegan} onChange={handleChange} /> Vegan mı?
            </label>
            <select name="breadType" value={formData.breadType} onChange={handleChange}>
                {BREAD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <textarea name="contents" value={formData.contents} onChange={handleChange} placeholder="İçindekiler (virgülle ayırın)"></textarea>

            <button type="submit">{formData.id ? 'Güncelle' : 'Ekle'}</button>
            {formData.id && <button type="button" onClick={onCancel}>İptal</button>}
        </form>
    );
}

export default BurgerForm;