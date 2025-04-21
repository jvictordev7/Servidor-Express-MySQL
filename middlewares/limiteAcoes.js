const limiteAcoes = {}; // Objeto para armazenar as contagens por usuário/IP

// Função de middleware para limitar ações
const limitarAcao = (acao) => {
    return (req, res, next) => {
        const usuarioId = req.ip; // Ou poderia ser req.userId ou algo relacionado à sessão de usuário
        const chave = `${usuarioId}_${acao}`;

        // Defina o limite de ações permitidas (exemplo: 1 vez por ação)
        const limite = 1;
        const tempoLimite = 3600000; // 1 hora (em milissegundos)

        if (!limiteAcoes[chave]) {
            limiteAcoes[chave] = {
                count: 0,
                lastAction: Date.now()
            };
        }

        // Verifica se o tempo de limitação foi atingido ou se o número de ações excedeu
        const tempoPassado = Date.now() - limiteAcoes[chave].lastAction;
        if (tempoPassado > tempoLimite) {
            // Se o tempo passou, reinicia a contagem
            limiteAcoes[chave].count = 0;
            limiteAcoes[chave].lastAction = Date.now();
        }

        if (limiteAcoes[chave].count >= limite) {
            return res.status(429).json({ message: 'Limite de ações excedido. Tente novamente mais tarde.' });
        }

        // Incrementa a contagem da ação
        limiteAcoes[chave].count++;
        next();
    };
};

module.exports = limitarAcao;
