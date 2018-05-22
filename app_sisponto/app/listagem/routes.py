from flask import render_template, flash, redirect, url_for, jsonify, session, request
from flask_login import login_required, current_user

from app import db
from . import listagem
from ..models import User

@listagem.route('/<username>', methods=['GET', 'POST'])
@login_required
def index(username):
    if request.method == 'GET':
        return render_template('listagem/index.html', username=current_user.username)

@listagem.route('/funcionarios', methods=['GET', 'POST'])
@login_required
def funcionarios():
    if request.method == 'GET':
        return render_template('listagem/lista_funcionarios.html')

@listagem.route('/projetos', methods=['GET', 'POST'])
@login_required
def projetos():
    if request.method == 'GET':
        return render_template('listagem/lista_projetos.html')

@listagem.route('/clientes', methods=['GET', 'POST'])
@login_required
def clientes():
    if request.method == 'GET':
        return render_template('listagem/lista_clientes.html')

@listagem.route('/relatorios', methods=['GET', 'POST'])
@login_required
def relatorios():
    if request.method == 'GET':
        return render_template('listagem/relatorios.html')

@listagem.route('/historico', methods=['GET', 'POST'])
@login_required
def historico():
    if request.method == 'GET':
        return render_template('listagem/historico.html')
