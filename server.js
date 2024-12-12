const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware para parsear requisições JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(__dirname));

// Rota para servir o index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuração do transportador SMTP com credenciais hard-coded
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
        user: 'joaopsarruf@gmail.com', // Seu e-mail de envio
        pass: 'azgeaszubqhgmcje'  // Sua senha de app (sem espaços)
    },
    debug: true, // Habilita logs detalhados (opcional)
    logger: true // Exibe logs no console (opcional)
});

// Rota para enviar e-mail de contato
app.post('/enviar-email', async (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !telefone || !mensagem) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    // Configurações do e-mail
    const mailOptions = {
        from: `"Formulário Zaly" <joaopsarruf@gmail.com>`, // Remetente
        to: 'joaopsarruf@gmail.com', // Destinatário (seu e-mail)
        subject: `Novo contato de ${nome}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem:\n${mensagem}`
    };

    try {
        // Envia o e-mail
        await transporter.sendMail(mailOptions);
        res.send('Mensagem enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send('Erro ao enviar a mensagem.');
    }
});

// Rota para enviar e-mail de cotação
app.post('/solicitar-cotacao', async (req, res) => {
    const { cep_origem, cep_destino, peso, tamanho, tipo_quantidade, valor, email_contato, telefone } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!cep_origem || !cep_destino || !peso || !tamanho || !tipo_quantidade || !valor || !email_contato || !telefone) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    // Configurações do e-mail de cotação
    const mailOptions = {
        from: `"Formulário Zaly - Cotação" <joaopsarruf@gmail.com>`, // Remetente
        to: 'joaopsarruf@gmail.com', // Destinatário (seu e-mail)
        subject: `Solicitação de Cotação de ${cep_origem} para ${cep_destino}`,
        text: `
        Novo pedido de cotação:

        CEP de Origem: ${cep_origem}
        CEP de Destino: ${cep_destino}
        Peso da Carga: ${peso} kg
        Tamanho da Carga: ${tamanho} cm
        Tipo e Quantidade da Carga: ${tipo_quantidade}
        Valor da Carga: R$ ${valor}
        E-mail para Contato: ${email_contato}
        Telefone: ${telefone}
        `
    };

    try {
        // Envia o e-mail de cotação
        await transporter.sendMail(mailOptions);
        res.send('Cotação solicitada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail de cotação:', error);
        res.status(500).send('Erro ao enviar a solicitação de cotação.');
    }
});

// Inicia o servidor na porta definida pelo Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
