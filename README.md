# ThriftShop
Online second hand store

# Setup models
open project folder

cd ml

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

# Train model

python3 train_model.py

# Testare in terminal

python3 predict_price.py <nume produs (tricou,bluza,etc)> <brand (nike,puma,etc)> <stare (nou, folosit, uzat)>

Exemplu: python3 predict_price.py tricou Nike nou 200



