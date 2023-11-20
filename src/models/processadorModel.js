var database = require("../database/config");


function buscarUltimasMedidasProcessadorTemp(idMaquina, limite_linhas) {

   
        instrucaoSql = ` SELECT data_hora, frequencia
        FROM componente
        WHERE fk_maquina_componente = ${idMaquina}
        ORDER BY data_hora      
                   limit ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasFrequencia(idMaquina, limite_linhas) {


        instrucaoSql = `  SELECT data_hora, uso_cpu
        FROM processos
        WHERE fk_maquinaP = ${idMaquina}
        ORDER BY data_hora;
                   limit ${limite_linhas}`;
    

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidasProcessadorTemp,
    buscarUltimasMedidasFrequencia
}