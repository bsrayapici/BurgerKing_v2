import React, { useState, useEffect, useCallback } from 'react';
import { 
    getAllBurgers, deleteBurger, createBurger, updateBurger,
    searchByPrice, searchByBreadType, searchByContent 
} from './services/api';
import BurgerList from './components/BurgerList';
import BurgerForm from './components/BurgerForm';
import SearchAndFilter from './components/SearchAndFilter';

function App() {
    const [burgers, setBurgers] = useState([]);
    const [editingBurger, setEditingBurger] = useState(null); // Düzenlenen burger verisi
    const [error, setError] = useState(null);

    // Tüm burgerları Controller'dan çeken ana fonksiyon (GET /burgers)
    const fetchBurgers = useCallback(async (query = null) => {
        setError(null);
        try {
            let response;
            if (query) {
                // Arama sonuçları varsa, onları kullan
                response = await query();
            } else {
                // Varsayılan olarak tüm listeyi getir
                response = await getAllBurgers();
            }
            setBurgers(response.data);
        } catch (err) {
            setError('Veri yüklenirken veya aranırken bir hata oluştu.');
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchBurgers();
    }, [fetchBurgers]);

    // Kaydetme ve Güncelleme İşlemi (POST /burgers, PUT /burgers/{id})
    const handleSave = async (burgerData) => {
        setError(null);
        try {
            if (burgerData.id) {
                // Güncelleme
                await updateBurger(burgerData.id, burgerData);
            } else {
                // Kaydetme
                await createBurger(burgerData);
            }
            // Listeyi yeniden çek ve formu temizle
            fetchBurgers();
            setEditingBurger(null);
        } catch (err) {
            setError('Kaydetme/Güncelleme işlemi başarısız oldu.');
            console.error(err);
        }
    };

    // Silme İşlemi (DELETE /burgers/{id})
    const handleDelete = async (id) => {
        setError(null);
        if (window.confirm(`ID: ${id} olan burgerı silmek istediğinizden emin misiniz?`)) {
            try {
                await deleteBurger(id);
                // Başarılı olursa listeyi filtrele veya yeniden çek
                fetchBurgers();
            } catch (err) {
                setError('Silme işlemi başarısız oldu.');
                console.error(err);
            }
        }
    };

    // Arama İşlemi (Özel GET /burgers/...)
    const handleSearch = (type, value) => {
        let searchFunction;
        switch (type) {
            case 'price':
                // Controller: findByPrice
                searchFunction = () => searchByPrice(parseFloat(value));
                break;
            case 'breadType':
                // Controller: findByBreadType
                searchFunction = () => searchByBreadType(value);
                break;
            case 'content':
                // Controller: findByContent
                searchFunction = () => searchByContent(value);
                break;
            default:
                fetchBurgers(); // Tüm listeyi geri getir
                return;
        }
        // fetchBurgers'ı arama fonksiyonu ile çağır
        fetchBurgers(searchFunction);
    };

    return (
        <div className="container">
            <h1>🍔 Burger Yönetim Paneli</h1>
            {error && <div className="error">{error}</div>}

            <div className="form-section">
                <h2>{editingBurger ? 'Burger Düzenle' : 'Yeni Burger Ekle'}</h2>
                <BurgerForm 
                    initialData={editingBurger} 
                    onSave={handleSave} 
                    onCancel={() => setEditingBurger(null)} 
                />
            </div>

            <hr />

            <div className="search-section">
                <h2>🔎 Arama ve Filtreleme</h2>
                <SearchAndFilter 
                    onSearch={handleSearch} 
                    onReset={() => fetchBurgers()}
                />
            </div>

            <hr />

            <div className="list-section">
                <h2>Liste ({burgers.length} adet)</h2>
                <BurgerList 
                    burgers={burgers} 
                    onEdit={setEditingBurger} // Düzenleme formunu doldurur
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default App;