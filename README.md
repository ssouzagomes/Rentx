# Cadastro de Carros

**Requisitos Funcionais**
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.


**Regras de Negócio**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um administrador.

# Listagem de Carros

**Requisitos Funcionais**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.


**Regras de Negócio**
- O usuário não precisa estar logado no sistema.

# Cadastro de Especificação do Carro
**Requisitos Funcionais**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.


**Regras de Negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de Imagens do Carro

**Requisitos Funcionais**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**Requsitos Não Funcionais**
- Utilizar o multer para upload dos arquivos.

**Regras de Negócio**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de Carro

**Requisitos Funcionais**
- Deve ser possível cadastrar um aluguel.

**Regras de Negócio**
- O aluguel deve ser duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de Carro

**Regras Funcionais**
- Deve ser possível realizar a devolução de um carro.

**Regras de Negócio**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional ao período de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
