Vou criar uma estrutura de diretórios completa com arquivos separados para o projeto MVC em PHP puro. Aqui está a organização:

```
/projeto_mvc/
│
├── index.php             # Front Controller
├── .htaccess             # Configuração para URLs amigáveis
│
├── app/
│   ├── core/
│   │   ├── Application.php
│   │   ├── Controller.php
│   │   └── Model.php
│   │
│   ├── controllers/
│   │   ├── HomeController.php
│   │   └── ...
│   │
│   ├── models/
│   │   ├── ExampleModel.php
│   │   └── ...
│   │
│   └── views/
│       ├── layouts/
│       │   └── main.php
│       │
│       ├── home/
│       │   ├── index.php
│       │   └── about.php
│       │
│       └── errors/
│           └── 404.php
│
└── public/
    ├── assets/
    │   ├── css/
    │   ├── js/
    │   └── img/
    └── index.php          # Ponto de entrada público
```

Agora vou criar cada arquivo separadamente:

1. Primeiro, o arquivo `.htaccess`:

```htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php?url=$1 [L,QSA]
</IfModule>
```

2. `index.php` (front controller):

```php
<?php
// Define constantes de caminho
define('BASE_PATH', realpath(__DIR__));
define('APP_PATH', BASE_PATH . '/app');

// Autoloader
require APP_PATH . '/core/autoload.php';

// Inicia a aplicação
$app = new Application();
$app->run();
```

3. `app/core/autoload.php`:

```php
<?php
spl_autoload_register(function ($className) {
    $file = APP_PATH . '/' . str_replace('\\', '/', $className) . '.php';
    if (file_exists($file)) {
        require $file;
    }
});
```

4. `app/core/Application.php`:

```php
<?php
class Application
{
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];

    public function __construct()
    {
        $url = $this->parseUrl();
        
        // Controller
        if (isset($url[0])) {
            $controllerName = ucfirst($url[0]) . 'Controller';
            if (file_exists(APP_PATH . '/controllers/' . $controllerName . '.php')) {
                $this->controller = $controllerName;
                unset($url[0]);
            }
        }

        require_once APP_PATH . '/controllers/' . $this->controller . '.php';
        $this->controller = new $this->controller;

        // Método
        if (isset($url[1])) {
            if (method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }

        // Parâmetros
        $this->params = $url ? array_values($url) : [];
    }

    public function run()
    {
        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    protected function parseUrl()
    {
        if (isset($_GET['url'])) {
            return explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
        }
        return [];
    }
}
```

5. `app/core/Controller.php`:

```php
<?php
abstract class Controller
{
    protected function render($view, $data = [])
    {
        extract($data);
        require APP_PATH . '/views/' . $view . '.php';
    }

    protected function redirect($url)
    {
        header('Location: ' . $url);
        exit();
    }
}
```

6. `app/core/Model.php`:

```php
<?php
abstract class Model
{
    protected $db;

    public function __construct()
    {
        // Exemplo: configurar conexão PDO
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=seusite', 'usuario', 'senha');
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die('Erro de conexão: ' . $e->getMessage());
        }
    }
}
```

7. `app/controllers/HomeController.php`:

```php
<?php
class HomeController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Página Inicial',
            'message' => 'Bem-vindo ao nosso MVC PHP!'
        ];
        $this->render('home/index', $data);
    }

    public function about()
    {
        $this->render('home/about', ['title' => 'Sobre Nós']);
    }

    public function contact()
    {
        $this->render('home/contact', ['title' => 'Contato']);
    }
}
```

8. `app/views/layouts/main.php`:

```php
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'MVC PHP' ?></title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/home/about">Sobre</a></li>
                <li><a href="/home/contact">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <?php include $content; ?>
    </main>

    <footer>
        <p>&copy; <?= date('Y') ?> MVC PHP</p>
    </footer>
</body>
</html>
```

9. `app/views/home/index.php`:

```php
<div class="container">
    <h1><?= $message ?></h1>
    <p>Esta é a página inicial do nosso sistema MVC em PHP puro.</p>
</div>
```

10. `app/views/home/about.php`:

```php
<div class="container">
    <h1>Sobre Nós</h1>
    <p>Informações sobre nossa empresa e equipe.</p>
</div>
```

11. `app/views/home/contact.php`:

```php
<div class="container">
    <h1>Contato</h1>
    <form method="post">
        <!-- Formulário de contato -->
    </form>
</div>
```

12. `app/views/errors/404.php`:

```php
<div class="error-page">
    <h1>404 - Página Não Encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <a href="/home">Voltar para a página inicial</a>
</div>
```

Para usar este sistema MVC:

1. Coloque todos os arquivos nas pastas correspondentes
2. Configure seu servidor web (Apache/Nginx) para apontar para a pasta pública
3. Acesse no navegador:
   - `/home` para a página inicial
   - `/home/about` para a página sobre
   - `/home/contact` para entrar em contato

Você pode expandir adicionando:
- Mais controllers em `/app/controllers/`
- Mais models em `/app/models/`
- Mais views nas respectivas subpastas de `/app/views/`

O sistema já está configurado com:
- Rotas dinâmicas
- Views com layout principal
- Sistema básico de models (pronto para banco de dados)
- Tratamento básico de erros
- Estrutura organizada para crescimento

Posso detalhar qualquer parte específica deste sistema se precisar!
