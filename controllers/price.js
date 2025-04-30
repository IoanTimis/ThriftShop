const { spawn } = require('child_process');

//Todo posibil sa adaug si aici middleware pentru a verifica daca utilizatorul este logat

exports.getPriceFromModel = (req, res) => {
    const { tip, brand, stare, pret_nou } = req.body;

    if (!tip || !brand || !stare || !pret_nou) {
        return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
    }

    // Ruleaza scriptul Python cu argumentele primite de la client
    const process = spawn('python3', ['ml/predict_price.py', tip, brand, stare, pret_nou]);

    let result = '';

    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        console.error(`Eroare Python: ${data}`);
    });

    process.on('close', (code) => {
        if (code === 0) {
            res.json({ recommendedPrice: parseFloat(result) });
        } else {
            res.status(500).json({ error: 'Eroare la rularea modelului AI.' });
        }
    });
};
