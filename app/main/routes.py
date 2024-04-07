from flask import render_template
from app.main import bp

@bp.route("/")
def index():
    return render_template("index.html")

@bp.route("/chat.html")
def chat():
    return render_template("chat.html")

@bp.route("/dashboard.html")
def dashboard():
    return render_template("dashboard.html")