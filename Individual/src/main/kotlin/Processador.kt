import com.github.britooo.looca.api.core.Looca

fun main() {
    val looca = Looca()

    var Processador = looca.processador

    var ID = Processador.id
    var Nome = Processador.nome
    var Fabricante = Processador.fabricante
    var Frequencia = Processador.frequencia
    var Identificador = Processador.identificador
    var Microarquitetura = Processador.microarquitetura
    var Uso = Processador.uso


    println("""
            ID: $ID 
            Nome: $Nome 
            Fabricante: $Fabricante 
            Frequencia: $Frequencia 
            Identificador: $Identificador 
            Microarquitetura: $Microarquitetura 
            Uso: $Uso 
        """.trimIndent())





}