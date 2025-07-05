async function lerJSON() {
  try {
    const response = await fetch('./dados.json');
    const data = await response.json();
    console.log(data); // Saída: [{ nome: 'Ana', idade: 25 }, { nome: 'Carlos', idade: 30 }]
    data.forEach(item => {
      console.log(`Nome: ${item.nome}, Idade: ${item.idade}`);
    });
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
  }
}

lerJSON();

// Para ler um arquivo JSON em JavaScript, você pode usar a função fetch para fazer uma requisição HTTP para o arquivo,
//   ou se estiver trabalhando em um ambiente Node.js, utilizar a função require para importar o arquivo JSON como um módulo. 

// Explicação:

// 1. fetch:
// A função fetch faz uma requisição HTTP para o arquivo JSON. O primeiro .then transforma a resposta em um objeto JavaScript usando response.json(). 
//   O segundo .then recebe os dados processados e permite que você trabalhe com eles. 

// 2. require:
// A função require importa o arquivo JSON como um módulo. O Node.js automaticamente analisa o conteúdo do arquivo e o converte em um objeto JavaScript, que é então atribuído à variável dadosJSON. 

// 3. JSON.parse():
// Se você tiver uma string JSON e precisar convertê-la em um objeto JavaScript, use JSON.parse(string). Por exemplo: const meuObjeto = JSON.parse('{"nome": "João", "idade": 30}');. 

// 4. JSON.stringify():
// Para converter um objeto JavaScript em uma string JSON, use JSON.stringify(objeto). Por exemplo: const minhaStringJSON = JSON.stringify({nome: "Maria", idade: 25});. 
// Exemplo completo com fetch (usando um arquivo local): 
// Suponha que você tenha um arquivo dados.json com o seguinte conteúdo
