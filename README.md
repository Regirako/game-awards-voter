# Game Awards 2025 - Sistema de Votação

Um site interativo para votação nos jogos indicados ao Game Awards 2025, com geração de card animado personalizado.

## 🎮 Funcionalidades

- **Página de Votação**: Interface intuitiva para selecionar jogos em diferentes categorias
- **Card Animado**: Geração de card personalizado com efeitos visuais e animações
- **Design Temático**: Interface com tema azul do Game Awards e elementos visuais atrativos
- **Responsivo**: Compatível com dispositivos móveis e desktop
- **Compartilhamento**: Opção para baixar e compartilhar o card de votação

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com animações e gradientes)
- JavaScript (Vanilla)
- Font Awesome (ícones)
- Google Fonts (Montserrat)

## 📁 Estrutura de Arquivos
game-awards-voter/
├── index.html # Página principal de votação
├── results.html # Página do card animado
├── style.css # Estilos principais
├── script.js # Lógica da votação
├── results.js # Lógica do card animado
├── assets/
│ ├── images/ # Imagens dos jogos e logo
│ └── icons/ # Ícones adicionais
└── README.md # Este arquivo


## 🚀 Como Usar

### 1. Configuração Inicial

1. Crie um novo repositório no GitHub
2. Faça upload de todos os arquivos para o repositório
3. Ative o GitHub Pages nas configurações do repositório

### 2. Adicionar Imagens

Para que o projeto funcione corretamente, você precisa adicionar as seguintes imagens na pasta `assets/images/`:

- `logo-game-awards.png` - Logo oficial do Game Awards
- `expedition33.jpg` - Imagem do jogo Expedition 33: Clair Obscur
- `starforge.jpg` - Imagem do jogo Starforge: Legends
- `astral-legends.jpg` - Imagem do jogo Astral Legends Online

**Nota**: Você pode encontrar imagens adequadas na Steam ou usar imagens de placeholder para testes.

### 3. Personalização

Para personalizar o projeto:

1. **Cores**: Edite as variáveis CSS no arquivo `style.css`
2. **Jogos**: Atualize os dados em `results.js` na seção `gamesData`
3. **Categorias**: Modifique as categorias em `index.html` e `script.js`

## 🎯 Como Funciona

### Processo de Votação

1. O usuário seleciona um jogo para cada categoria (Jogo do Ano, Melhor Direção, Melhor Arte)
2. A barra de progresso mostra quantas categorias foram preenchidas
3. Ao completar todas as categorias, o botão "Finalizar Votação" é ativado
4. Ao clicar, os dados são salvos no localStorage e o usuário é redirecionado para a página de resultados

### Card Animado

1. A página de resultados recupera os dados da votação
2. Gera um card com todas as seleções do usuário
3. Destaca o jogo mais votado (que apareceu em mais categorias)
4. Aplica animações de flutuação, brilho e efeitos de partículas
5. Oferece opção de baixar o card como imagem para compartilhamento

## 🌐 Implantação no GitHub Pages

1. Acesse o seu repositório no GitHub
2. Vá em **Settings** > **Pages**
3. Em **Source**, selecione a branch principal (geralmente `main`)
4. Clique em **Save**
5. Seu site estará disponível em: `https://[seu-usuario].github.io/[nome-do-repositorio]/`

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Dispositivos móveis (a partir de 320px)
- Tablets (768px)
- Desktop (1200px+)

## ✨ Recursos Avançados

- **Animações CSS**: Efeitos de hover, transições e animações keyframes
- **Efeitos Visuais**: Gradientes, sombras e filtros de desfoque
- **Interatividade**: Resposta a movimentos do mouse e toque
- **Feedback Visual**: Notificações e confirmações de ações

## 🔧 Solução de Problemas

### Imagens não aparecem
- Verifique se os caminhos das imagens estão corretos
- Certifique-se de que as imagens estão na pasta `assets/images/`

### Animações não funcionam
- Verifique se o navegador suporta as propriedades CSS usadas
- Teste em diferentes navegadores

### GitHub Pages não carrega o site
- Verifique se todos os arquivos foram commitados
- Confirme se o GitHub Pages está configurado corretamente
- Aguarde alguns minutos para a implantação ser concluída

## 📄 Licença

Este projeto é para fins educacionais e de demonstração. Todas as marcas registradas são propriedade de seus respectivos donos.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Desenvolvido com ❤️ para a comunidade de games