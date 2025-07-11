// Para pegar apenas os 50 primeiros caracteres de um texto em JavaScript, você pode usar o método .substring() ou .slice(). Aqui está como fazer:

// Exemplo com .substring():

const texto = "Este é um exemplo de texto que será cortado para mostrar apenas os primeiros 50 caracteres.";
const primeiros50 = texto.substring(0, 50);
console.log(primeiros50);

// Exemplo com .slice():

const texto = "Este é um exemplo de texto que será cortado para mostrar apenas os primeiros 50 caracteres.";
const primeiros50 = texto.slice(0, 50);
console.log(primeiros50);

// Exemplo com validação de comprimento:

// Se o texto for menor que 50 caracteres, você pode garantir que ele não quebre:


const texto = "Texto curto.";
const primeiros50 = texto.length > 50 ? texto.slice(0, 50) : texto;
console.log(primeiros50);
