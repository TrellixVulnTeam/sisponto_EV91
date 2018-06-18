from flask import render_template, flash, redirect, url_for, jsonify, session, request
from flask_login import login_required, current_user

from sqlalchemy.exc import IntegrityError

from app import db
from . import cadastro
from ..models import Projeto, RelUsuProj, Cliente, User, RegistroDias, Atividades

@cadastro.route('/cadastro-cliente', methods=['GET', 'POST'])
def cadastrarCliente():
    if request.method == 'GET':
        if not current_user.is_admin:
            return render_template('listagem/index.html')
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
        if not current_user.is_admin:
            return render_template('listagem/index.html')
        return render_template('cadastro/cadastro-funcionario.html')
    elif request.method == 'POST':
        try:
            json_data = request.json
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
        if not current_user.is_admin:
            return render_template('listagem/index.html')
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
            permissaoCoordenador = RelUsuProj.query.filter_by(user_id=current_user.id, projeto_id=json_data['id_projeto']).first()
            if current_user.is_admin or permissaoCoordenador.is_coordenador:
                projeto = Projeto.query.filter_by(id=json_data['id_projeto']).first()
                relUsuProj = RelUsuProj(user_id=json_data['id_user'], projeto_id=json_data['id_projeto'], is_coordenador=json_data['is_coordenador'])
                relUsuProj.usuario = User.query.filter_by(id=json_data['id_user']).first()
                projeto.usuario.append(relUsuProj)
                db.session.commit()
                return jsonify({'result': True, 'mensagem': 'Relação cadastrada com sucesso!'})
            else:
                return jsonify({'result': True, 'mensagem': 'Apenas Administradores e Coordenadores podem cadastrar'})
        except Exception as e:
            return jsonify({'result': False, 'mensagem': 'Erro!'})

@cadastro.route('/lancamentos', methods=['GET', 'POST'])
@login_required
def lancamentos():
    if request.method == 'GET':
        projetosUsuario = RelUsuProj.query.filter_by(user_id=current_user.id).all()
        atividades = Atividades.query.all()
        return render_template('cadastro/lancamentos.html', projetosUsuario=projetosUsuario, atividades=atividades)
    if request.method == 'POST':
        try:
            json_data = request.get_json()
            idProjeto, descricao, idAtividade = json_data['idProjeto'], json_data['descricao'], json_data['idAtividade']
            dataInicio = json_data['dataInicio']
            horaInicio = json_data['horaInicio']
            dthrInicio = dataInicio + ' ' + horaInicio
            dataFim = json_data['dataFim']
            horaFim = json_data['horaFim']
            if dataInicio > dataFim:
                return jsonify({'result': True, 'mensagem': 'Erro! Data Início maior que Data Fim'})
            dthrFim = dataFim + ' ' + horaFim
            regDias = RegistroDias(dthrInicio, dthrFim, descricao, current_user.id, idProjeto, idAtividade)
            db.session.add(regDias)
            db.session.commit()
            return jsonify({'result': True, 'mensagem': 'Lançamento cadastrado com sucesso, confira em histórico!'})
        except Exception as e:
            return jsonify({'result': False, 'mensagem': 'Erro!'})

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

@cadastro.route('/atividades', methods=['GET', 'POST'])
@login_required
def atividades():
    if request.method == 'GET':
        if not current_user.is_admin:
            return render_template('listagem/index.html')
        return render_template('cadastro/atividades.html')
    elif request.method == 'POST':
        json_data = request.json
        atividade = Atividades()
        atividade.descricaoAtv = json_data['descricao']
        db.session.add(atividade)
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Atividade cadastrada com sucesso!'})