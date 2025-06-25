import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Citire date si normalizare la lowercase

df = pd.read_csv("data.csv")
for col in ["tip", "brand", "stare"]:
    df[col] = df[col].str.lower().str.strip()

X = df[["tip", "brand", "stare", "pret_nou"]]
y = df["pret"]

preprocessor = ColumnTransformer([
    ('categorical', OneHotEncoder(), ["tip", "brand", "stare"])
], remainder='passthrough')  

model = Pipeline([
    ('preproc', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

model.fit(X, y)

joblib.dump(model, "price_model.pkl")
print("Model antrenat și salvat.")
