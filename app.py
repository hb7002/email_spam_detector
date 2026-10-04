from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

with open("spam_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "error": "Please enter an message."
        }), 400

    message_vector = vectorizer.transform([message])

    probabilities = model.predict_proba(message_vector)[0]

    not_spam_probability = probabilities[0] * 100
    spam_probability = probabilities[1] * 100

    prediction = model.predict(message_vector)[0]

    if prediction == 1:
        result = "Spam"
    else:
        result = "Not Spam"

    return jsonify({
        "prediction": result,
        "spam": round(spam_probability, 2),
        "not_spam": round(not_spam_probability, 2)
    })
if __name__ == "__main__":
    app.run(debug=True)