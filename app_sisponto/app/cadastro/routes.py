from flask import render_template, flash, redirect, url_for, jsonify, session, request
from flask_login import login_required, current_user

from sqlalchemy.exc import IntegrityError

from app import db
from . import cadastro
from ..models import User
from ..models import Cliente
from ..models import Projeto

@cadastro.route('/cadastro-cliente', methods=['GET', 'POST'])
def cadastrarCliente():
    if request.method == 'GET':
        return render_template('cadastro/cadastro-cliente.html')
    elif request.method == 'POST':
        try:
            json_data = request.json
            cliente = Cliente(json_data['cpfCnpj'], json_data['nome'], json_data['tipoPessoa'], json_data['email'])
            db.session.add(cliente)
            db.session.commit()
            return jsonify({'result': True, 'mensagem': 'Cliente cadastrado com sucesso!'})
        except IntegrityError:
            return jsonify({'result': False, 'mensagem': 'CPF/CNPJ ou Email já cadastrados.'})
    return jsonify({'result': False, 'mensagem': 'Erro. Tente novamente!'})

@cadastro.route('/cadastro-funcionario', methods=['GET', 'POST'])
@login_required
def cadastrarFuncionario():
    if request.method == 'GET':
        return render_template('cadastro/cadastro-funcionario.html')

@cadastro.route('/cadastro-projeto', methods=['GET', 'POST'])
@login_required
def cadastrarProjeto():
    if request.method == 'GET':
        return render_template('cadastro/cadastro-projeto.html')
    elif request.method == 'POST':
        try:
            json_data = request.json
            projeto = Projeto(json_data['descricao'], json_data['cliente'])
            db.session.add(projeto)
            db.session.commit()
            return jsonify({'result': True, 'mensagem': 'Projeto cadastrado com sucesso!'})
        except Exception as e:
            return jsonify({'result': False, 'mensagem': 'Erro. Tente novamente!'})

@cadastro.route('/funcionario-projeto', methods=['GET', 'POST'])
@login_required
def relacaoFuncionarioProjeto():
    if request.method == 'GET':
        return render_template('cadastro/funcionario-projeto.html')

@cadastro.route('/lancamentos')
@login_required
def lancamentos():
    if request.method == 'GET':
        return render_template('cadastro/lancamentos.html')

@cadastro.route('/alterarsenha')
@login_required
def alterarsenha():
    if request.method == 'GET':
        return render_template('cadastro/alterar-senha.html')