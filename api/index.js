// 1. Importar o módulo Express
const express = require('express');
const cors = require('cors');






// 2. Criar uma instância do aplicativo Express
const app = express();
app.use(cors({ origin: '*' }));

// 3. Definir a porta em que o servidor irá escutar
// Usamos process.env.PORT para compatibilidade com ambientes de hospedagem (como Heroku)
// ou a porta 3000 como padrão se a variável de ambiente não estiver definida.
const PORT = process.env.PORT || 3000;

// --- Iniciar o Servidor ---

// Faz o aplicativo Express começar a "escutar" por requisições na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/monstros`);
});

// --- Dados Temporários em Memória ---
// Agora os monstros são carregados de um arquivo JSON externo.
const monstros = require('./monstros.json');

// --- Rotas da API ---

// Rota GET para listar todos os monstros
// Quando alguém fizer uma requisição GET para a URL base + '/monstros'
// (ex: http://localhost:3000/monstros), esta função será executada.
app.get('/monstros', (req, res) => {

    const tipoCriatura = req.query.tipo_criatura;
    const pontosVidamax = req.query.pontos_vida_max;
    const pontosVidamin = req.query.pontos_vida_min;
    const buscaTexto = req.query.q;
    
    let result = monstros;

    if (tipoCriatura) {
        result = result.filter(m => m.tipo_criatura == tipoCriatura );
    }
    if (pontosVidamax) {
        result = result.filter(m => m.pontos_vida <= Number(pontosVidamax) );
    }
    if (pontosVidamin) {
        result = result.filter(m => m.pontos_vida >= Number(pontosVidamin) );
    }
    if (buscaTexto) {
        const texto = buscaTexto.toLowerCase();
        result = result.filter(m =>
        (m.nome && m.nome.toLowerCase().includes(texto)) ||
        (m.descricao && m.descricao.toLowerCase().includes(texto)) 
        )
    }
   

    res.json(result);
});
