from flask import render_template, flash, redirect, url_for, jsonify, session, request, make_response, json
from flask_login import login_required, current_user

from json import dumps

from app import db
from . import listagem
from ..models import User, Cliente, Projeto

@listagem.route('/<username>', methods=['GET'])
@login_required
def index(username):
    if request.method == 'GET':
        return render_template('listagem/index.html', username=current_user.username)

@listagem.route('/listaProjFuncIndex', methods=['GET', 'POST'])
@login_required
def listaProjFuncIndex():
    pass
    #if request.method == 'POST':
        #lista = Projeto.query.filter(Projeto.usuario.any()).all()
        #lista = Projeto.query.join(TBRelUsuProj).filter().all()
        #return jsonify(listaProjFunc=[e.serializeProjeto() for e in lista])

@listagem.route('/funcionarios', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def funcionarios():
    if request.method == 'GET':
        return render_template('listagem/lista_funcionarios.html')
    elif request.method == 'POST':
        retornarListaFuncionarios = []
        listaFuncionarios = User.query.all()
        return jsonify(listaFuncionarios=[e.serializeFuncionario() for e in listaFuncionarios])
    elif request.method == 'PUT':
        json_data = request.json
        user = User.query.filter_by(id=json_data['id']).first()
        user.is_admin = json_data['perfil']
        user.email = json_data['email']
        user.jornada = json_data['jornada']
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Funcionário atualizado com sucesso!'})
    elif request.method == 'DELETE':
        json_data = request.json
        user = User.query.filter_by(id=json_data['id']).first()
        db.session.delete(user)
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Funcionário excluído com sucesso!'})

@listagem.route('/projetos', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def projetos():
    if request.method == 'GET':
        return render_template('listagem/lista_projetos.html')
    elif request.method == 'POST':
        retornarListaProjetos = []
        listaProjetos = Projeto.query.all()
        return jsonify(listaProjetos=[e.serializeProjeto() for e in listaProjetos])
    elif request.method == 'PUT':
        json_data = request.json
        projeto = Projeto.query.filter_by(id=json_data['id']).first()
        projeto.descricao = json_data['descricao']
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Projeto atualizado com sucesso!'})
    elif request.method == 'DELETE':
        json_data = request.json
        projeto = Projeto.query.filter_by(id=json_data['id']).first()
        db.session.delete(projeto)
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Projeto excluído com sucesso!'})

@listagem.route('/clientes', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
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
