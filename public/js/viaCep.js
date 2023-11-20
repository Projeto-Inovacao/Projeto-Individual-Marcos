async function buscarCep() {
    var cep = input_cep.value
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length >= 8) {
        // fetch(url)
        console.log(
            fetch(url)
        )
        try {
            var resposta = await fetch(url)
            // resposta.json()
            // console.log(resposta)
            if (resposta.ok) {
                var respostaJson = await resposta.json()
                console.log('DADOS RECEBIDOS', respostaJson)
                input_rua.value = respostaJson.logradouro;
                input_bairro.value = respostaJson.bairro;
                input_cidade.value = respostaJson.localidade;
                input_estado.value = respostaJson.uf;
                input_pais.value = "Brasil"

                div_mensagem.innerHTML = JSON.stringify(respostaJson)
            }
        } catch (erro) {
            console.log("Erro", erro)
        }
    }
}
