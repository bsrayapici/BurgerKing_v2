import React from 'react';

function BurgerList({ burgers, onEdit, onDelete }) {
  if (!burgers || burgers.length === 0) {
    return (
      <p className="info-message">
        Gösterilecek burger bulunamadı. Lütfen yeni bir burger ekleyin veya
        filtreleri sıfırlayın.
      </p>
    );
  }

  return (
    <div className="burger-list-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Adı</th>
            <th>Fiyat</th>
            <th>Ekmek Tipi</th>
            <th>Vegan</th>
            <th>İçerikler</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {burgers.map((burger) => (
            <tr key={burger.id}>
              <td>{burger.id}</td>
              <td>**{burger.name}**</td>
              <td>{burger.price.toFixed(2)} ₺</td>
              <td>{burger.breadType}</td>
              <td>{burger.isVegan ? '✅ Evet' : '❌ Hayır'}</td>
              <td>{burger.contents || '-'}</td>
              <td>
                {/* Düzenle Butonu: App.jsx'teki setEditingBurger fonksiyonunu tetikler */}
                <button className="edit-btn" onClick={() => onEdit(burger)}>
                  ✏️ Düzenle
                </button>
                {/* Sil Butonu: App.jsx'teki handleDelete fonksiyonunu tetikler */}
                <button
                  className="delete-btn"
                  onClick={() => onDelete(burger.id)}
                >
                  🗑️ Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BurgerList;
