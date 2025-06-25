# ThriftShop

**ThriftShop** este o aplicație web pentru vânzarea și cumpărarea de produse second hand, cu funcționalități moderne de administrare, recomandare prețuri și chatbot AI.

---

## Tehnologii folosite

### Backend
- **Node.js** & **Express.js** – server web și API REST
- **Sequelize** – ORM pentru baze de date SQL
- **EJS** – motor de template pentru generarea paginilor
- **express-session** & **session-file-store** – gestionare sesiuni
- **bcryptjs** – criptare parole
- **dotenv** – variabile de mediu
- **CSRF custom middleware** – protecție formulare

### Machine Learning
- **Python 3** – limbaj pentru partea de ML
- **scikit-learn** – model RandomForestRegressor
- **pandas** – manipulare date
- **joblib** – serializare model

### Frontend
- **HTML5, CSS3, Bootstrap** – interfață modernă și responsive
- **jQuery** – AJAX și interacțiuni dinamice
- **JavaScript custom** – validare, modale, chatbot etc.

### Chatbot
- **OpenAI API (GPT-3.5-turbo)** – răspunsuri AI
- **Rule-based chatbot** – răspunsuri rapide pentru întrebări frecvente

---

## Setup rapid

### 1. Setup model AI
```bash
cd ml
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 train_model.py
```

### 2. Testare model în terminal
```bash
python3 predict_price.py <tip> <brand> <stare> <pret_nou>
# Ex: python3 predict_price.py tricou nike nou 200
```

### 3. Configurare server
- Completează fișierul `.env` cu datele necesare (vezi `sample.env`).
- Pentru a crea automat tabelele, setează `force: true` la `sequelize.sync()` (server.js) la prima rulare.

### 4. Pornire server
```bash
npm install
npm start server.js
```

Accesează aplicația la: [http://localhost:3001](http://localhost:3001)

---

## Funcționalități principale
- Autentificare și înregistrare utilizatori (client, vendor, admin)
- Administrare produse (CRUD)
- Recomandare prețuri cu AI
- Chatbot AI integrat (OpenAI + reguli custom)
- Interfață responsive și modernă

---


