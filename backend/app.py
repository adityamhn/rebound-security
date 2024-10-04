from quart import Quart

from api import api

app = Quart(__name__)
app.register_blueprint(api, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)