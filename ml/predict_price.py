import sys
import joblib
import pandas as pd
import os

tip = sys.argv[1].lower().strip()
brand = sys.argv[2].lower().strip()
stare = sys.argv[3].lower().strip()
pret_nou = float(sys.argv[4])  

model_path = os.path.join(os.path.dirname(__file__), "price_model.pkl")
model = joblib.load(model_path)

input_df = pd.DataFrame([{
    "tip": tip,
    "brand": brand,
    "stare": stare,
    "pret_nou": pret_nou
}])

predicted_price = model.predict(input_df)[0]
print(round(predicted_price, 2))
