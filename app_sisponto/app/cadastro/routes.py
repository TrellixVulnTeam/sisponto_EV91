from flask import render_template, flash, redirect, url_for, jsonify, session, request
from flask_login import login_required, current_user

from sqlalchemy.exc import IntegrityError

from app import db
from . import cadastro
from ..models import Projeto, RelUsuProj, Cliente, User

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
    elif request.method == 'POST':
        try:
            json_data = request.json
            print(json_data)
            user = User(name=json_data['name'], cpf=json_data['cpf'], email=json_data['email'], password=json_data['password'], jornada=json_data['jornada'], username=json_data['username'], is_admin=json_data['is_admin'])
            db.session.add(user)
            db.session.commit()
            return jsonify({'result': True, 'mensagem': 'Funcionário cadastrado com sucesso!'})
        except Exception as e:
            return jsonify({'result': False, 'mensagem': 'Erro. Tente novamente!'})

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
    elif request.method == 'POST':
        try:
            json_data = request.get_json()
            projeto = Projeto.query.filter_by(id=json_data['id_projeto']).first()
            relUsuProj = RelUsuProj(is_coordenador=json_data['is_coordenador'])
            relUsuProj.usuario = User.query.filter_by(id=json_data['id_user']).first()
            projeto.usuario.append(relUsuProj)
            db.session.commit()
            return jsonify({'result': True, 'mensagem': 'Relação cadastrada com sucesso!'})
        except Exception as e:
            return jsonify({'result': False, 'mensagem': 'Erro!'})

@cadastro.route('/lancamentos')
@login_required
def lancamentos():
    if request.method == 'GET':
        return render_template('cadastro/lancamentos.html')

@cadastro.route('/alterarsenha', methods=['GET', 'PUT'])
@login_required
def alterarsenha():
    if request.method == 'GET':
        return render_template('cadastro/alterar-senha.html')
    elif request.method == 'PUT':
        json_data = request.json
        user = User.query.filter_by(username=current_user.username).first()
        if(user.verify_password(json_data['old'])):
            user.password = json_data['password']
            db.session.commit()
            return jsonify({'result': True, 'mensagem': 'Senha atualizada com sucesso!'})
        else:
            return jsonify({'result': False, 'mensagem': 'Senha atual inválida!'})