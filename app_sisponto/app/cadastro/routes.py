from flask import render_template, flash, redirect, url_for, jsonify, session, request
from flask_login import login_required, current_user

from app import db
from . import cadastro
from ..models import User

@cadastro.route('/cadastro-cliente', methods=['GET', 'POST'])
@login_required
def cadastrarCliente():
    if request.method == 'GET':
        return render_template('cadastro/cadastro-cliente.html')

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