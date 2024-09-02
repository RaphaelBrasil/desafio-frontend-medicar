# Teste Frontend Medicar

## Instruções de Uso

### Pré-requisitos

Certifique-se de ter uma versão do node (=>18) instalada em sua máquina.

### 1. Clone o Repositório

```bash
git clone https://github.com/RaphaelBrasil/desafio-frontend-medicar
cd desafio-frontend-medicar
```

### 2. Construa e Execute os Serviços

#### 2.1 Inicie o Backend Mock

Se preferir iniciar o backend sem utilizar Docker:

```bash
cd ./backend
yarn start
```

Ou, utilizando npm:

```bash
cd ./backend
npm start
```

#### 2.2 Inicie o Frontend

Para iniciar o frontend sem Docker:

```bash
cd ..
yarn build-and-start
```

Ou, utilizando npm:

```bash
cd ..
npm run build-and-start
```

### 3. Acesso aos Serviços

- **Backend:** Acesse o backend em [http://localhost:3000](http://localhost:3000).
- **Frontend:** Acesse o frontend em [http://localhost:4000](http://localhost:4000).

### Observações Importantes

Certifique-se de que as portas 3000 e 4000 em sua máquina não estejam sendo usadas por outros serviços.

### Sobre o Teste

As informações sobre o teste podem ser encontradas em [Desafio Medicar Frontend](https://github.com/Intmed-Software/desafio/tree/master/frontend).
