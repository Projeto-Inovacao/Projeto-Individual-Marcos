import psutil
import threading
import time
import keyboard
import socket
import pymssql
import mysql.connector
import json
import requests
from datetime import datetime
from cred import usr, pswd  # Certifique-se de ter o módulo cred com as variáveis usr e pswd definidas

# Configuração da conexão com o MySQL
conexao = mysql.connector.connect(
    host='localhost',
    user='aluno',
    password='sptech',
    database='nocLine'
)

# Cria um objeto de cursor para executar comandos SQL
cursor = conexao.cursor()

def obter_info_processos():
    info_processos = []

    # Obtém a lista de processos e as informações de CPU
    for processo in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        try:
            info = processo.info
            pid = info['pid']
            nome = info['name']
            uso_cpu_processo = info['cpu_percent']

            # Obtém informações sobre o uso de disco para o processo
            try:
                uso_disco = psutil.disk_io_counters(perdisk=False).write_bytes
            except psutil.NoSuchProcess:
                uso_disco = 0

            info_processos.append({
                'pid': pid,
                'nome': nome,
                'uso_cpu': uso_cpu_processo,
                'uso_disco': uso_disco
            })

        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

    return info_processos

def consultar_processo_por_pid(pid):
    comando_sql = "SELECT * FROM processos WHERE pid = %s"
    valores = (pid,)

    try:
        cursor.execute(comando_sql, valores)
        resultado = cursor.fetchone()

        if resultado:
            print(f"Informações do processo com PID {pid}:")
            print(f"PID: {resultado[0]}")
            print(f"Data e Hora: {resultado[1]}")
            print(f"Nome do Processo: {resultado[2]}")
            print(f"Uso de CPU: {resultado[3]}")
            print(f"Gravação em Disco: {resultado[4]}")
            print(f"FK Máquina: {resultado[5]}")
            print(f"FK Empresa: {resultado[6]}")
        else:
            print(f"Processo com PID {pid} não encontrado.")

    except mysql.connector.Error as err:
        print(f"Falha ao consultar processo por PID: {err}")

def inserir_ou_atualizar_processo(processo):
    data_hora = datetime.now()
    comando_sql = "INSERT INTO processos (pid, data_hora, nome_processo, uso_cpu, gravacao_disco, fk_maquinaP, fk_empresaP) VALUES (%s, %s, %s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE data_hora = %s, nome_processo = %s, uso_cpu = %s, gravacao_disco = %s, fk_maquinaP = %s, fk_empresaP = %s"
    valores = (processo['pid'], data_hora, processo['nome'], processo['uso_cpu'], processo['uso_disco'], 1, 1, data_hora, processo['nome'], processo['uso_cpu'], processo['uso_disco'], 1, 1)

    try:
        cursor.execute(comando_sql, valores)
        conexao.commit()
        print(f"Dados inseridos ou atualizados com sucesso para o processo com PID {processo['pid']}")
    except mysql.connector.Error as err:
        print(f"Falha ao inserir ou atualizar dados para o processo com PID {processo['pid']}: {err}")
        conexao.rollback()

def inserir_dados_monitoramento(processo):
    try:
        mydb_server = pymssql.connect(server='52.22.58.174', database='nocline', user='sa', password='urubu100')

        try:
            mycursor_server = mydb_server.cursor()
            sql_query_server = "SELECT id_maquina, fk_empresaM FROM maquina WHERE hostname = %s;"
            mycursor_server.execute(sql_query_server, (hostname,))
            result = mycursor_server.fetchone()

            if result:
                try:
                    if conexao.is_connected():
                        sql_query = "INSERT INTO processos (pid, data_hora, nome_processo, uso_cpu, gravacao_disco, fk_maquinaP, fk_empresaP) VALUES (%s, %s, %s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE data_hora = %s, nome_processo = %s, uso_cpu = %s, gravacao_disco = %s, fk_maquinaP = %s, fk_empresaP = %s"
                        val = (processo['pid'], data_hora, processo['nome'], processo['uso_cpu'], processo['uso_disco'], 1, 1, data_hora, processo['nome'], processo['uso_cpu'], processo['uso_disco'], 1, 1)
                        cursor.execute(sql_query, val)
                        conexao.commit()
                        print(cursor.rowcount, "registros inseridos no banco")
                        print("\r\n")
                    else:
                        print("Não foi possível conectar ao banco.")
                except mysql.connector.Error as e:
                    print("Erro ao inserir dados no banco:", e)
            else:
                print("Resultado não encontrado.")
        finally:
            mycursor_server.close()
            mydb_server.close()
    except pymssql.OperationalError as e:
        print("Erro ao conectar com o servidor MySQLServer:", e)

# Exemplo de uso
while True:
    uso_cpu_anterior = psutil.cpu_percent()
    processos_info = obter_info_processos()
    print(f"Uso de CPU total antes do loop: {uso_cpu_anterior}%")

    for processo in processos_info:
        uso_cpu_processo = processo['uso_cpu']
        inserir_ou_atualizar_processo(processo)
        inserir_dados_monitoramento(processo)

    # Exemplo de consulta por PID (substitua 1234 pelo PID desejado)
    consultar_processo_por_pid(4)

    # Aguarda 10 segundos antes da próxima iteração
    time.sleep(10)
