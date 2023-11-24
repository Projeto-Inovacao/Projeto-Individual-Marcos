import com.fasterxml.jackson.databind.ObjectMapper
import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.janelas.Janela
import com.github.britooo.looca.api.group.processos.Processo
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.queryForList
import org.springframework.jdbc.core.queryForObject
import java.time.LocalDate
import java.time.LocalDateTime

class DadosRepositorios {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
    }


    fun cadastrarProcessador(novoProcessador: Processador, id_maquina: Int, fk_empresa: Int) {

        var rowComponentes = jdbcTemplate.update(
            """
                insert into especificacao (id_especificacao,identificador, fabricante,frequencia,microarquitetura, fk_componente_especificacao , fk_maquina_especificacao, fk_empresa_especificacao) values
                (${novoProcessador.id},'${novoProcessador.identificador}','${novoProcessador.frabricante}','${novoProcessador.frequencia}','${novoProcessador.microarquitetura}',2,$id_maquina,$fk_empresa)
            """
        );

        var rowMonitoramento = jdbcTemplate.update(
            """
                insert into monitoramento (dado_coletado, data_hora, descricao, fk_componentes_monitoramento, fk_maquina_monitoramento, fk_empresa_monitoramento, fk_unidade_medida) values
                (?,?,"cpu individual marcos",2,$id_maquina,$fk_empresa,2)
            """,
            novoProcessador.uso,
            novoProcessador.dataHora
        )

        println(
            """
            $rowComponentes query de componente enviados foi registrado no banco
            $rowMonitoramento query de monitoramento recebidos foi registrado no banco
        """.trimIndent()
        )

    }

    fun cadastrarProcesso(novoProcesso: MutableList<Processo>?, id_maquina: Int, fk_empresa: Int) {
        val processosNoBanco = jdbcTemplate.queryForList(
            "SELECT pid FROM processos where fk_maquinaP = $id_maquina and fk_empresaP = $fk_empresa",
            Int::class.java
        )

        val pidsListados = novoProcesso?.map { it.pid }

        novoProcesso?.forEach { p ->
            if (p.pid != null && (pidsListados == null || pidsListados.contains(p.pid))) {
                val validacao = validarProcesso(p.pid, id_maquina, fk_empresa)

                if (validacao) {
                    val pid = p.pid
                    val processoExiste = processosNoBanco.contains(pid)

                    if (processoExiste) {
                        val queryProcesso = jdbcTemplate.update(
                            """
                        UPDATE processos
                        SET uso_cpu = ?,
                            uso_memoria = ?,
                            memoria_virtual = ?,
                            status_abertura = ?
                        WHERE PID = ? and fk_maquinaP = $id_maquina and fk_empresaP = $fk_empresa
                        """,
                            p.usoCpu,
                            p.usoMemoria,
                            p.memoriaVirtualUtilizada,
                            true,
                            pid
                        )
                        println("$queryProcesso registro atualizado na tabela de processos")
                    }
                } else {
                    val queryProcesso = jdbcTemplate.update(
                        """
                    INSERT INTO processos (PID, uso_cpu, uso_memoria, memoria_virtual, status_abertura, fk_maquinaP, fk_empresaP)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                        p.pid,
                        p.usoCpu,
                        p.usoMemoria,
                        p.memoriaVirtualUtilizada,
                        true,
                        id_maquina,
                        fk_empresa
                    )
                    println("$queryProcesso registro inserido na tabela de processos")
                }
            }
        }

        if (pidsListados != null && pidsListados.isNotEmpty()) {
            val placeholders = pidsListados.map { "?" }.joinToString(", ")
            val updateQuery = "UPDATE processos SET status_abertura = false WHERE PID NOT IN ($placeholders) and fk_maquinaP = $id_maquina"
            val queryProcesso = jdbcTemplate.update(updateQuery, *pidsListados.toTypedArray())
            println("$queryProcesso registros atualizados na tabela de processos")
        }
    }

    fun validarProcesso(pid: Int, id_maquina: Int, fk_empresa: Int): Boolean {
        val queryValidacao = jdbcTemplate.queryForObject(
            "SELECT count(*) FROM processos WHERE pid = ? and fk_maquinaP = $id_maquina and fk_empresaP = $fk_empresa",
            Int::class.java,
            pid
        )
        return queryValidacao > 0
    }

    fun capturarDadosProcessador(looca: Looca): Processador {
        var novoProcessador = Processador()

        novoProcessador.identificador = looca.processador.identificador
        novoProcessador.microarquitetura = looca.processador.microarquitetura
        novoProcessador.frabricante = looca.processador.fabricante
        novoProcessador.frequencia = looca.processador.frequencia
        novoProcessador.nome = looca.processador.nome
        novoProcessador.uso = looca.processador.uso

        return novoProcessador
    }

    fun capturarDadosP(looca: Looca): MutableList<Processo>? {
        val processos = looca.grupoDeProcessos
        var listaProcessos = processos.processos
        return listaProcessos
    }


}


