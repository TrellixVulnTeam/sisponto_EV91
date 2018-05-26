from flask import render_template, flash, redirect, url_for, jsonify, session, request, make_response, json
from flask_login import login_required, current_user

from json import dumps

from app import db
from . import listagem
from ..models import User
from ..models import Cliente

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

@listagem.route('/clientes', methods=['GET', 'POST', 'PUT', 'DELETE'])
def clientes():
    if request.method == 'GET':
        return render_template('listagem/lista_clientes.html')
    elif request.method == 'POST':
        retornarListaClientes = []
        listaClientes = Cliente.query.all()
        return jsonify(listaClientes=[e.serialize() for e in listaClientes])
    elif request.method == 'PUT':
        json_data = request.json
        cliente = Cliente.query.filter_by(id=json_data['id']).first()
        cliente.email = json_data['email']
        cliente.nome = json_data['nome']
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Cliente atualizado com sucesso!'})
    elif request.method == 'DELETE':
        json_data = request.json
        cliente = Cliente.query.filter_by(id=json_data['id']).first()
        db.session.delete(cliente)
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Cliente excluído com sucesso!'})

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
