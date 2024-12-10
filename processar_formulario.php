<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST['nome']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefone = strip_tags(trim($_POST['telefone']));
    $mensagem = trim($_POST['mensagem']);

    // Verifica se os campos estão preenchidos
    if (empty($nome) || empty($email) || empty($telefone) || empty($mensagem)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    // Destinatário e assunto
    $to = "joaopsarruf@gmail.com";
    $subject = "Novo contato de $nome";

    // Corpo do e-mail
    $body = "Nome: $nome\n";
    $body .= "E-mail: $email\n";
    $body .= "Telefone: $telefone\n";
    $body .= "Mensagem:\n$mensagem\n";

    // Cabeçalhos do e-mail
    $headers = "From: $nome <$email>";

    // Envia o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
}
?>
