const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure seu transportador SMTP (use o SMTP do seu provedor de e-mail)
// Exemplo com Gmail:
// Atenção: Para usar Gmail, você precisa criar uma senha de app ou habilitar "less secure apps" (não recomendado)
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
    from: `"Formulário Site" <seu_email_de_envio@gmail.com>`, 
    to: 'recebe@empresa.com',
    subject: `Novo contato de ${nome}`,
    text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem:\n${mensagem}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar a mensagem.');
  }
});

// Sirva seus arquivos estáticos (HTML, CSS, JS) de uma pasta, por exemplo 'public'
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
