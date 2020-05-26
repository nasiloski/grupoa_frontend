Nesse projeto foi utilizado react como framework de desenvolvimento.
Algumas libs auxiliares foram adicionadas para facilitar e agilizar o desenvolvimento do projeto
Axios para consultas e requests no backend, react-router-dom para gerenciamento das rotas do frontend,
react-modal para criação de modals no projeto e o react toastify para incluir notificações.
O projeto foi escrito de maneira bem simples visando performance. Poucos componentes foram criados visto ser um sistema 
simples e com poucos requisitos. 
Se eu tivesse mais tempo criaria uma topbar com informações pertinentes ao usuário administrador, opção de gerenciamento de usuarios administrativos
com inclusão edição e permissionamento para usuários de consulta.
Melhoraria a estilização das páginas e adicionaria paginação a lista de alunos.
Os requisitos obrigatórios foram todos entregues.

O projeto todo está na pasta "src"

Cada página de cada rota: Login, edição de alunos, inclusão de alunos e dashboard estão no diretório "pages" junto com cada arquivo css responsável pela página.

Em "assets" estão arquivos de imagem e logo. Na pasta alerts está a integração com o react-toaster.

Na pasta services está o arquivo de configuração do axios para acessar a API do backend.

Para buildar o projeto basta fazer clone no git e ao acessá-lo executar:

Para instalar as dependencias do projeto

yarn install

Yarn build para montar o projeto estático.