from flask import render_template, flash, redirect, url_for, jsonify, session, request, make_response, json
from flask_login import login_required, current_user

from json import dumps

from datetime import datetime, timedelta

from app import db
from . import listagem
from ..models import User, Cliente, Projeto, RelUsuProj, RegistroDias, Atividades

@listagem.route('/<username>', methods=['GET'])
@login_required
def index(username):
    if request.method == 'GET':
        return render_template('listagem/index.html', username=current_user.username)

@listagem.route('/listaProjFuncIndex', methods=['GET', 'POST'])
@login_required
def listaProjFuncIndex():
    if request.method == 'POST':
        retornarListaFuncionarios = []
        if current_user.is_admin:
            listaIndex = RelUsuProj.query.all()
        else:
            listaIndex = RelUsuProj.query.filter_by(user_id=current_user.id)
        return jsonify(listaProjFunc=[e.serializeIndex() for e in listaIndex])

@listagem.route('/admin/funcionarios', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def funcionarios():
    if request.method == 'GET':
        if not current_user.is_admin:
            return render_template('listagem/index.html')
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

@listagem.route('/admin/projetos', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def projetos():
    if request.method == 'GET':
        if not current_user.is_admin:
            return render_template('listagem/index.html')
        return render_template('listagem/lista_projetos.html')
    elif request.method == 'POST':
        retornarListaProjetos = []
        listaProjetos = Projeto.query.all()
        return jsonify(listaProjetos=[e.serializeProjeto() for e in listaProjetos])
    elif request.method == 'PUT':
        json_data = request.json
        projeto = Projeto.query.filter_by(id=json_data['id']).first()
        projeto.descricaoProj = json_data['descricao']
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Projeto atualizado com sucesso!'})
    elif request.method == 'DELETE':
        json_data = request.json
        projeto = Projeto.query.filter_by(id=json_data['id']).first()
        db.session.delete(projeto)
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Projeto excluído com sucesso!'})

@listagem.route('/admin/clientes', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def clientes():
    if request.method == 'GET':
        if not current_user.is_admin:
            return render_template('listagem/index.html')
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
        listaCalculos = []
        dictProjetos = {}
        listaRegistrosUsuario = RegistroDias.query.join(Projeto, RegistroDias.projeto_id == Projeto.id).join(Atividades, RegistroDias.atividade_id == Atividades.id).add_columns(RegistroDias.datahr_inicio,RegistroDias.datahr_fim,Projeto.descricaoProj, Atividades.descricaoAtv, RegistroDias.id, Projeto.id).filter(RegistroDias.user_id==current_user.id).all()
        FMT = '%H:%M'
        for registro in listaRegistrosUsuario:
            if not registro[6] in dictProjetos:
                dictProjetos[registro[6]] = 1
            tdelta = datetime.strptime(registro[2].split(' ')[1], FMT) - datetime.strptime(registro[1].split(' ')[1], FMT)
            if tdelta.days < 0:
                tdelta = timedelta(days=0, seconds=tdelta.seconds, microseconds=tdelta.microseconds)
            listaCalculos.append(tdelta)

        matriz = []
        for key in dictProjetos:
            listaHorasEquipe = []
            horasEquipe = RegistroDias.query.filter_by(projeto_id=key).all()
            print(horasEquipe)
            soma = datetime.strptime('00:00', FMT) - datetime.strptime('00:00', FMT)
            listaHorasEquipe.append(key)
            for item in horasEquipe:
                calculoEquipe = datetime.strptime(item.datahr_fim.split(' ')[1], FMT) - datetime.strptime(item.datahr_inicio.split(' ')[1], FMT)
                if calculoEquipe.days < 0:
                    calculoEquipe = timedelta(days=0, seconds=calculoEquipe.seconds, microseconds=calculoEquipe.microseconds)
                soma = soma + calculoEquipe
            listaHorasEquipe.append(soma)
            matriz.append(listaHorasEquipe)
        return render_template('listagem/relatorios.html', listaRegistrosUsuario=listaRegistrosUsuario, listaCalculos=listaCalculos, matriz=matriz)

@listagem.route('/historico', methods=['GET', 'DELETE'])
@login_required
def historico():
    if request.method == 'GET':
        listaRegistrosUsuario = RegistroDias.query.join(Projeto, RegistroDias.projeto_id == Projeto.id).join(Atividades, RegistroDias.atividade_id == Atividades.id).add_columns(RegistroDias.datahr_inicio,RegistroDias.datahr_fim,RegistroDias.descricao,Projeto.descricaoProj, Atividades.descricaoAtv, RegistroDias.id).filter(RegistroDias.user_id==current_user.id).all()
        return render_template('listagem/historico.html', listaRegistrosUsuario=listaRegistrosUsuario)
    elif request.method == 'DELETE':
        json_data = request.json
        registro = RegistroDias.query.filter_by(id=json_data['id']).first()
        db.session.delete(registro)
        db.session.commit()
        return jsonify({'result': True, 'mensagem': 'Lançamento excluído com sucesso!'})