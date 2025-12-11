// script.js - Lógica da página de votação com todas as categorias

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const votingForm = document.getElementById('votingForm');
    const submitBtn = document.getElementById('submitVote');
    const progressFill = document.getElementById('progressFill');
    const progressCount = document.getElementById('progressCount');
    const totalCategoriesSpan = document.getElementById('totalCategories');
    
    // Dados das categorias do Game Awards 2025 (baseado no G1)
    const categoriesData = [
        {
            id: 'game-of-the-year',
            name: 'Jogo do ano',
            description: 'O jogo mais excepcional em todos os aspectos criativos e técnicos.',
            nominees: [
                'Clair Obscur: Expedition 33',
                'Death Stranding 2: On the beach',
                'Donkey Kong Bananza',
                'Hades 2',
                'Hollow Knight: Silksong',
                'Kingdom Come: Deliverance 2'
            ]
        },
        {
            id: 'best-direction',
            name: 'Melhor direção',
            description: 'Excelência na direção criativa e design de jogos.',
            nominees: [
                'Clair Obscur: Expedition 33',
                'Death Stranding 2: On the beach',
                'Ghost of Yotei',
                'Hades 2',
                'Split Fiction'
            ]
        },
        {
            id: 'best-esports-team',
            name: 'Melhor time de esports',
            description: 'Melhor equipe competitiva em torneios de esports.',
            nominees: [
                "Gen.G - 'League of legends'",
                "NRG - 'Valorant'",
                "Team Falcons - 'Dota 2'",
                "Team Liquid PH - 'Mobile Legends: Bang bang'",
                "Team Vitality - 'Counter Strike 2'"
            ]
        },
        {
            id: 'best-esports-athlete',
            name: 'Melhor atleta de esports',
            description: 'Melhor jogador profissional em competições de esports.',
            nominees: [
                'Brawk',
                'Chovy',
                'Forsaken',
                'Kakeru',
                'Menard',
                'Zywoo'
            ]
        },
        {
            id: 'best-esports-game',
            name: 'Melhor jogo de esports',
            description: 'Melhor jogo para competições profissionais.',
            nominees: [
                "'Counter Strike 2'",
                "'Dota 2'",
                "'League of legends'",
                "'Mobile legends: Bang bang'",
                "'Valorant'"
            ]
        },
        {
            id: 'best-sports-racing',
            name: 'Melhor jogo de esporte/corrida',
            description: 'Melhor jogo de simulação esportiva ou de corrida.',
            nominees: [
                "'FC 26'",
                "'F1 25'",
                "'Mario Kart World'",
                "'Rematch'",
                "'Sonic Racing: CrossWorlds'"
            ]
        },
        {
            id: 'best-strategy-sim',
            name: 'Melhor jogo de simulação/estratégia',
            description: 'Excelência em jogos de estratégia ou simulação.',
            nominees: [
                "'The Alters'",
                "'Final Fantasy Tactics - The Ivalice chronicles'",
                "'Jurassic World Evolution 3'",
                "'Civilization 7'",
                "'Tempest rising'",
                "'Two point museum'"
            ]
        },
        {
            id: 'best-family-game',
            name: 'Melhor jogo para a família',
            description: 'Melhor jogo apropriado para jogar em família.',
            nominees: [
                "'Donkey Kong Bananza'",
                "'Lego Party!'",
                "'Lego Voyagers'",
                "'Mario Kart World'",
                "'Sonic Racing: CrossWorlds'",
                "'Split Fiction'"
            ]
        },
        {
            id: 'innovation-accessibility',
            name: 'Inovação em acessibilidade',
            description: 'Inovações que tornam os jogos mais acessíveis.',
            nominees: [
                "'Assassin's Creed Shadows'",
                "'Atomfall'",
                "'Doom: The dark ages'",
                "'FC 26'",
                "'South of midnight'"
            ]
        },
        {
            id: 'best-action-game',
            name: 'Melhor jogo de ação',
            description: 'Melhor jogo focado em ação e combate.',
            nominees: [
                "'Battlefield 6'",
                "'Doom: The dark ages'",
                "'Hades 2'",
                "'Ninja Gaiden 4'",
                "'Shinobi: Art of vengeance'"
            ]
        },
        {
            id: 'best-fighting-game',
            name: 'Melhor jogo de luta',
            description: 'Melhor jogo de combate um-contra-um.',
            nominees: [
                "'2XKO'",
                "'Capcom Fighting Collection 2'",
                "'Fatal Fury: City of the wolves'",
                "'Mortal Kombat: Legacy kollection'",
                "'Virtua Fighter 5 R.E.V.O. World Stage'"
            ]
        },
        {
            id: 'best-rpg',
            name: 'Melhor jogo de RPG',
            description: 'Melhor jogo de role-playing game.',
            nominees: [
                "'Avowed'",
                "'Clair Obscur: Expedition 33'",
                "'Kingdom Come: Deliverance 2'",
                "'Monster Hunter Wilds'",
                "'The Outer Worlds 2'"
            ]
        },
        {
            id: 'best-action-adventure',
            name: 'Melhor jogo de ação/aventura',
            description: 'Melhor jogo que combina ação e aventura.',
            nominees: [
                "'Death Stranding 2: On the beach'",
                "'Ghost of Yotei'",
                "'Hollow Knight: Silksong'",
                "'Indiana Jones and the great circle'",
                "'Split Fiction'"
            ]
        },
        {
            id: 'most-anticipated',
            name: 'Jogo mais aguardado',
            description: 'O jogo mais aguardado pelos jogadores.',
            nominees: [
                "'007: First light'",
                "'Grand theft auto 6'",
                "'Marvel's Wolverine'",
                "'Resident Evil: Requiem'",
                "'The Witcher 4'"
            ]
        },
        {
            id: 'content-creator-year',
            name: 'Criador de conteúdo do ano',
            description: 'Melhor criador de conteúdo sobre jogos.',
            nominees: [
                'Caedrel',
                'Kai Cenat',
                'Moistcr1tikal',
                'Sakura Miko',
                'The Burnt Peanut'
            ]
        },
        {
            id: 'best-vr-ar',
            name: 'Melhor jogo de realidade virtual/realidade aumentada',
            description: 'Melhor experiência em VR ou AR.',
            nominees: [
                "'Alien: Rogue Incursion'",
                "'Arken Age'",
                "'Ghost town'",
                "'Marvel's Deadpool VR'",
                "'The midnight walk'"
            ]
        },
        {
            id: 'best-debut-indie',
            name: 'Melhor jogo de estreia independente',
            description: 'Melhor primeiro jogo de um estúdio independente.',
            nominees: [
                "'Blue Prince'",
                "'Clair Obscur: Expedition 33'",
                "'Despelote'",
                "'Dispatch'",
                "'Megabonk'"
            ]
        },
        {
            id: 'best-indie-game',
            name: 'Melhor jogo independente',
            description: 'Melhor jogo desenvolvido por estúdio independente.',
            nominees: [
                "'Absolum'",
                "'Ball x Pit'",
                "'Blue Prince'",
                "'Clair Obscur: Expedition 33'",
                "'Hades 2'",
                "'Hollow Knight: Silksong'"
            ]
        },
        {
            id: 'best-multiplayer',
            name: 'Melhor multiplayer',
            description: 'Melhor experiência multiplayer.',
            nominees: [
                "'Arc Raiders'",
                "'Battlefield 6'",
                "'Elden Ring: Nightreign'",
                "'Peak'",
                "'Split Fiction'"
            ]
        },
        {
            id: 'games-for-impact',
            name: 'Games for impact',
            description: 'Jogos com impacto social positivo.',
            nominees: [
                "'Consume me'",
                "'Despelote'",
                "'Lost records: Bloom & rage'",
                "'South of midnight'",
                "'Wanderstop'"
            ]
        },
        {
            id: 'best-community-support',
            name: 'Melhor apoio à comunidade',
            description: 'Melhor suporte pós-lançamento à comunidade.',
            nominees: [
                "'Baldur's Gate 3'",
                "'Final Fantasy 14'",
                "'Fortnite'",
                "'Helldivers 2'",
                "'No man's sky'"
            ]
        },
        {
            id: 'best-narrative',
            name: 'Melhor narrativa',
            description: 'Excelência em narrativa e história.',
            nominees: [
                "'Clair Obscur: Expedition 33'",
                "'Death Stranding 2: On the beach'",
                "'Ghost of Yotei'",
                "'Kingdom Come: Deliverance 2'",
                "'Silent Hill f'"
            ]
        },
        {
            id: 'best-adaptation',
            name: 'Melhor adaptação',
            description: 'Melhor adaptação de jogo para outras mídias.',
            nominees: [
                "'Um filme Minecraft'",
                "'Devil May Cry'",
                "'Splinter Cell: Deathwatch'",
                "'The last of us'",
                "'Until Dawn'"
            ]
        },
        {
            id: 'best-audio-design',
            name: 'Melhor direção de som',
            description: 'Excelência em design de áudio.',
            nominees: [
                "'Battlefield 6'",
                "'Clair Obscur: Expedition 33'",
                "'Death Stranding 2: On the beach'",
                "'Ghost of Yotei'",
                "'Silent Hill f'"
            ]
        },
        {
            id: 'best-score-music',
            name: 'Melhor trilha e música',
            description: 'Excelência em trilha sonora e música original.',
            nominees: [
                "Christopher Larkin - 'Hollow Knight: Silksong'",
                "Darren Korb - 'Hades 2'",
                "Lorien Testard - 'Clair Obscur: Expedition 33'",
                "Toma Otowa - 'Ghost of Yotei'",
                "Woodkid & Ludvig Forssell - 'Death Stranding 2: On the beach'"
            ]
        },
        {
            id: 'best-art-direction',
            name: 'Melhor direção de arte',
            description: 'Excelência em direção de arte e design visual.',
            nominees: [
                "'Clair Obscur: Expedition 33'",
                "'Death Stranding 2: On the beach'",
                "'Ghost of Yotei'",
                "'Hades 2'",
                "'Hollow Knight: Silksong'"
            ]
        },
        {
            id: 'best-mobile-game',
            name: 'Melhor jogo para dispositivos móveis',
            description: 'Melhor jogo desenvolvido para dispositivos móveis.',
            nominees: [
                "'Destiny rising'",
                "'Persona 5: The Phantom X'",
                "'Sonic Rumble'",
                "'Umamusume: Pretty derby'",
                "'Wuthering waves'"
            ]
        },
        {
            id: 'best-ongoing-game',
            name: 'Melhor jogo em atualização',
            description: 'Melhor jogo com suporte contínuo pós-lançamento.',
            nominees: [
                "'Final Fantasy 14'",
                "'Fortnite'",
                "'Helldivers 2'",
                "'Marvel Rivals'",
                "'No man's sky'"
            ]
        },
        {
            id: 'best-performance',
            name: 'Melhor atuação',
            description: 'Melhor performance de voz ou captura de movimento.',
            nominees: [
                "Ben Starr - 'Clair Obscur: Expedition 33'",
                "Charlie Cox - 'Clair Obscur: Expedition 33'",
                "Erika Ishii - 'Ghost of Yotei'",
                "Jennifer English - 'Clair Obscur: Expedition 33'",
                "Konatsu Kato - 'Silent Hill f'",
                "Troy Baker - 'Indiana Jones and the great circle'"
            ]
        }
    ];
    
    // Contadores e estado
    let selectedGames = {};
    let selectedCount = 0;
    const totalCategories = categoriesData.length;
    
    // Inicializar sistema de votos
    let voteStats = JSON.parse(localStorage.getItem('gameAwardsVoteStats')) || {};
    
    // Inicializar categorias
    initCategories();
    
    // Atualizar progresso
    totalCategoriesSpan.textContent = totalCategories;
    updateProgress();
    
    // Função para inicializar as categorias
    function initCategories() {
        categoriesData.forEach(category => {
            // Inicializar categoria no estado
            selectedGames[category.id] = null;
            
            // Inicializar estatísticas se não existirem
            if (!voteStats[category.id]) {
                voteStats[category.id] = {};
                category.nominees.forEach(nominee => {
                    voteStats[category.id][nominee] = 0;
                });
            }
            
            // Criar elemento da categoria
            const categoryElement = createCategoryElement(category);
            votingForm.appendChild(categoryElement);
        });
        
        // Salvar estatísticas atualizadas
        saveVoteStats();
    }
    
    // Função para criar elemento de categoria
    function createCategoryElement(category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.id = `category-${category.id}`;
        
        // Calcular porcentagens para esta categoria
        const totalVotes = calculateTotalVotes(category.id);
        const percentages = calculatePercentages(category.id, totalVotes);
        
        // Criar HTML da categoria
        categoryDiv.innerHTML = `
            <h2><i class="fas fa-award"></i> ${category.name}</h2>
            <p class="category-description">${category.description}</p>
            
            <div class="games-grid">
                ${category.nominees.map((nominee, index) => {
                    const percentage = percentages[nominee] || 0;
                    const imageUrl = getGameImageUrl(nominee);
                    
                    return `
                        <div class="game-card" data-game="${nominee}" data-category="${category.id}">
                            <div class="game-image">
                                <img src="${imageUrl}" alt="${nominee}" onerror="this.src='https://via.placeholder.com/400x200/1a5e2c/ffffff?text=${encodeURIComponent(nominee)}'">
                                <div class="game-overlay">
                                    <button type="button" class="select-btn" data-action="select">Selecionar</button>
                                </div>
                            </div>
                            <div class="game-info">
                                <h3>${nominee}</h3>
                                <div class="vote-bar-container">
                                    <div class="vote-bar">
                                        <div class="vote-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <div class="vote-percentage">${percentage.toFixed(1)}%</div>
                                </div>
                                <div class="game-selected">
                                    <i class="fas fa-check-circle"></i> Selecionado
                                </div>
                            </div>
                            <input type="radio" name="${category.id}" value="${nominee}" class="hidden-radio">
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        // Adicionar eventos aos cards
        setTimeout(() => {
            const gameCards = categoryDiv.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                const selectBtn = card.querySelector('.select-btn');
                const gameName = card.dataset.game;
                const categoryId = card.dataset.category;
                
                selectBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    selectGame(card, gameName, categoryId);
                });
                
                card.addEventListener('click', function(e) {
                    if (!e.target.closest('.select-btn')) {
                        e.preventDefault();
                        selectGame(card, gameName, categoryId);
                    }
                });
            });
        }, 100);
        
        return categoryDiv;
    }
    
    // Função para calcular total de votos em uma categoria
    function calculateTotalVotes(categoryId) {
        const categoryVotes = voteStats[categoryId];
        return Object.values(categoryVotes).reduce((sum, votes) => sum + votes, 0);
    }
    
    // Função para calcular porcentagens
    function calculatePercentages(categoryId, totalVotes) {
        const percentages = {};
        const categoryVotes = voteStats[categoryId];
        
        if (totalVotes > 0) {
            Object.keys(categoryVotes).forEach(nominee => {
                percentages[nominee] = (categoryVotes[nominee] / totalVotes) * 100;
            });
        }
        
        return percentages;
    }
    
    // Função para obter URL da imagem do jogo
    function getGameImageUrl(gameName) {
        // Mapeamento de jogos para imagens da Steam
        const gameImageMap = {
            'Clair Obscur: Expedition 33': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1158690/header.jpg',
            'Death Stranding 2: On the beach': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/header.jpg',
            'Hades 2': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145350/header.jpg',
            'Hollow Knight: Silksong': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/header.jpg',
            'Kingdom Come: Deliverance 2': 'https://cdn.cloudflare.steamstatic.com/steam/apps/3794300/header.jpg',
            'Donkey Kong Bananza': 'https://cdn.cloudflare.steamstatic.com/steam/apps/2778500/header.jpg',
            'Ghost of Yotei': 'https://cdn.cloudflare.steamstatic.com/steam/apps/2778510/header.jpg',
            'Split Fiction': 'https://cdn.cloudflare.steamstatic.com/steam/apps/2778520/header.jpg'
        };
        
        // Tentar encontrar imagem específica
        for (const [key, url] of Object.entries(gameImageMap)) {
            if (gameName.includes(key)) {
                return url;
            }
        }
        
        // Placeholder genérico
        return `https://via.placeholder.com/400x200/1a5e2c/ffffff?text=${encodeURIComponent(gameName.substring(0, 30))}`;
    }
    
    // Função para selecionar um jogo
    function selectGame(card, gameName, categoryId) {
        const categoryCards = document.querySelectorAll(`.game-card[data-category="${categoryId}"]`);
        
        // Remover seleção anterior nesta categoria
        categoryCards.forEach(c => {
            c.classList.remove('selected');
            const radio = c.querySelector('.hidden-radio');
            if (radio) radio.checked = false;
        });
        
        // Adicionar seleção atual
        card.classList.add('selected');
        const radio = card.querySelector('.hidden-radio');
        if (radio) radio.checked = true;
        
        // Atualizar estado
        if (selectedGames[categoryId] === null) {
            selectedCount++;
        }
        selectedGames[categoryId] = gameName;
        
        updateProgress();
        
        // Efeito visual
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'pulse 0.5s';
        }, 10);
    }
    
    // Atualizar barra de progresso
    function updateProgress() {
        const percentage = (selectedCount / totalCategories) * 100;
        progressFill.style.width = `${percentage}%`;
        progressCount.textContent = selectedCount;
        
        // Atualizar botão de envio
        if (selectedCount === totalCategories) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Salvar estatísticas de votos
    function saveVoteStats() {
        localStorage.setItem('gameAwardsVoteStats', JSON.stringify(voteStats));
    }
    
    // Manipular envio do formulário
    votingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar se todas as categorias foram preenchidas
        const allSelected = Object.values(selectedGames).every(game => game !== null);
        
        if (!allSelected) {
            alert('Por favor, selecione uma opção em todas as categorias antes de finalizar.');
            return;
        }
        
        // Atualizar estatísticas de votos
        Object.entries(selectedGames).forEach(([categoryId, gameName]) => {
            if (voteStats[categoryId] && voteStats[categoryId][gameName] !== undefined) {
                voteStats[categoryId][gameName]++;
            }
        });
        
        saveVoteStats();
        
        // Calcular jogo mais votado pelo usuário
        const voteCount = {};
        Object.values(selectedGames).forEach(game => {
            voteCount[game] = (voteCount[game] || 0) + 1;
        });
        
        // Encontrar o jogo com mais votos
        let mostVotedGame = null;
        let maxVotes = 0;
        
        Object.entries(voteCount).forEach(([game, votes]) => {
            if (votes > maxVotes) {
                maxVotes = votes;
                mostVotedGame = game;
            }
        });
        
        // Preparar dados para a próxima página
        const votingData = {
            selections: selectedGames,
            mostVoted: {
                game: mostVotedGame,
                count: maxVotes
            },
            voteStats: voteStats,
            timestamp: new Date().toISOString()
        };
        
        // Salvar no localStorage e redirecionar
        localStorage.setItem('gameAwardsVotes', JSON.stringify(votingData));
        window.location.href = 'results.html';
    });
});