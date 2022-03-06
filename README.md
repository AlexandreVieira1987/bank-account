<p align="center">
  <img src="https://mutual.club/assets/images/white-mutual.png" width="320" alt="Mutual Logo" />
</p>


## Descrição

Desafio Mutual - Node TS Developer


## Instalação

```bash
$ docker-compose up
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

