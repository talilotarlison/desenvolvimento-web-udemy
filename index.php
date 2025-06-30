<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Verificador de Par ou Ímpar</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .resultado { margin-top: 20px; font-size: 1.2em; }
  </style>
</head>
<body>
  <h1>Verificador de Par ou Ímpar</h1>
  <form method="post">
    <label for="numero">Digite um número:</label>
    <input type="number" id="numero" name="numero" required>
    <button type="submit">Verificar</button>
  </form>

  <?php
    // Verifica se o formulário foi enviado
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Obtém e sanitiza o valor enviado pelo usuário
        $numero = filter_input(INPUT_POST, 'numero', FILTER_VALIDATE_INT);

        if ($numero === false) {
            echo '<p class="resultado" style="color: red;">Por favor, digite um número inteiro válido.</p>';
        } else {
            // Lógica para verificar paridade
            if ($numero % 2 === 0) {
                $mensagem = "O número {$numero} é <strong>PAR</strong>.";
            } else {
                $mensagem = "O número {$numero} é <strong>ÍMPAR</strong>.";
            }

            // Exibe o resultado
            echo '<p class="resultado">' . $mensagem . '</p>';
        }
    }
  ?>
</body>
</html>
