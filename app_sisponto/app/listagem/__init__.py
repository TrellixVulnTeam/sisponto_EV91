from flask import Blueprint
listagem = Blueprint('listagem', __name__)
from . import routes
