# Importa bibliotecas necessárias
import psutil
import threading
import keyboard
import time
import socket
import pymssql
import mysql.connector
import json
from datetime import datetime as dt

# Configuração da conexão com o MySQL
conexao = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Marnn111',
    database='nocLine'
)

mydb = None
cursor = conexao.cursor()

# Define a função para obter informações sobre os processos em execução
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

# Define a função para consultar informações de um processo por PID
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

# Define a função para inserir ou atualizar informações de um processo
def inserir_ou_atualizar_processo(processo):
    data_hora = dt.now()
    comando_sql = "INSERT INTO processos (pid, data_hora, nome_processo, uso_cpu, gravacao_disco, fk_maquinaP, fk_empresaP) VALUES (%s, %s, %s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE data_hora = %s, nome_processo = %s, uso_cpu = %s, gravacao_disco = %s, fk_maquinaP = %s, fk_empresaP = %s"
    valores = (processo['pid'], data_hora, processo['nome'], processo['uso_cpu'], processo['uso_disco'], 1, 1, data_hora, processo['nome'], processo['uso_cpu'], processo['uso_disco'], 1, 1)

    try:
        cursor.execute(comando_sql, valores)
        conexao.commit()
        print(f"Dados inseridos ou atualizados com sucesso para o processo com PID {processo['pid']}")
    except mysql.connector.Error as err:
        print(f"Falha ao inserir ou atualizar dados para o processo com PID {processo['pid']}: {err}")
        conexao.rollback()

# Define a função para inserir dados de monitoramento em um banco SQL Server
def inserir_dados_monitoramento(processo):
    sql_server_cnx = pymssql.connect(
        server='52.22.58.174',
        database='nocline',
        user='sa',
        password='urubu100'
    )

    cursor_sql_server = sql_server_cnx.cursor()

    data_hora = dt.now()

    # Utilizando parâmetros na consulta preparada
    sql_query = (
        "MERGE INTO processos AS target "
        "USING (VALUES (%s, %s, %s, %s, %s, %s, %s)) AS source "
        "(pid, data_hora, nome_processo, uso_cpu, gravacao_disco, fk_maquinaP, fk_empresaP) "
        "ON target.pid = (SELECT pid FROM processos WHERE pid = %s) "
        "WHEN MATCHED THEN "
        "UPDATE SET "
        "data_hora = source.data_hora, "
        "nome_processo = source.nome_processo, "
        "uso_cpu = source.uso_cpu, "
        "gravacao_disco = source.gravacao_disco, "
        "fk_maquinaP = source.fk_maquinaP, "
        "fk_empresaP = source.fk_empresaP "
        "WHEN NOT MATCHED THEN "
        "INSERT (pid, data_hora, nome_processo, uso_cpu, gravacao_disco, fk_maquinaP, fk_empresaP) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s);"
    )

    val = (
        processo['pid'], data_hora, processo['nome'], processo['uso_cpu'],
        processo['uso_disco'], 1, 1, processo['pid'],  # Repetições de valores para o MERGE
        processo['pid'], data_hora, processo['nome'], processo['uso_cpu'],
        processo['uso_disco'], 1, 1
    )

    try:
        cursor_sql_server.execute(sql_query, val)
        sql_server_cnx.commit()
        print(cursor_sql_server.rowcount, "registros inseridos no banco")
        print("\r\n")
    except pymssql.Error as e:
        print("Erro ao inserir dados no banco:", e)
        sql_server_cnx.rollback()
    print(cursor_sql_server.rowcount, "registros inseridos no banco")
    print("\r\n")

# Loop principal
while True:
    uso_cpu_anterior = psutil.cpu_percent()
    processos_info = obter_info_processos()
    print(f"Uso de CPU total antes do loop: {uso_cpu_anterior}%")

    for processo in processos_info:
        uso_cpu_processo = processo['uso_cpu']
        inserir_ou_atualizar_processo(processo)
        inserir_dados_monitoramento(processo)

    consultar_processo_por_pid(4)

    time.sleep(10)
