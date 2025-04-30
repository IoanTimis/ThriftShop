import sys
import joblib
import pandas as pd

tip = sys.argv[1]
brand = sys.argv[2]
stare = sys.argv[3]
pret_nou = float(sys.argv[4])  

model = joblib.load("price_model.pkl")

input_df = pd.DataFrame([{
    "tip": tip,
    "brand": brand,
    "stare": stare,
    "pret_nou": pret_nou
}])

predicted_price = model.predict(input_df)[0]
print(round(predicted_price, 2))
