from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, allowing requests from any origin

# Function to analyze sentiment
def analyze_sentiment(text):
    if not text:
        return 0
    analysis = TextBlob(text)
    return analysis.sentiment.polarity * 100  # Scale to 0-100

@app.route("/sentiment", methods=["POST"])
def sentiment():
    data = request.json
    articles = data.get("articles", [])
    sentiments = []

    for article in articles:
        title = article.get("title", "")
        sentiment_score = analyze_sentiment(title)
        sentiments.append(sentiment_score)

    return jsonify({
        "articles": articles,
        "sentiments": sentiments
    })

if __name__ == "__main__":
    app.run(debug=True)
