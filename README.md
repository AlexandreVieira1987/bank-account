<p align="center">
  <img src="https://mutual.club/assets/images/white-mutual.png" width="320" alt="Mutual Logo" />
</p>


## Descrição

Desafio Mutual - Node TS Developer


## Instalação

```bash
$ docker-compose up
```

## Primeiras ações

```
criar ao menos duas contas bancárias para poder testar a transferência
optei por iniciar o banco limpo para faciliar os tests  
```

## Arquivo postman

```
Na raiz do projeto
```

## Categorização

```bash
Tarefa que despendeu mais tempo
[ ] Codificação
[x] Teste
[ ] Documentação
[ ] Estudo
```

## Testes

```bash
# Testar serviço de contas
$ docker-compose exec challenge-api npm run test -t src/api/services/account.service.spec.ts

# Testar controller de contas
$ docker-compose exec challenge-api npm run test -t src/api/controllers/account.controller.spec.ts

# Testar serviço de transferência
$ docker-compose exec challenge-api npm run test -t src/api/services/transfer.service.spec.t

# Testar controller de transferência
$ docker-compose exec challenge-api npm run test -t src/api/controllers/transfer.controller.spec.ts

# Todos os testes
$ docker-compose exec challenge-api npm run test
```

## Links

<a target="_blank" href="http://localhost:3000/api">Documentação</a>

<a target="_blank" href="https://trello.com/b/irQTHE6W/desafio-mutual">Trelo</a>