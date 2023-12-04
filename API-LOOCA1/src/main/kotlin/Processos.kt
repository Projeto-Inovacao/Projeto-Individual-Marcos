import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class Processos {
    lateinit var nome: String
    var PID: Int = 0
    var usoCPU: Double = 0.0
    var usoMemoria: Double = 0.0
    var memoriaVirtual: Double = 0.0
    var dataHora = LocalDateTime.now()
    val dataHoraFormatada = dataHora.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
}