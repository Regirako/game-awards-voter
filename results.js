// results.js - Lógica da página de resultados (ATUALIZADO)

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const dynamicBackground = document.getElementById('dynamicBackground');
    const carouselContainer = document.getElementById('carouselContainer');
    const selectedGameName = document.getElementById('selectedGameName');
    const selectedGameVotes = document.getElementById('selectedGameVotes');
    const gameInfoGrid = document.getElementById('gameInfoGrid');
    const totalCategoriesCount = document.getElementById('totalCategoriesCount');
    const uniqueGamesCount = document.getElementById('uniqueGamesCount');
    const totalVotesCount = document.getElementById('totalVotesCount');
    const completionRate = document.getElementById('completionRate');
    const shareBtn = document.getElementById('shareBtn');
    const newVoteBtn = document.getElementById('newVoteBtn');
    const resultCard = document.getElementById('resultCard');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    
    // Estado do carrossel
    let currentCarouselIndex = 0;
    let topGames = [];
    
    // Mapa de imagens (mesmo do script.js atualizado)
    const gameImages = {
        'Clair Obscur: Expedition 33': 'https://i.imgur.com/BdhoFqu.png',
        'Death Stranding 2: On the Beach': 'https://i.ytimg.com/vi/6cs-A1rNvEE/maxresdefault.jpg',
        'Hades 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1759973532',
        'Hollow Knight: Silksong': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1764916587',
        'Kingdom Come: Deliverance 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/header.jpg?t=1763987645',
        'Donkey Kong Bananza': 'https://www.showmetech.com.br/wp-content/uploads//2025/07/cover-dk-bananza.png',
        'Ghost of Yotei': 'https://levelupnews.com.br/wp-content/uploads/2025/03/img_7850-1.jpg',
        'Split Fiction': 'https://i.imgur.com/gaYkRJB.jpeg',
        'Avowed': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2457220/header.jpg?t=1765372812',
        'Monster Hunter Wilds': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg?t=1765334071',
        'The Outer Worlds 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1449110/fe273e39cbaf4997d1c8e53879800f07dba0ee03/header.jpg?t=1761760147',
        'Indiana Jones and the Great Circle': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2677660/5446adc6c89a73bcbc24c0eed16d8ced7f13f240/header_brazilian.jpg?t=1763745007',
        'Silent Hill f': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2947440/7e5d923ac622bd1775ebc9b5d4b5b0a24bf5ed40/header.jpg?t=1763007193',
        "Assassin's Creed Shadows": 'https://clan.akamai.steamstatic.com/images/45310381/e9cc4f0447ef5bdb9b3c829524731abcb17f4af8_400x225.jpg',
        'Doom: The Dark Ages': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3017860/header.jpg?t=1764606093',
        'Battlefield 6': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2807960/c12d12ce3c7d217398d3fcad77427bfc9d57c570/header.jpg?t=1764700003',
        'Ninja Gaiden 4': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2627260/header.jpg?t=1762366827',
        'Shinobi: Art of Vengeance': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2361770/782c310729ea0fad430124f806e76cff1c5c015e/header.jpg?t=1763988116',
        '2XKO': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZQQNVUNtAnCVGDFFHyBUUZ60B6-wiF-oRHJeQhrylyRJpFKK-TWBtPBFSl0RHYzBeU5cMg5TpS3THf0gNSUNC4TarXtZwizgm94ynKzHs_CTVgJiWVLoHJU_wE4KVHMISA-dYWCWjmAUJNpe0NEliAn6WSsKMBQ6okpcMUeuR8X2OTfqsFOljk2dUZTU/s3840/2xko-nome-oficial-project-l.jpg',
        'Fatal Fury: City of the Wolves': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2492040/header.jpg?t=1762809995',
        'Mortal Kombat: Legacy Kollection': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3454980/24fece3b770962ade1a94dfb3f134befe97469b9/header.jpg?t=1763496851',
        'Virtua Fighter 5 R.E.V.O. World Stage': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3112260/9501a2ea86226e8620f07dd889e1c365e2d32e66/header.jpg?t=1764731674',
        'Capcom Fighting Collection 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2400430/header.jpg?t=1757478014',
        'The Alters': 'https://cdn1.epicgames.com/spt-assets/cbdabb1be05c4501bc3c37538d939bb3/the-alters-1nzq5.jpg',
        'Final Fantasy Tactics - The Ivalice Chronicles': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1004640/2d8e4389e157b62f07bdc7c9468bf04010d574c0/header.jpg?t=1762490936',
        'Jurassic World Evolution 3': 'https://www.jurassicworldevolution.com/og_image.jpg',
        'Civilization 7': 'https://image.api.playstation.com/vulcan/ap/rnd/202408/1323/d4493d2c5081068c00bce351d7d16dfdf2a3f9dbe9d1503c.jpg',
        'Tempest Rising': 'https://upload.wikimedia.org/wikipedia/en/0/02/Tempest_Rising_Steam_header.jpg',
        'Two Point Museum': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2185060/f518d1aa2754296e280ba3fe0d2bd4392fa6e3eb/header.jpg?t=1764687868',
        'Lego Party!': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1969370/bdd135d96ca368b1e1cb4f221052adcd0cfbff61/header.jpg?t=1760031466',
        'Lego Voyagers': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1538550/db718ae2be60558df2ef9fcd65302ad87a6045d4/header.jpg?t=1765323947',
        'Mario Kart World': 'https://static.newgamenetwork.com/Mario-Kart-World-Review_FI.jpg',
        'Sonic Racing: CrossWorlds': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2486820/270b38f7e6b9ccd5bc7213e71c1e7594b22ba5fe/header_alt_assets_0.jpg?t=1764191870',
        'Atomfall': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/801800/header.jpg?t=1762346241',
        'South of Midnight': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1934570/header.jpg?t=1744907120',
        '007: First Light': 'https://www.adrenaline.com.br/wp-content/uploads/2025/12/007-first-light-912x569.webp',
        'Grand Theft Auto 6': 'https://viciados.net/wp-content/uploads/2024/09/GTA-6-Grand-Theft-Auto-VI-Jason-Lucia-Rockstar-Games-2025-1280x720.webp',
        "Marvel's Wolverine": 'https://image.api.playstation.com/vulcan/ap/rnd/202510/0721/0f8097282863ccd07abf4485a2bc733111127e628552207e.jpg',
        'Resident Evil: Requiem': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3764200/d478bccdd167e0d8e1f4760bcad7e6bcbbb3258d/header.jpg?t=1761795352',
        'The Witcher 4': 'https://levelupnews.com.br/wp-content/uploads/2025/06/18004cd0-5a82-437c-9186-b9de20b02b46-1.jpg',
        'Alien: Rogue Incursion': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3655390/0e501987ea970bd9aab9c2959b37f2e442d2079d/header.jpg?t=1759248016',
        'Arken Age': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2274200/header.jpg?t=1764175255',
        'Ghost Town': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2496180/header.jpg?t=1764089384',
        "Marvel's Deadpool VR": 'https://lookaside.fbsbx.com/elementpath/media/?media_id=2536558160012725&version=1749480140&transcode_extension=webp',
        'The Midnight Walk': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2863640/header.jpg?t=1764152671',
        'Blue Prince': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1569580/879ac248a3b548a6bbc32771b950756378e7e922/header.jpg?t=1764595214',
        'Despelote': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2367820/header.jpg?t=1759948341',
        'Dispatch': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2592160/header.jpg?t=1764278303',
        'Megabonk': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3405340/d06cb39a82a703e42541085fc61b42d80904b3f8/header.jpg?t=1760445338',
        'Absolum': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1904480/65f868078425ea29b87cb85075fcd1b3a8b71400/header.jpg?t=1763489963',
        'Ball x Pit': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2062430/a157aa8de4bd9070194ddffb27c31636355dca05/header.jpg?t=1764122366',
        'Arc Raiders': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1808500/04baafaf64a5aa5f46ecda5d71889a4848dc0628/header.jpg?t=1765441443',
        'Elden Ring: Nightreign': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/header.jpg?t=1764808750',
        'Peak': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header.jpg?t=1764003551',
        'Consume Me': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2359120/e8a024adceea4ab8f851274785ec7d62d8bf64fc/header.jpg?t=1758745344',
        'Lost Records: Bloom & Rage': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1902960/header.jpg?t=1762783814',
        'Wanderstop': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1299460/header.jpg?t=1764011216',
        "Baldur's Gate 3": 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/48a2fcbda8565bb45025e98fd8ebde8a7203f6a0/header.jpg?t=1759825106',
        'Final Fantasy 14': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39210/header.jpg?t=1760606311',
        'Fortnite': 'https://i.ytimg.com/vi/adGdyCdvKz4/maxresdefault.jpg',
        'Helldivers 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/10b090a2f39571b0fbf3e3700276ecd857b9c1a8/header_brazilian.jpg?t=1763568660',
        "No Man's Sky": 'https://assets.nuuvem.com/image/upload/t_product_sharing_banner/v1/products/5de7d16585f23656ce0f01bd/sharing_images/iljwhovdsluyadp2exa7.jpg',
        'Um Filme Minecraft': 'https://akamai.sscdn.co/uploadfile/letras/playlists/0/f/0/c/0f0c0051d76042ad8fd1121e742718a1.jpg',
        'Devil May Cry': 'https://static.toiimg.com/thumb/msid-120238144,imgsize-29776,width-400,resizemode-4/120238144.jpg',
        'Splinter Cell: Deathwatch': 'https://nexafeed.com/wp-content/uploads/2025/10/splinter-cell-deathwatch-1024x576.webp',
        'The Last of Us': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiChuLJKh1DQDSgcUfsASo2yBRfXTo2_ObpWlz-GxnXNNYUtmxndk_1QfhQSSjqrPCV3_NC4iRFAcxkUXRW4NdE4uLDy8FMV_GFwBG8SaHKUiNv8TN6JxOxJEq64Wr_EYYCg7fswsJqXMtF8G80dk2V7goMD5_EYA7qjuCj3S5ugzbAxeJWwdOTny9L/s1920/the-last-of-us-serie-hbo-podera-ter-ate-tres-temporadas.jpg',
        'Until Dawn': 'https://i.ytimg.com/vi/-9vA1rIoee8/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD2XvlwP4taq-y0ZohIinLeRNDS_Q',
        'Destiny Rising': 'https://gamingtrend.com/content/images/size/w1200/2025/02/destiny1.jpg',
        'Persona 5: The Phantom X': 'https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/05/Persona-5-The-Phantom-X-Key-Art.jpg?w=1600&h=900&fit=crop',
        'Sonic Rumble': 'https://play-lh.googleusercontent.com/VfbwWSAONEpo5nOe3-KYf7DGv_SWA-AY9_t1gjoPpxsxW29Iyr_LKNwDoJYR3vvtH1XNEPYHj3EVlB_DnHgy=w526-h296-rw',
        'Umamusume: Pretty Derby': 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000071495/453c74766a2e8812397cda3eeba5079f9af2133f8872dfad6caea906d99f8f0a',
        'Wuthering Waves': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3513350/f203fd0d93b74cd157d88d5d8316a581083007bf/header.jpg?t=1763596285',
        'Marvel Rivals': 'https://sm.ign.com/ign_br/news/m/marvel-riv/marvel-rivals-announced-a-6v6-superhero-team-based-free-to-p_8f6k.jpg',
        
        // NOVAS IMAGENS ADICIONADAS
        'Gen.G - League of Legends': 'https://geng.gg/cdn/shop/files/06_2490_R4.jpg?v=1736792371&width=3000',
        'NRG - Valorant': 'https://noticias.maisesports.com.br/wp-content/uploads/2025/10/vrg-campea-valorant-champions-2025.jpg',
        'Team Falcons - Dota 2': 'https://i.ytimg.com/vi/xwY_U5EL55w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDdhvASTy1mHKCnJAlf_bb0_mhxcg',
        'Team Liquid PH - Mobile Legends: Bang Bang': 'https://liquipedia.net/commons/images/thumb/9/94/Team_Liquid_PH_at_MSC_2025.jpg/675px-Team_Liquid_PH_at_MSC_2025.jpg',
        'Team Vitality - Counter Strike 2': 'https://vitality.gg/cdn/shop/articles/CS2_BLAST_AustinMajor_champions_CP_32bf2ec4-84c3-41e0-922f-ef766f1dc0d5.jpg?v=1751307798',
        'Brawk': 'https://www.hotspawn.com/wp-content/uploads/2025/10/NRG-brawk-Odin-the-MVP-at-VALORANT-Champions-2025-1125x633.jpg',
        'Chovy': 'https://noticias.maisesports.com.br/wp-content/uploads/2023/10/chovy-worlds-2023.jpg',
        'Forsaken': 'https://media.suara.com/pictures/1600x840/2025/09/16/28598-jason-f0rsaken-susanto-pro-player-valorant.jpg',
        'Kakeru': 'https://liquipedia.net/commons/images/0/07/Kakeru_Red_Bull_Kumite_2025.jpg',
        'Menard': 'https://liquipedia.net/commons/images/thumb/a/ab/MenaRD_EVO_2025.jpg/600px-MenaRD_EVO_2025.jpg',
        'Zywoo': 'https://liquipedia.net/commons/images/thumb/f/ff/ZywOo_at_BLAST_Open_Spring_2025.jpg/600px-ZywOo_at_BLAST_Open_Spring_2025.jpg',
        'Counter Strike 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861',
        'Dota 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1762820658',
        'League of Legends': 'https://s2.glbimg.com/cg0Yf7KUqt4wFsxoPyeAIUhZMv8=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/Y/L/lIgTd8SVCHPu8lGXmbJg/novo-logo-league-of-legends.jpg',
        'Mobile Legends: Bang Bang': 'https://t2.tudocdn.net/622409?w=1920',
        'Valorant': 'https://cdn.sortiraparis.com/images/1001/66131/1103306-valorant-le-jeu-video-signe-riot-games-est-disponible.jpg',
        'FC 26': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3405690/2d96aa1b06e453cd62dae9029d412f19e61932c3/header.jpg?t=1761904811',
        'F1 25': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3059520/37f833ca5bd3d5c3eec2b411131f3e00f580bbe7/header.jpg?t=1762963192',
        'Rematch': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138720/header.jpg?t=1761052542',
        'Caedrel': 'https://liquipedia.net/commons/images/6/69/Caedrel_Worlds_2024.jpg',
        'Kai Cenat': 'https://gamohol.com/wp-content/uploads/2023/02/kai-cenat.webp',
        'Moistcr1tikal': 'https://win.gg/wp-content/uploads/2021/12/Moistcritical.jpg.webp',
        'Sakura Miko': 'https://cdn.prod.website-files.com/5d7e8885cad5174a2fcb98d7/64ad80a19abfb265fd9dfe81_Sakura%2520Miko.jpeg',
        'The Burnt Peanut': 'https://www.indy100.com/media-library/the-burnt-peanut-won-best-vtuber-at-the-streamer-awards-2025.jpg?id=62291768&width=1200&height=600&coordinates=0%2C11%2C0%2C15',
        'Christopher Larkin - Hollow Knight: Silksong': 'https://f4.bcbits.com/img/0023421569_10.jpg',
        'Darren Korb - Hades 2': 'https://cdn.shopify.com/s/files/1/1226/8792/files/Origins.png?v=1611406904',
        'Lorien Testard - Clair Obscur: Expedition 33': 'https://live-production.wcms.abc-cdn.net.au/1ff88334db86c8fc11b717e42fcd6cd3?impolicy=wcms_crop_resize&cropH=3290&cropW=4935&xPos=0&yPos=90&width=862&height=575',
        'Toma Otowa - Ghost of Yotei': 'https://m.media-amazon.com/images/M/MV5BMGI3OWRiNGUtNWZkNi00YTNiLWEwZjktZGQ2OGUyMDBkOGFlXkEyXkFqcGc@._V1_.jpg',
        'Woodkid & Ludvig Forssell - Death Stranding 2: On the Beach': 'https://cdn.shopify.com/s/files/1/0703/5217/5391/files/hideo-kojima-teams-up-with-woodkid-for-death-stranding-2-on-v0-bxqhxnuhpbbe1-1.jpg?v=1751285799',
        'Ben Starr - Clair Obscur: Expedition 33': 'https://external-preview.redd.it/ben-starr-as-clive-you-will-never-understand-the-burden-of-v0-zziXFu35sUl8xnnSNum5XxThK_fIfSW8RKNaLfJvKZw.png?format=pjpg&auto=webp&s=6ddc6d3b68bcc6a23e61c3707022ca3cc4242a90',
        'Charlie Cox': 'https://www.hollywoodreporter.com/wp-content/uploads/2025/02/GettyImages-2201803981.jpg?crop=0px%2C269px%2C5000px%2C2797px&resize=2000%2C1126',
        'Erika Ishii': 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/erika-ishii.jpg',
        'Jennifer English': 'https://m.media-amazon.com/images/M/MV5BZjg0MTRkMzMtZGNlNi00NjA5LTlkZTgtZDdkZDJiOTRkOTIyXkEyXkFqcGc@._V1_.jpg',
        'Konatsu Kato': 'https://m.media-amazon.com/images/M/MV5BYmZlZjJhYTAtNzNjMi00YmMxLWFhNjEtMDFhMTg0YWMxZGE1XkEyXkFqcGc@._V1_.jpg',
        'Troy Baker': 'https://m.media-amazon.com/images/M/MV5BZjA1YTcxNjktZDhhZi00NDhmLTkyZTYtZWY4OWVmZjA1ZTI4XkEyXkFqcGc@._V1_.jpg'
    };
    
    // Informações detalhadas dos jogos
    const gameDetails = {
        'Split Fiction': {
            genres: ['Ação', 'RPG', 'Ficção Científica'],
            synopsis: 'Jogo de ação com múltiplas realidades e narrativa não-linear. Decisões do jogador afetam diretamente o desenrolar da história em diferentes dimensões.',
            developer: 'Quantum Studios',
            release: 'Q4 2025',
            platform: 'PC, PS5, Xbox Series X/S'
        }
        // Adicione informações para outros jogos conforme necessário
    };
    
    // Recuperar dados da votação
    const votingData = JSON.parse(localStorage.getItem('gameAwardsVotes'));
    
    // Se não houver dados, voltar para a página inicial
    if (!votingData) {
        alert('Nenhum dado de votação encontrado. Redirecionando para a página inicial.');
        window.location.href = 'index.html';
        return;
    }
    
    const { selections, mostVoted } = votingData;
    
    // Calcular top 3 jogos mais votados
    calculateTopGames(selections);
    
    // Inicializar interface
    initializeInterface(selections, mostVoted);
    
    // Configurar botões e eventos
    setupEventListeners();
    
    // Função para calcular os 3 jogos mais votados
    function calculateTopGames(selections) {
        const voteCount = {};
        
        // Contar votos para cada jogo
        Object.values(selections).forEach(game => {
            voteCount[game] = (voteCount[game] || 0) + 1;
        });
        
        // Converter para array e ordenar por votos
        topGames = Object.entries(voteCount)
            .map(([game, votes]) => ({ game, votes }))
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 3);
        
        // Garantir que sempre tenha 3 itens
        while (topGames.length < 3) {
            topGames.push({ 
                game: `Jogo ${topGames.length + 1}`, 
                votes: 0 
            });
        }
    }
    
    // Função para inicializar a interface
    function initializeInterface(selections, mostVoted) {
        // Configurar background dinâmico
        if (mostVoted && mostVoted.game) {
            const bgImage = getGameImageUrl(mostVoted.game);
            dynamicBackground.style.backgroundImage = `url('${bgImage}')`;
        }
        
        // Inicializar carrossel
        initializeCarousel();
        
        // Exibir detalhes do jogo selecionado
        updateGameDetails(topGames[0]);
        
        // Atualizar estatísticas
        updateStats(selections);
    }
    
    // Função para inicializar o carrossel
    function initializeCarousel() {
        carouselContainer.innerHTML = '';
        
        topGames.forEach((gameData, index) => {
            const card = document.createElement('div');
            card.className = `carousel-card ${index === 0 ? 'active' : index === 1 ? 'right' : 'left'}`;
            card.dataset.index = index;
            
            const imageUrl = getGameImageUrl(gameData.game);
            
            card.innerHTML = `
                <div class="carousel-rank">${index + 1}</div>
                <div class="carousel-image">
                    <img src="${imageUrl}" 
                         alt="${gameData.game}"
                         onerror="this.src='https://via.placeholder.com/300x140/1a5e2c/ffffff?text=${encodeURIComponent(gameData.game.substring(0, 30))}'">
                </div>
                <div class="carousel-content">
                    <div class="carousel-game-name">${gameData.game}</div>
                    <div class="carousel-vote-count">${gameData.votes} ${gameData.votes === 1 ? 'categoria' : 'categorias'}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                if (index !== currentCarouselIndex) {
                    goToCarouselIndex(index);
                }
            });
            
            carouselContainer.appendChild(card);
        });
    }
    
    // Função para atualizar detalhes do jogo
    function updateGameDetails(gameData) {
        if (!gameData) return;
        
        selectedGameName.textContent = gameData.game;
        selectedGameVotes.textContent = `Indicado em ${gameData.votes} ${gameData.votes === 1 ? 'categoria' : 'categorias'}`;
        
        // Informações detalhadas do jogo
        const details = gameDetails[gameData.game] || {
            genres: ['Gênero não disponível'],
            synopsis: 'Informações detalhadas não disponíveis para este jogo.',
            developer: 'Desenvolvedor não especificado',
            release: 'Data não anunciada',
            platform: 'Plataformas não definidas'
        };
        
        gameInfoGrid.innerHTML = `
            <div class="info-card">
                <div class="info-icon"><i class="fas fa-gamepad"></i></div>
                <div class="info-value">${details.genres.slice(0, 2).join(', ')}</div>
                <div class="info-label">Gêneros</div>
            </div>
            <div class="info-card">
                <div class="info-icon"><i class="fas fa-building"></i></div>
                <div class="info-value">${details.developer}</div>
                <div class="info-label">Desenvolvedor</div>
            </div>
            <div class="info-card">
                <div class="info-icon"><i class="fas fa-calendar-alt"></i></div>
                <div class="info-value">${details.release}</div>
                <div class="info-label">Lançamento</div>
            </div>
            <div class="info-card">
                <div class="info-icon"><i class="fas fa-desktop"></i></div>
                <div class="info-value">${details.platform}</div>
                <div class="info-label">Plataformas</div>
            </div>
        `;
    }
    
    // Função para atualizar estatísticas
    function updateStats(selections) {
        const categoriesCount = Object.keys(selections).length;
        const uniqueGames = new Set(Object.values(selections)).size;
        const totalVotes = Object.values(selections).length;
        const completionPercentage = Math.round((categoriesCount / 30) * 100);
        
        totalCategoriesCount.textContent = categoriesCount;
        uniqueGamesCount.textContent = uniqueGames;
        totalVotesCount.textContent = totalVotes;
        completionRate.textContent = `${completionPercentage}%`;
    }
    
    // Função para navegar no carrossel
    function goToCarouselIndex(index) {
        const cards = document.querySelectorAll('.carousel-card');
        const newIndex = (index + topGames.length) % topGames.length;
        
        // Atualizar classes dos cards
        cards.forEach((card, i) => {
            card.className = 'carousel-card';
            
            if (i === newIndex) {
                card.classList.add('active');
            } else if (i === (newIndex + 1) % topGames.length) {
                card.classList.add('right');
            } else {
                card.classList.add('left');
            }
        });
        
        currentCarouselIndex = newIndex;
        
        // Atualizar detalhes do jogo
        updateGameDetails(topGames[newIndex]);
    }
    
    // Função para obter URL da imagem
    function getGameImageUrl(gameName) {
        // Verifica se há URL específica no mapa
        if (gameImages[gameName]) {
            return gameImages[gameName];
        }
        
        // Remove informações extras
        const cleanGameName = gameName.split(' - ')[0];
        if (gameImages[cleanGameName]) {
            return gameImages[cleanGameName];
        }
        
        // Placeholder genérico
        return `https://via.placeholder.com/300x140/1a5e2c/ffffff?text=${encodeURIComponent(cleanGameName.substring(0, 30))}`;
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Navegação do carrossel
        carouselPrev.addEventListener('click', () => {
            goToCarouselIndex(currentCarouselIndex - 1);
        });
        
        carouselNext.addEventListener('click', () => {
            goToCarouselIndex(currentCarouselIndex + 1);
        });
        
        // Botão de screenshot - CORRIGIDO
        shareBtn.addEventListener('click', captureScreenshot);
        
        // Botão de nova votação
        newVoteBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        // Adicionar suporte a teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToCarouselIndex(currentCarouselIndex - 1);
            } else if (e.key === 'ArrowRight') {
                goToCarouselIndex(currentCarouselIndex + 1);
            }
        });
    }
    
    // Função para capturar screenshot - MELHORADA
    function captureScreenshot() {
        // Verificar se html2canvas está carregado
        if (typeof html2canvas === 'undefined') {
            alert('A funcionalidade de captura está carregando. Por favor, tente novamente em alguns segundos.');
            return;
        }
        
        // Desabilitar botão e mostrar feedback
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Capturando...';
        shareBtn.disabled = true;
        
        // Temporariamente esconder botões de navegação do carrossel
        const carouselNavs = document.querySelectorAll('.carousel-nav');
        const originalNavStyles = [];
        carouselNavs.forEach(nav => {
            originalNavStyles.push(nav.style.display);
            nav.style.display = 'none';
        });
        
        // Configurações otimizadas para html2canvas
        const config = {
            backgroundColor: '#0a2810',
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true,
            removeContainer: true,
            onclone: function(clonedDoc) {
                // Ajustar estilos no clone para screenshot
                const clonedCard = clonedDoc.getElementById('resultCard');
                const clonedBody = clonedDoc.body;
                
                if (clonedCard) {
                    // Remover scrollbar
                    clonedCard.style.overflow = 'visible';
                    clonedCard.style.maxHeight = 'none';
                    
                    // Aumentar sombra para destaque
                    clonedCard.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 100px rgba(46, 204, 113, 0.4)';
                    
                    // Destacar borda
                    clonedCard.style.border = '3px solid var(--gold)';
                    
                    // Remover animação pulsante
                    const detailsSection = clonedDoc.querySelector('.game-details-section');
                    if (detailsSection) {
                        detailsSection.style.animation = 'none';
                    }
                }
                
                if (clonedBody) {
                    // Garantir que o fundo está visível
                    clonedBody.style.background = 'radial-gradient(ellipse at top, #0a2810 0%, #0a2010 100%)';
                }
            }
        };
        
        // Capturar screenshot após pequeno delay
        setTimeout(() => {
            html2canvas(resultCard, config)
                .then(canvas => {
                    // Restaurar navegação do carrossel
                    carouselNavs.forEach((nav, index) => {
                        nav.style.display = originalNavStyles[index];
                    });
                    
                    // Converter para data URL
                    const imageData = canvas.toDataURL('image/png', 1.0);
                    
                    // Criar link para download
                    const link = document.createElement('a');
                    const date = new Date();
                    const fileName = `Game-Awards-Result-${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}.png`;
                    
                    link.download = fileName;
                    link.href = imageData;
                    
                    // Disparar download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Restaurar botão
                    shareBtn.innerHTML = originalText;
                    shareBtn.disabled = false;
                    
                    // Mostrar notificação
                    showNotification('Screenshot salvo com sucesso! Verifique sua pasta de downloads.', 'success');
                    
                }).catch(error => {
                    console.error('Erro ao capturar screenshot:', error);
                    
                    // Restaurar navegação do carrossel
                    carouselNavs.forEach((nav, index) => {
                        nav.style.display = originalNavStyles[index];
                    });
                    
                    // Restaurar botão
                    shareBtn.innerHTML = originalText;
                    shareBtn.disabled = false;
                    
                    // Mensagem alternativa
                    showNotification('Erro ao capturar screenshot. Use a ferramenta de print do seu navegador (Ctrl+P).', 'error');
                });
        }, 1000);
    }
    
    // Mostrar notificação
    function showNotification(message, type = 'success') {
        // Remover notificações anteriores
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        const bgColor = type === 'success' 
            ? 'linear-gradient(135deg, var(--accent-green), var(--secondary-green))' 
            : 'linear-gradient(135deg, #ff6b6b, #c44569)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            max-width: 350px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}" style="font-size: 1.2rem;"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Adicionar animações CSS se necessário
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Garantir que o card esteja completamente visível
    setTimeout(() => {
        resultCard.scrollTop = 0;
        resultCard.style.animation = 'none';
    }, 100);
});