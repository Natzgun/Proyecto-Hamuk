from flask import Flask, request, jsonify
from flask_cors import CORS
from chatgepeto import get_response

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "Hello, World desde Flask"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        text = data.get("message")
        if text is None:
            raise ValueError("Formato de solicitud inválido. Falta el campo 'message'.")

        response = get_response(text)
        message = {"answer": response}

        return jsonify(message)
    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 500

    # text = request.get_json().get("message")
    # response = get_response(text)
    # message = {"answer": response}
    # return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
