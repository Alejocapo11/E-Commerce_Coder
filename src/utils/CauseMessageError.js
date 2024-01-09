

export const generatorProductError = (product) => {
  return `Todos lo campos son requerios y deben ser valido 😱.
  Lista de campos recibidos en la solicitud:
    - title  : ${product.title}
    - price   : ${product.price}
    - code      : ${product.code}
    `;
}

export const generatorProductIdError = (id) => {
 return `Se debe enviar un identificador valido 😱.
  Valor recibido: ${id}`;
}

