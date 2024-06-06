<div align="center">

  # Instagram Comment Bot
  Este é um bot simples para o Instagram, desenvolvido em JavaScript. O bot utiliza credenciais fornecidas pelo usuário e realiza comentários em um post específico de forma contínua, com intervalos de 8 minutos entre cada comentário. 

  <img src="https://github.com/GutoVieoli/Bot_Instagram/blob/main/botImg.png" width="45%">
  
</div>

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalação

1. Clone este repositório:

2. Navegue até o diretório do projeto:

3. Instale as dependências necessárias:

    ```bash
    npm install
    ```

## Configuração

1. No arquivo `credentials.json`, preencha com as seguintes informações:

    ```json
    {
        "LOGIN": "User ou Email",
        "SENHA": "Senha da conta",
        "POST_LINK": "Link do post no Instagram"
    }
    ```

2. No arquivo `comentarios.json` preencha com a lista de comentários que deseja utilizar:

    ```json
    {
      "proximo":0,
      "lista":[
        {"ig":"Comentario 1"},
        {"ig":"Outro comentario"},
        {"ig":"Mais Outro"},
        {"ig":"Quantos quiser"}
      ]
    }
    ```

## Uso

1. Execute o bot:

    ```bash
    node index.js
    ```

O bot irá começar a rodar e fará um comentário a cada 8 minutos no post especificado.

## Aviso Legal

Este projeto é apenas para fins educacionais. O uso deste bot pode violar os termos de serviço do Instagram. Use por sua conta e risco.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---
