import json
from flask import Flask, request, jsonify, render_template
import pandas as pd


app = Flask(__name__)


df = pd.DataFrame()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/expression', methods=['POST'])
def process_expression():

    #data = request.form['expression'] (requête form classique)
    data = request.json['expression'] # requête json (par exemple avec jquery )
    print(data)

    #Ajouter au dataframe la valeur.

    #

    return jsonify(message='expression received')


@app.route('/get-all-data')
def get_alldata():

    df.to_csv('data.csv')

    return jsonify(message="file saved")



if __name__ == "__main__":
    app.run(debug=True)