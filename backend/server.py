from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS, cross_origin
import os
import json
import uuid

def add_attribute(dictionary, name, value):
    dictionary[name] = value
    return dictionary

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

UPLOAD_FOLDER = 'static'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

queue = []


@app.route('/process_json', methods=['POST'])
@cross_origin()
def process_json():
    data = request.form.to_dict()
    logo_file = request.files.get('logo')

    if data is not None and isinstance(data, dict):
        expected_keys = [
            ('id', ''),
            ('company', ''),
            ('date', ''),
            ('payment_terms', ''),
            ('due_date', ''),
            ('po_number', ''),
            ('bills', ''),
            ('ships', ''),
            ('items', []),
            ('tax', 0),
            ('discount', 0),
            ('shipping', 0),
            ('amount_paid', 0),
            ('total_ht', 0),
            ('total_ttc', 0),
            ('balance_due', 0),
            ('currency', 0),
        ]

        request_id = str(uuid.uuid4())

        items = data.get('items', '[]')

        try:
            items = json.loads(items)
            items = [add_attribute(item,'amount',"{:.2f}".format(float(item['quantity'])*float(item['rate']))) for item in items if item["description"]!=""]
        except json.JSONDecodeError:
            items = []
        result = {key: data.get(key, default_value) for key, default_value in expected_keys}
        

        if logo_file:
            logo_filename = os.path.join(app.config['UPLOAD_FOLDER'], logo_file.filename)
            logo_file.save(logo_filename)

        queue.append({
            "id": request_id,
            "informations": result,
            "items": items,
            "picture": logo_file.filename
        })
        return {"redirectURL": f"http://127.0.0.1:5001/model/{request_id}"}
    
    return jsonify({'error': 'Invalid JSON format'})

@app.route('/model/<id>')
@cross_origin()
def get_model(id):
    invoice = [item for item in queue if item["id"] == id]
    if invoice:
        return render_template('./model.html',invoice=invoice[0])
    else:
        return jsonify({'error': "queue doesn't contain invoice"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
