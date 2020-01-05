# CRUD-firebase-firestore
Uma simples e pequena biblioteca para agilizar no desenvolvimentos de aplicações que necessitem se comunicar com o firestore do firebase,
ela possui todos os métodos de um CRUD: Creat, Read, Update e Delete

Use o arquivo html fornecido aqui para testar os métodos no console do navegador, você pode abrir o console apertando F12 quando estiver com a página aberta no navegador

obs: Os dados são em forma de JSON, exemplo: var dates = {nome: "fulano", idade: 17}

# A biblioteca possui os seguintes métodos:
    
    crud.creat(collection, dates, id);
    
    crud.read.all(collection, limit=1000);
    crud.read.id(collection, id);
    crud.read.search(collection, element, operator, element2, limit=1000);
    
    crud.update(collection, id, dates);
    crud.update(collection, id, { "element": arrayAdd(elem) });
    crud.update(collection, id, { "element": arrayRemove(elem) });
    crud.update(collection, id, { "element": increment(elem) });
    crud.update(collection, id, { "element": del() })
    
    crud.delete(collection, id)
   
Fique a vontade para fazer perguntas ou dar sugestões
