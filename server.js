const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir o index.html e demais arquivos estáticos da raiz do projeto
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'jpsarruf15@gmail.com',
      pass: 'azge aszu bqhg mcje' // senha de app, não a senha normal do gmail
    }
  });

app.post('/enviar-email', async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !telefone || !mensagem) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  const mailOptions = {
    from: `"Formulário" <${process.env.SMTP_USER}>`,
    to: 'email_da_empresa@exemplo.com',
    subject: `Novo contato de ${nome}`,
    text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem:\n${mensagem}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).send('Erro ao enviar a mensagem.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
