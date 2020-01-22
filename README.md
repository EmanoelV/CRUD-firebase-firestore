# CRUD-firebase-firestore
Uma simples e pequena biblioteca para agilizar no desenvolvimentos de aplicações que necessitem se comunicar com o firestore do firebase,
ela possui todos os métodos de um CRUD: Creat, Read, Update e Delete

Use o arquivo html fornecido aqui para testar os métodos no console do navegador, você pode abrir o console apertando F12 quando estiver com a página aberta no navegador

obs: Os dados são em forma de JSON, exemplo: var data = {nome: "fulano", idade: 17}

# Um script de exemplo com todos os método disponíveis:
    
    const crud = new Crud('users')

    let data = {
        name: "name",
        password: 1234,
        repositories: ['repo1','repo2', 'repo3']
    }

    let id = data.name

    crud.create(data, id)

    crud.read.all()
        .then((res) => console.log("lista de usuários: ", res) )
    crud.read.search("password", "==", 1234)
        .then( (res) => console.log("resutado da busca: ", res) )
    crud.read.id(id)
        .then((res) => console.log("dados de um usuário: ", res) )

    crud.update(id, data)
    crud.update(id, { "element": arrayAdd("repo4") })
    crud.update(id, { "element": arrayRemove("repo1") })
    crud.update(id, { "elemNumber": increment(number) })
    crud.update(id, { "element": del() })

    crud.delete(id)
   
Fique a vontade para fazer perguntas ou dar sugestões
