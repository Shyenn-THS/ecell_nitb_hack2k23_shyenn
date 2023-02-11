from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    'http://localhost:3000',
])

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/identify')
def detectGender():
    # Get the image file from the request
    if "image" not in request.files:
            return jsonify({'error': 'No image provided'})

    photo = request.files["image"]
    
    gender = detectFacesWithDNN(photo)
    return jsonify({"gender": gender})

if __name__ == '__main__':
    # app.run(host="0.0.0.0", port=80)
    app.run()