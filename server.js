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

// Configuração do transportador SMTP usando variáveis de ambiente
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
        user: 'jpsarruf15@gmail.com', // Seu e-mail de envio
        pass: 'azge aszu bqhg mcje'  // Sua senha de app
    }
});

// Rota para enviar e-mail
app.post('/enviar-email', async (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !telefone || !mensagem) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    // Configurações do e-mail
    const mailOptions = {
        from: `"Formulário Zaly" 'jpsarruf15@gmail.com'`, // Remetente
        to: 'jpsarruf15@gmail.com', // Destinatário (e-mail da empresa)
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

// Inicia o servidor na porta definida pelo Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
