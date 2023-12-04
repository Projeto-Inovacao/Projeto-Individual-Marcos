import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class Processador{
    var id: Int = 0
    var nome: String = ""
    var frabricante: String = ""
    var frequencia: Long = 0
    var identificador: String = ""
    var microarquitetura: String = ""
    var uso: Double = 0.0
    var dataHora = LocalDateTime.now()
    val dataHoraFormatada = dataHora.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

}
