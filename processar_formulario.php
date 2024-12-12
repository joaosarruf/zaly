<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php'; // Ajuste o caminho se necessário

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST['nome']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefone = strip_tags(trim($_POST['telefone']));
    $mensagem = trim($_POST['mensagem']);

    if (empty($nome) || empty($email) || empty($telefone) || empty($mensagem)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor SMTP - Ajuste com os dados do seu provedor (ex: SendGrid)
        $mail->isSMTP();
        $mail->Host = 'smtp.sendgrid.net'; // Ex: smtp.sendgrid.net
        $mail->SMTPAuth = true;
        $mail->Username = 'apikey'; // Se usando SendGrid, o username normalmente é "apikey"
        $mail->Password = 'SUA_API_KEY_AQUI'; // Sua API key do SendGrid
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // tls
        $mail->Port = 587;

        // Remetente
        $mail->setFrom('seuemail@seudominio.com', 'Zaly Serviços'); // Ajuste conforme seu domínio verificado no provedor

        // Destinatário
        $mail->addAddress('joaopsarruf@gmail.com', 'Destinatário'); 

        // Conteúdo do E-mail
        $mail->isHTML(false); 
        $mail->Subject = "Novo contato de $nome";
        $mail->Body    = "Nome: $nome\nE-mail: $email\nTelefone: $telefone\nMensagem:\n$mensagem";

        $mail->send();
        echo "Mensagem enviada com sucesso!";
    } catch (Exception $e) {
        echo "Erro ao enviar a mensagem: {$mail->ErrorInfo}";
    }
}
