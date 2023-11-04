from flask import jsonify
from flask import Flask, request, jsonify, redirect, render_template, send_file
from flask_cors import CORS, cross_origin
from models import create_invoice, get_invoices_paginated
import os
import json
import uuid
from navigate import navigate

# path configurations *******************************************************************************************

navigate()
UPLOAD_FOLDER = 'static'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# static_methods *******************************************************************************************


def add_attribute(dictionary, name, value):
    dictionary[name] = value
    return dictionary

# flask config *******************************************************************************************


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# handlers *******************************************************************************************

queue = []


def prepare_invoice(request):
    data = request.form.to_dict()
    logo_file = request.files.get('logo')

    if data is not None and isinstance(data, dict):
        expected_keys = [
            ('id', ''),
            ('user_token', ''),
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
            items = [add_attribute(item, 'amount', "{:.2f}".format(float(
                item['quantity'])*float(item['rate']))) for item in items if item["description"] != ""]
        except json.JSONDecodeError:
            items = []
        result = {key: data.get(key, default_value)
                  for key, default_value in expected_keys}

        if logo_file:
            logo_filename = os.path.join(
                app.config['UPLOAD_FOLDER'], logo_file.filename)
            logo_file.save(logo_filename)

        queue.append({
            "id": request_id,
            "informations": result,
            "items": items,
            "picture": logo_file.filename
        })
        print(data['user_token'])
        create_invoice(
            data["id"],
            data["user_token"],
            data["company"],
            logo_file.filename,
            data["date"],
            data["payment_terms"],
            data["due_date"],
            data["po_number"],
            data["bills"],
            data["ships"],
            data["tax"],
            data["discount"],
            data["shipping"],
            data["amount_paid"],
            data["currency"],
            items,
            data["balance_due"])

        return request_id
    return None

# server *******************************************************************************************


@app.route('/get_token', methods=['GET'])
@cross_origin()
def get_token():
    return {"token": str(uuid.uuid4())}


@app.route('/print', methods=['POST'])
@cross_origin()
def prepare_print_invoice():
    request_id = prepare_invoice(request)
    if request_id:
        return {"redirectURL": f"http://127.0.0.1:5001/printing_model/{request_id}"}
    return jsonify({'error': 'Invalid JSON format'})


@app.route('/download', methods=['POST'])
@cross_origin()
def prepare_download_invoice():
    request_id = prepare_invoice(request)
    if request_id:
        return {"redirectURL": f"http://127.0.0.1:5001/downloading_model/{request_id}"}
    return jsonify({'error': 'Invalid JSON format'})


@app.route('/printing_model/<id>')
@cross_origin()
def print_invoice(id):
    index_result = [index for index in range(
        len(queue)) if queue[index]["id"] == id]
    if index_result:
        invoice = queue.pop(index_result[0])
        return render_template('./printing_model.html', invoice=invoice)
    else:
        return jsonify({'error': "queue doesn't contain invoice"})


@app.route('/downloading_model/<id>')
@cross_origin()
def download_invoice(id):
    index_result = [index for index in range(
        len(queue)) if queue[index]["id"] == id]
    if index_result:
        invoice = queue.pop(index_result[0])
        return render_template('./downloading_model.html', invoice=invoice)
    else:
        return jsonify({'error': "queue doesn't contain invoice"})


@app.route('/invoice', methods=['POST'])
@cross_origin()
def get_invoices():
    json_data = request.get_json()
    page = json_data.get('page')
    invoice_per_page =json_data.get('invoice_per_page')
    user_token = json_data.get('user_token')
    response = get_invoices_paginated(page, invoice_per_page, user_token)
    if response:
        return response
    else:
        return jsonify({'error': "No invoices found in the specified range."})


# run *******************************************************************************************

if __name__ == '__main__':
    app.run(debug=True, port=5001)
