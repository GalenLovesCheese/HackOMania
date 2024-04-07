from flask import request
from app.api import bp
from app.model import prompt


@bp.route("/generate")
def generate():
    query = request.args.get("query")
    target = request.args.get("target")

    return prompt(query, target), {"Content-Type": "application/x-ndjson"}
