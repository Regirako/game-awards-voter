// script.js - Lógica da votação por categoria

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const categoryNavigation = document.getElementById('categoryNavigation');
    const currentCategoryContainer = document.getElementById('currentCategoryContainer');
    const prevCategoryBtn = document.getElementById('prevCategoryBtn');
    const nextCategoryBtn = document.getElementById('nextCategoryBtn');
    const finalizeVoteBtn = document.getElementById('finalizeVoteBtn');
    const progressFill = document.getElementById('progressFill');
    const progressCount = document.getElementById('progressCount');
    const totalCategoriesCount = document.getElementById('totalCategoriesCount');
    const currentCategoryNumber = document.getElementById('currentCategoryNumber');
    const totalCategoriesSpan = document.getElementById('totalCategories');
    
    // MAPA DE IMAGENS DOS JOGOS (ATUALIZADO COM SUAS URLs)
    const gameImages = {
        'Clair Obscur: Expedition 33': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header.jpg?t=1762765069',
        'Death Stranding 2: On the Beach': 'https://i.ytimg.com/vi/6cs-A1rNvEE/maxresdefault.jpg',
        'Hades 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1759973532',
        'Hollow Knight: Silksong': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1764916587',
        'Kingdom Come: Deliverance 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/header.jpg?t=1763987645',
        'Donkey Kong Bananza': 'https://i.ytimg.com/vi/vgJ7J70RTKo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbSkuovuyhJ3lilPAGalUCVBR7og',
        'Ghost of Yotei': 'https://levelupnews.com.br/wp-content/uploads/2025/03/img_7850-1.jpg',
        'Split Fiction': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2001120/header.jpg?t=1763484567',
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
        'The Alters': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1601570/53ebf6abda9fed04afba6ec1e8b93744cafe04a7/capsule_616x353.jpg?t=1763565704',
        'Final Fantasy Tactics - The Ivalice Chronicles': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1004640/2d8e4389e157b62f07bdc7c9468bf04010d574c0/header.jpg?t=1762490936',
        'Jurassic World Evolution 3': 'https://www.jurassicworldevolution.com/og_image.jpg',
        'Civilization 7': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1295660/header.jpg?t=1762277940',
        'Tempest Rising': 'https://upload.wikimedia.org/wikipedia/en/0/02/Tempest_Rising_Steam_header.jpg',
        'Two Point Museum': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2185060/f518d1aa2754296e280ba3fe0d2bd4392fa6e3eb/header.jpg?t=1764687868',
        'Lego Party!': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1969370/bdd135d96ca368b1e1cb4f221052adcd0cfbff61/header.jpg?t=1760031466',
        'Lego Voyagers': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1538550/db718ae2be60558df2ef9fcd65302ad87a6045d4/header.jpg?t=1765323947',
        'Mario Kart World': 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000095431/b664445df3f7a3765a760822d725ea1853bc6f43d2aa96ccee81d6f45cb281ef',
        'Sonic Racing: CrossWorlds': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2486820/270b38f7e6b9ccd5bc7213e71c1e7594b22ba5fe/header_alt_assets_0.jpg?t=1764191870',
        'Atomfall': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/801800/header.jpg?t=1762346241',
        'South of Midnight': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1934570/header.jpg?t=1744907120',
        '007: First Light': 'https://www.adrenaline.com.br/wp-content/uploads/2025/12/007-first-light-912x569.webp',
        'Grand Theft Auto 6': 'https://stories.cnnbrasil.com.br/wp-content/uploads/sites/9/2025/01/image_af9532.png',
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
        "No Man's Sky": 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/5123063ede60c6db0f79497774f00de784db7358/header_alt_assets_25.jpg?t=1763984433',
        'Um Filme Minecraft': 'https://akamai.sscdn.co/uploadfile/letras/playlists/0/f/0/c/0f0c0051d76042ad8fd1121e742718a1.jpg',
        'Devil May Cry': 'https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQokw-UFDcTGSOVLQKggWPpoAalrqT13KvtflIt9eV18K1T7x7chjziDFP3j9O3sC8ALGhbcIDBUfq6uslirp9oI6uZt_1iNrrou.jpg?r=47d',
        'Splinter Cell: Deathwatch': 'https://nexafeed.com/wp-content/uploads/2025/10/splinter-cell-deathwatch-1024x576.webp',
        'The Last of Us': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiChuLJKh1DQDSgcUfsASo2yBRfXTo2_ObpWlz-GxnXNNYUtmxndk_1QfhQSSjqrPCV3_NC4iRFAcxkUXRW4NdE4uLDy8FMV_GFwBG8SaHKUiNv8TN6JxOxJEq64Wr_EYYCg7fswsJqXMtF8G80dk2V7goMD5_EYA7qjuCj3S5ugzbAxeJWwdOTny9L/s1920/the-last-of-us-serie-hbo-podera-ter-ate-tres-temporadas.jpg',
        'Until Dawn': 'https://i.ytimg.com/vi/-9vA1rIoee8/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD2XvlwP4taq-y0ZohIinLeRNDS_Q',
        'Destiny Rising': 'https://gamingtrend.com/content/images/size/w1200/2025/02/destiny1.jpg',
        'Persona 5: The Phantom X': 'https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/05/Persona-5-The-Phantom-X-Key-Art.jpg?w=1600&h=900&fit=crop',
        'Sonic Rumble': 'https://i.ytimg.com/vi/I-1HtmQdGPI/maxresdefault.jpg',
        'Umamusume: Pretty Derby': 'https://a.storyblok.com/f/178900/900x506/5c7ff66b5b/umamusume-game.jpg/m/filters:quality(95)format(webp)',
        'Wuthering Waves': 'https://play-lh.googleusercontent.com/7ePq9193_ivAh-yvYUQAeCuJEt3ixJsj3fEFmLM8O8B_BTQN4sxV8JhUGs4ENOe2WS5GrzjlTJKAmMam4kXiYRQ=w526-h296-rw',
        'Marvel Rivals': 'https://sm.ign.com/ign_br/news/m/marvel-riv/marvel-rivals-announced-a-6v6-superhero-team-based-free-to-p_8f6k.jpg'
    };
    
    // INFORMAÇÕES DOS JOGOS (gêneros e sinopse)
    const gameInfo = {
        'Clair Obscur: Expedition 33': {
            genres: ['RPG', 'Aventura', 'Fantasia'],
            synopsis: 'Uma jornada épica através de paisagens surrealistas onde luz e sombra determinam o destino.'
        },
        'Death Stranding 2: On the Beach': {
            genres: ['Ação', 'Aventura', 'Ficção Científica'],
            synopsis: 'Continuação da épica saga de conexão em um mundo pós-apocalíptico fragmentado.'
        },
        'Hades 2': {
            genres: ['Roguelike', 'Ação', 'Mitologia'],
            synopsis: 'A sequência do aclamado rogue-like que explora o submundo da mitologia grega.'
        },
        'Hollow Knight: Silksong': {
            genres: ['Metroidvania', 'Ação', 'Aventura'],
            synopsis: 'A tão aguardada sequência do aclamado Hollow Knight, agora com Hornet como protagonista.'
        },
        'Kingdom Come: Deliverance 2': {
            genres: ['RPG', 'Histórico', 'Mundo Aberto'],
            synopsis: 'Continuação do RPG histórico realista ambientado na Europa Medieval.'
        },
        'Donkey Kong Bananza': {
            genres: ['Plataforma', 'Aventura', 'Família'],
            synopsis: 'Nova aventura do icônico gorila em uma ilha tropical cheia de segredos.'
        },
        'Ghost of Yotei': {
            genres: ['Ação', 'Aventura', 'Stealth'],
            synopsis: 'Aventura de ação e stealth ambientada no Japão feudal.'
        },
        'Split Fiction': {
            genres: ['Ação', 'RPG', 'Ficção Científica'],
            synopsis: 'Jogo de ação e RPG com narrativa não-linear e múltiplas realidades.'
        },
        'Avowed': {
            genres: ['RPG', 'Ação', 'Fantasia'],
            synopsis: 'RPG de mundo aberto da Obsidian ambientado no universo de Pillars of Eternity.'
        },
        'Monster Hunter Wilds': {
            genres: ['Ação', 'RPG', 'Caça'],
            synopsis: 'A mais nova entrada na série de caça a monstros com ambientes dinâmicos.'
        },
        'The Outer Worlds 2': {
            genres: ['RPG', 'Ficção Científica', 'Ação'],
            synopsis: 'Sequência do RPG espacial da Obsidian com novas histórias e planetas.'
        },
        'Indiana Jones and the Great Circle': {
            genres: ['Ação', 'Aventura', 'Quebra-Cabeças'],
            synopsis: 'Aventura do famoso arqueólogo em uma jornada ao redor do mundo.'
        },
        'Silent Hill f': {
            genres: ['Terror', 'Sobrevivência', 'Psicológico'],
            synopsis: 'Novo capítulo da aclamada série de terror psicológico.'
        },
        "Assassin's Creed Shadows": {
            genres: ['Ação', 'Aventura', 'Stealth'],
            synopsis: 'A nova entrada na série que explora o Japão feudal.'
        },
        'Doom: The Dark Ages': {
            genres: ['Ação', 'FPS', 'Ficção Científica'],
            synopsis: 'Prequela da série Doom ambientada na Idade Média.'
        },
        'Battlefield 6': {
            genres: ['FPS', 'Multiplayer', 'Guerra'],
            synopsis: 'A mais nova entrada na série de combate militar em larga escala.'
        },
        'Ninja Gaiden 4': {
            genres: ['Ação', 'Hack and Slash', 'Aventura'],
            synopsis: 'Retorno da clássica série de ação com combate preciso e desafiador.'
        },
        'Shinobi: Art of Vengeance': {
            genres: ['Ação', 'Stealth', 'Aventura'],
            synopsis: 'Reinvenção moderna da clássica série Shinobi.'
        },
        '2XKO': {
            genres: ['Luta', 'Competitivo', 'Multiplayer'],
            synopsis: 'Jogo de luta 2D baseado no universo de League of Legends.'
        },
        'Fatal Fury: City of the Wolves': {
            genres: ['Luta', 'Arcade', 'Competitivo'],
            synopsis: 'Nova entrada na clássica série de luta da SNK.'
        },
        'Mortal Kombat: Legacy Kollection': {
            genres: ['Luta', 'Coleção', 'Arcade'],
            synopsis: 'Coleção remasterizada dos clássicos Mortal Kombat.'
        },
        'Virtua Fighter 5 R.E.V.O. World Stage': {
            genres: ['Luta', '3D', 'Competitivo'],
            synopsis: 'Versão atualizada do clássico jogo de luta 3D.'
        },
        'Capcom Fighting Collection 2': {
            genres: ['Luta', 'Coleção', 'Arcade'],
            synopsis: 'Segunda coleção de jogos de luta clássicos da Capcom.'
        },
        'The Alters': {
            genres: ['Estratégia', 'Simulação', 'Narrativa'],
            synopsis: 'Jogo de estratégia com elementos narrativos profundos.'
        },
        'Final Fantasy Tactics - The Ivalice Chronicles': {
            genres: ['RPG', 'Táticas', 'Fantasia'],
            synopsis: 'Remake do clássico RPG tático com novo conteúdo.'
        },
        'Jurassic World Evolution 3': {
            genres: ['Simulação', 'Estratégia', 'Gestão'],
            synopsis: 'Simulador de parque temático com dinossauros.'
        },
        'Civilization 7': {
            genres: ['Estratégia', 'Turnos', 'História'],
            synopsis: 'A mais nova entrada na lendária série de estratégia por turnos.'
        },
        'Tempest Rising': {
            genres: ['Estratégia', 'RTS', 'Guerra'],
            synopsis: 'Jogo de estratégia em tempo real inspirado nos clássicos do gênero.'
        },
        'Two Point Museum': {
            genres: ['Simulação', 'Gestão', 'Humor'],
            synopsis: 'Simulador de museu com o humor característico da série Two Point.'
        },
        'Lego Party!': {
            genres: ['Party Game', 'Família', 'Multijogador'],
            synopsis: 'Jogo de festa com minijogos no universo Lego.'
        },
        'Lego Voyagers': {
            genres: ['Aventura', 'Exploração', 'Família'],
            synopsis: 'Aventura de exploração espacial no universo Lego.'
        },
        'Mario Kart World': {
            genres: ['Corrida', 'Party Game', 'Família'],
            synopsis: 'A mais nova entrada na série de corridas da Nintendo.'
        },
        'Sonic Racing: CrossWorlds': {
            genres: ['Corrida', 'Arcade', 'Multijogador'],
            synopsis: 'Jogo de corrida com personagens do universo Sonic.'
        },
        'Atomfall': {
            genres: ['Ação', 'Sobrevivência', 'Mundo Aberto'],
            synopsis: 'Jogo de sobrevivência em um mundo pós-apocalíptico.'
        },
        'South of Midnight': {
            genres: ['Ação', 'Aventura', 'Fantasia'],
            synopsis: 'Aventura de ação com elementos de folclore americano.'
        },
        '007: First Light': {
            genres: ['Ação', 'Stealth', 'Espionagem'],
            synopsis: 'Nova aventura do agente 007 com foco em espionagem.'
        },
        'Grand Theft Auto 6': {
            genres: ['Ação', 'Mundo Aberto', 'Aventura'],
            synopsis: 'A tão aguardada nova entrada na série de mundo aberto.'
        },
        "Marvel's Wolverine": {
            genres: ['Ação', 'Aventura', 'Super-heróis'],
            synopsis: 'Aventura de ação com o mutante mais famoso dos X-Men.'
        },
        'Resident Evil: Requiem': {
            genres: ['Terror', 'Sobrevivência', 'Ação'],
            synopsis: 'Novo capítulo na série de terror de sobrevivência.'
        },
        'The Witcher 4': {
            genres: ['RPG', 'Ação', 'Fantasia'],
            synopsis: 'A nova entrada na aclamada série de RPG de fantasia.'
        },
        'Alien: Rogue Incursion': {
            genres: ['Terror', 'VR', 'Sobrevivência'],
            synopsis: 'Experiência de terror em realidade virtual no universo Alien.'
        },
        'Arken Age': {
            genres: ['RPG', 'Fantasia', 'Mundo Aberto'],
            synopsis: 'RPG de fantasia com mundo aberto expansivo.'
        },
        'Ghost Town': {
            genres: ['Terror', 'Exploração', 'Suspense'],
            synopsis: 'Jogo de terror psicológico em uma cidade fantasma.'
        },
        "Marvel's Deadpool VR": {
            genres: ['Ação', 'VR', 'Humor'],
            synopsis: 'Experiência de ação em VR com o mercenário tagarela.'
        },
        'The Midnight Walk': {
            genres: ['Terror', 'Exploração', 'Narrativa'],
            synopsis: 'Jogo de terror narrativo com elementos de exploração.'
        },
        'Blue Prince': {
            genres: ['RPG', 'Aventura', 'Puzzle'],
            synopsis: 'RPG indie com elementos de puzzle e narrativa profunda.'
        },
        'Despelote': {
            genres: ['Esporte', 'Futebol', 'Narrativa'],
            synopsis: 'Jogo narrativo sobre futebol e cultura latino-americana.'
        },
        'Dispatch': {
            genres: ['Ação', 'Estratégia', 'Táticas'],
            synopsis: 'Jogo de ação tática com elementos de estratégia.'
        },
        'Megabonk': {
            genres: ['Arcade', 'Ação', 'Multijogador'],
            synopsis: 'Jogo de ação arcade com combate frenético.'
        },
        'Absolum': {
            genres: ['Ação', 'RPG', 'Fantasia'],
            synopsis: 'RPG de ação com combate dinâmico e mundo aberto.'
        },
        'Ball x Pit': {
            genres: ['Esporte', 'Competitivo', 'Multijogador'],
            synopsis: 'Jogo de esporte competitivo com física única.'
        },
        'Arc Raiders': {
            genres: ['Ação', 'Co-op', 'Ficção Científica'],
            synopsis: 'Jogo de ação cooperativo contra ameaças alienígenas.'
        },
        'Elden Ring: Nightreign': {
            genres: ['RPG', 'Ação', 'Fantasia'],
            synopsis: 'Expansão do aclamado RPG de ação da FromSoftware.'
        },
        'Peak': {
            genres: ['Aventura', 'Exploração', 'Quebra-Cabeças'],
            synopsis: 'Jogo de aventura e exploração em ambientes montanhosos.'
        },
        'Consume Me': {
            genres: ['Terror', 'Psicológico', 'Narrativa'],
            synopsis: 'Experiência de terror psicológico com narrativa profunda.'
        },
        'Lost Records: Bloom & Rage': {
            genres: ['Narrativa', 'Aventura', 'Mistério'],
            synopsis: 'Jogo narrativo sobre memórias perdidas e descobertas.'
        },
        'Wanderstop': {
            genres: ['Simulação', 'Relaxante', 'Narrativa'],
            synopsis: 'Simulador relaxante sobre cuidar de um jardim mágico.'
        },
        "Baldur's Gate 3": {
            genres: ['RPG', 'Táticas', 'Fantasia'],
            synopsis: 'RPG tático baseado em D&D com narrativa profunda.'
        },
        'Final Fantasy 14': {
            genres: ['MMORPG', 'Fantasia', 'RPG'],
            synopsis: 'MMORPG em constante evolução com expansões regulares.'
        },
        'Fortnite': {
            genres: ['Battle Royale', 'Ação', 'Multijogador'],
            synopsis: 'Battle royale em constante evolução com crossovers.'
        },
        'Helldivers 2': {
            genres: ['Ação', 'Co-op', 'Ficção Científica'],
            synopsis: 'Jogo de ação cooperativo por democracia galáctica.'
        },
        "No Man's Sky": {
            genres: ['Exploração', 'Sobrevivência', 'Ficção Científica'],
            synopsis: 'Simulador de exploração espacial com universo procedurally generated.'
        },
        'Um Filme Minecraft': {
            genres: ['Aventura', 'Fantasia', 'Família'],
            synopsis: 'Adaptação cinematográfica do universo Minecraft.'
        },
        'Devil May Cry': {
            genres: ['Ação', 'Hack and Slash', 'Fantasia'],
            synopsis: 'Adaptação live-action da série de ação Devil May Cry.'
        },
        'Splinter Cell: Deathwatch': {
            genres: ['Ação', 'Stealth', 'Espionagem'],
            synopsis: 'Adaptação live-action da série de espionagem.'
        },
        'The Last of Us': {
            genres: ['Drama', 'Sobrevivência', 'Ação'],
            synopsis: 'Série live-action baseada no aclamado jogo.'
        },
        'Until Dawn': {
            genres: ['Terror', 'Narrativa', 'Suspense'],
            synopsis: 'Adaptação do jogo de terror interativo.'
        },
        'Destiny Rising': {
            genres: ['RPG', 'Ação', 'MMO'],
            synopsis: 'Novo capítulo no universo Destiny com jogabilidade aprimorada.'
        },
        'Persona 5: The Phantom X': {
            genres: ['RPG', 'Simulação', 'Fantasia'],
            synopsis: 'Nova entrada na série Persona com novos personagens.'
        },
        'Sonic Rumble': {
            genres: ['Battle Royale', 'Ação', 'Multijogador'],
            synopsis: 'Battle royale com personagens do universo Sonic.'
        },
        'Umamusume: Pretty Derby': {
            genres: ['Simulação', 'Esporte', 'Anime'],
            synopsis: 'Jogo de simulação de corridas com garotas-cavalo.'
        },
        'Wuthering Waves': {
            genres: ['RPG', 'Ação', 'Mundo Aberto'],
            synopsis: 'RPG de ação com mundo aberto e combate fluido.'
        },
        'Marvel Rivals': {
            genres: ['FPS', 'Hero Shooter', 'Multijogador'],
            synopsis: 'Hero shooter 6v6 com personagens da Marvel.'
        }
    };
    
    // Dados das categorias (com nomes formatados corretamente)
    const categoriesData = [
        { 
            id: 'game-of-the-year', 
            name: 'Jogo do Ano', 
            nominees: [
                'Clair Obscur: Expedition 33',
                'Death Stranding 2: On the Beach',
                'Donkey Kong Bananza',
                'Hades 2',
                'Hollow Knight: Silksong',
                'Kingdom Come: Deliverance 2'
            ] 
        },
        { 
            id: 'best-direction', 
            name: 'Melhor Direção', 
            nominees: [
                'Clair Obscur: Expedition 33',
                'Death Stranding 2: On the Beach',
                'Ghost of Yotei',
                'Hades 2',
                'Split Fiction'
            ] 
        },
        { 
            id: 'best-esports-team', 
            name: 'Melhor Time de Esports', 
            nominees: [
                "Gen.G - League of Legends",
                "NRG - Valorant",
                "Team Falcons - Dota 2",
                "Team Liquid PH - Mobile Legends: Bang Bang",
                "Team Vitality - Counter Strike 2"
            ] 
        },
        { 
            id: 'best-esports-athlete', 
            name: 'Melhor Atleta de Esports', 
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
            name: 'Melhor Jogo de Esports', 
            nominees: [
                "Counter Strike 2",
                "Dota 2",
                "League of Legends",
                "Mobile Legends: Bang Bang",
                "Valorant"
            ] 
        },
        { 
            id: 'best-sports-racing', 
            name: 'Melhor Jogo de Esporte/Corrida', 
            nominees: [
                "FC 26",
                "F1 25",
                "Mario Kart World",
                "Rematch",
                "Sonic Racing: CrossWorlds"
            ] 
        },
        { 
            id: 'best-strategy-sim', 
            name: 'Melhor Jogo de Simulação/Estratégia', 
            nominees: [
                "The Alters",
                "Final Fantasy Tactics - The Ivalice Chronicles",
                "Jurassic World Evolution 3",
                "Civilization 7",
                "Tempest Rising",
                "Two Point Museum"
            ] 
        },
        { 
            id: 'best-family-game', 
            name: 'Melhor Jogo para a Família', 
            nominees: [
                "Donkey Kong Bananza",
                "Lego Party!",
                "Lego Voyagers",
                "Mario Kart World",
                "Sonic Racing: CrossWorlds",
                "Split Fiction"
            ] 
        },
        { 
            id: 'innovation-accessibility', 
            name: 'Inovação em Acessibilidade', 
            nominees: [
                "Assassin's Creed Shadows",
                "Atomfall",
                "Doom: The Dark Ages",
                "FC 26",
                "South of Midnight"
            ] 
        },
        { 
            id: 'best-action-game', 
            name: 'Melhor Jogo de Ação', 
            nominees: [
                "Battlefield 6",
                "Doom: The Dark Ages",
                "Hades 2",
                "Ninja Gaiden 4",
                "Shinobi: Art of Vengeance"
            ] 
        },
        { 
            id: 'best-fighting-game', 
            name: 'Melhor Jogo de Luta', 
            nominees: [
                "2XKO",
                "Capcom Fighting Collection 2",
                "Fatal Fury: City of the Wolves",
                "Mortal Kombat: Legacy Kollection",
                "Virtua Fighter 5 R.E.V.O. World Stage"
            ] 
        },
        { 
            id: 'best-rpg', 
            name: 'Melhor Jogo de RPG', 
            nominees: [
                "Avowed",
                "Clair Obscur: Expedition 33",
                "Kingdom Come: Deliverance 2",
                "Monster Hunter Wilds",
                "The Outer Worlds 2"
            ] 
        },
        { 
            id: 'best-action-adventure', 
            name: 'Melhor Jogo de Ação/Aventura', 
            nominees: [
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Hollow Knight: Silksong",
                "Indiana Jones and the Great Circle",
                "Split Fiction"
            ] 
        },
        { 
            id: 'most-anticipated', 
            name: 'Jogo Mais Aguardado', 
            nominees: [
                "007: First Light",
                "Grand Theft Auto 6",
                "Marvel's Wolverine",
                "Resident Evil: Requiem",
                "The Witcher 4"
            ] 
        },
        { 
            id: 'content-creator-year', 
            name: 'Criador de Conteúdo do Ano', 
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
            name: 'Melhor Jogo de Realidade Virtual/Realidade Aumentada', 
            nominees: [
                "Alien: Rogue Incursion",
                "Arken Age",
                "Ghost Town",
                "Marvel's Deadpool VR",
                "The Midnight Walk"
            ] 
        },
        { 
            id: 'best-debut-indie', 
            name: 'Melhor Jogo de Estreia Independente', 
            nominees: [
                "Blue Prince",
                "Clair Obscur: Expedition 33",
                "Despelote",
                "Dispatch",
                "Megabonk"
            ] 
        },
        { 
            id: 'best-indie-game', 
            name: 'Melhor Jogo Independente', 
            nominees: [
                "Absolum",
                "Ball x Pit",
                "Blue Prince",
                "Clair Obscur: Expedition 33",
                "Hades 2",
                "Hollow Knight: Silksong"
            ] 
        },
        { 
            id: 'best-multiplayer', 
            name: 'Melhor Multiplayer', 
            nominees: [
                "Arc Raiders",
                "Battlefield 6",
                "Elden Ring: Nightreign",
                "Peak",
                "Split Fiction"
            ] 
        },
        { 
            id: 'games-for-impact', 
            name: 'Games for Impact', 
            nominees: [
                "Consume Me",
                "Despelote",
                "Lost Records: Bloom & Rage",
                "South of Midnight",
                "Wanderstop"
            ] 
        },
        { 
            id: 'best-community-support', 
            name: 'Melhor Apoio à Comunidade', 
            nominees: [
                "Baldur's Gate 3",
                "Final Fantasy 14",
                "Fortnite",
                "Helldivers 2",
                "No Man's Sky"
            ] 
        },
        { 
            id: 'best-narrative', 
            name: 'Melhor Narrativa', 
            nominees: [
                "Clair Obscur: Expedition 33",
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Kingdom Come: Deliverance 2",
                "Silent Hill f"
            ] 
        },
        { 
            id: 'best-adaptation', 
            name: 'Melhor Adaptação', 
            nominees: [
                "Um Filme Minecraft",
                "Devil May Cry",
                "Splinter Cell: Deathwatch",
                "The Last of Us",
                "Until Dawn"
            ] 
        },
        { 
            id: 'best-audio-design', 
            name: 'Melhor Direção de Som', 
            nominees: [
                "Battlefield 6",
                "Clair Obscur: Expedition 33",
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Silent Hill f"
            ] 
        },
        { 
            id: 'best-score-music', 
            name: 'Melhor Trilha e Música', 
            nominees: [
                "Christopher Larkin - Hollow Knight: Silksong",
                "Darren Korb - Hades 2",
                "Lorien Testard - Clair Obscur: Expedition 33",
                "Toma Otowa - Ghost of Yotei",
                "Woodkid & Ludvig Forssell - Death Stranding 2: On the Beach"
            ] 
        },
        { 
            id: 'best-art-direction', 
            name: 'Melhor Direção de Arte', 
            nominees: [
                "Clair Obscur: Expedition 33",
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Hades 2",
                "Hollow Knight: Silksong"
            ] 
        },
        { 
            id: 'best-mobile-game', 
            name: 'Melhor Jogo para Dispositivos Móveis', 
            nominees: [
                "Destiny Rising",
                "Persona 5: The Phantom X",
                "Sonic Rumble",
                "Umamusume: Pretty Derby",
                "Wuthering Waves"
            ] 
        },
        { 
            id: 'best-ongoing-game', 
            name: 'Melhor Jogo em Atualização', 
            nominees: [
                "Final Fantasy 14",
                "Fortnite",
                "Helldivers 2",
                "Marvel Rivals",
                "No Man's Sky"
            ] 
        },
        { 
            id: 'best-performance', 
            name: 'Melhor Atuação', 
            nominees: [
                "Ben Starr - Clair Obscur: Expedition 33",
                "Charlie Cox - Clair Obscur: Expedition 33",
                "Erika Ishii - Ghost of Yotei",
                "Jennifer English - Clair Obscur: Expedition 33",
                "Konatsu Kato - Silent Hill f",
                "Troy Baker - Indiana Jones and the Great Circle"
            ] 
        }
    ];
    
    // Estado da aplicação
    let currentCategoryIndex = 0;
    let selectedGames = {};
    let completedCategories = new Set();
    
    // Inicializar navegação
    initNavigation();
    
    // Carregar categoria atual
    loadCategory(currentCategoryIndex);
    
    // Atualizar contadores
    totalCategoriesCount.textContent = categoriesData.length;
    totalCategoriesSpan.textContent = categoriesData.length;
    updateProgress();
    
    // Event Listeners
    prevCategoryBtn.addEventListener('click', goToPreviousCategory);
    nextCategoryBtn.addEventListener('click', goToNextCategory);
    finalizeVoteBtn.addEventListener('click', finalizeVoting);
    
    // Função para inicializar navegação
    function initNavigation() {
        categoryNavigation.innerHTML = '';
        
        categoriesData.forEach((category, index) => {
            const navItem = document.createElement('div');
            navItem.className = 'category-nav-item';
            navItem.textContent = `${index + 1}. ${category.name}`;
            navItem.dataset.index = index;
            
            if (index === currentCategoryIndex) {
                navItem.classList.add('current');
            }
            
            if (completedCategories.has(category.id)) {
                navItem.classList.add('completed');
            }
            
            navItem.addEventListener('click', () => {
                if (index !== currentCategoryIndex) {
                    goToCategory(index);
                }
            });
            
            categoryNavigation.appendChild(navItem);
        });
    }
    
    // Função para carregar uma categoria
    function loadCategory(index) {
        if (index < 0 || index >= categoriesData.length) return;
        
        const category = categoriesData[index];
        
        // Atualizar navegação
        updateNavigation(index);
        
        // Atualizar número da categoria
        currentCategoryNumber.textContent = index + 1;
        
        // Criar conteúdo da categoria
        currentCategoryContainer.innerHTML = `
            <div class="category-header">
                <h2>
                    <i class="fas fa-award"></i>
                    ${category.name}
                </h2>
                <p class="category-description">
                    Selecione uma opção abaixo. Clique em "Próxima Categoria" para continuar.
                </p>
            </div>
            
            <div class="games-grid" id="gamesGrid-${category.id}">
                ${category.nominees.map(nominee => {
                    const isSelected = selectedGames[category.id] === nominee;
                    const imageUrl = getGameImageUrl(nominee);
                    const info = gameInfo[nominee] || { genres: [], synopsis: 'Informações não disponíveis.' };
                    
                    return `
                        <div class="game-card ${isSelected ? 'selected' : ''}" 
                             data-game="${nominee}" 
                             data-category="${category.id}">
                            <div class="game-image">
                                <img src="${imageUrl}" 
                                     alt="${nominee}"
                                     onerror="this.src='https://via.placeholder.com/460x215/1a5e2c/ffffff?text=${encodeURIComponent(nominee.substring(0, 40))}'">
                            </div>
                            <div class="game-info">
                                <h3>${nominee}</h3>
                                
                                ${info.genres && info.genres.length > 0 ? `
                                    <div class="game-genres">
                                        ${info.genres.slice(0, 3).map(genre => 
                                            `<span class="genre-tag">${genre}</span>`
                                        ).join('')}
                                    </div>
                                ` : ''}
                                
                                <p class="game-synopsis">${info.synopsis}</p>
                                
                                <div class="game-selected">
                                    <i class="fas fa-check-circle"></i> Selecionado
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        // Adicionar eventos aos cards
        setTimeout(() => {
            const gameCards = currentCategoryContainer.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                card.addEventListener('click', function() {
                    selectGame(this, category.id);
                });
            });
        }, 100);
        
        // Atualizar botões de navegação
        updateNavigationButtons();
    }
    
    // Função para selecionar um jogo
    function selectGame(card, categoryId) {
        const gameName = card.dataset.game;
        
        // Desselecionar todos os cards desta categoria
        const categoryCards = currentCategoryContainer.querySelectorAll('.game-card');
        categoryCards.forEach(c => c.classList.remove('selected'));
        
        // Selecionar o card clicado
        card.classList.add('selected');
        
        // Atualizar estado
        selectedGames[categoryId] = gameName;
        
        // Marcar categoria como completada
        if (!completedCategories.has(categoryId)) {
            completedCategories.add(categoryId);
            updateProgress();
            updateNavigation(currentCategoryIndex);
        }
        
        // Atualizar botão de próxima categoria
        updateNavigationButtons();
    }
    
    // Função para ir para próxima categoria
    function goToNextCategory() {
        const currentCategory = categoriesData[currentCategoryIndex];
        
        // Verificar se a categoria atual foi preenchida
        if (!selectedGames[currentCategory.id]) {
            alert(`Por favor, selecione uma opção na categoria "${currentCategory.name}" antes de continuar.`);
            return;
        }
        
        // Animar saída
        currentCategoryContainer.style.animation = 'slideOutLeft 0.3s ease-out forwards';
        
        setTimeout(() => {
            // Ir para próxima categoria
            if (currentCategoryIndex < categoriesData.length - 1) {
                currentCategoryIndex++;
                loadCategory(currentCategoryIndex);
                currentCategoryContainer.style.animation = 'slideInRight 0.3s ease-out';
            }
        }, 300);
    }
    
    // Função para ir para categoria anterior
    function goToPreviousCategory() {
        // Animar saída
        currentCategoryContainer.style.animation = 'slideOutLeft 0.3s ease-out forwards';
        
        setTimeout(() => {
            // Ir para categoria anterior
            if (currentCategoryIndex > 0) {
                currentCategoryIndex--;
                loadCategory(currentCategoryIndex);
                currentCategoryContainer.style.animation = 'slideInRight 0.3s ease-out';
            }
        }, 300);
    }
    
    // Função para ir para uma categoria específica
    function goToCategory(index) {
        // Animar saída
        currentCategoryContainer.style.animation = 'slideOutLeft 0.3s ease-out forwards';
        
        setTimeout(() => {
            currentCategoryIndex = index;
            loadCategory(currentCategoryIndex);
            currentCategoryContainer.style.animation = 'slideInRight 0.3s ease-out';
        }, 300);
    }
    
    // Função para atualizar navegação
    function updateNavigation(index) {
        const navItems = categoryNavigation.querySelectorAll('.category-nav-item');
        navItems.forEach((item, i) => {
            item.classList.remove('current');
            if (i === index) {
                item.classList.add('current');
            }
            
            const categoryId = categoriesData[i].id;
            if (completedCategories.has(categoryId)) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    }
    
    // Função para atualizar botões de navegação
    function updateNavigationButtons() {
        // Botão anterior
        prevCategoryBtn.disabled = currentCategoryIndex === 0;
        
        // Botão próximo
        const currentCategory = categoriesData[currentCategoryIndex];
        const isCurrentCompleted = !!selectedGames[currentCategory.id];
        nextCategoryBtn.disabled = !isCurrentCompleted;
        
        // Se for a última categoria, mudar texto do botão
        if (currentCategoryIndex === categoriesData.length - 1) {
            nextCategoryBtn.innerHTML = `Finalizar <i class="fas fa-check-circle"></i>`;
            nextCategoryBtn.removeEventListener('click', goToNextCategory);
            nextCategoryBtn.addEventListener('click', finalizeVoting);
        } else {
            nextCategoryBtn.innerHTML = `Próxima Categoria <i class="fas fa-chevron-right"></i>`;
            nextCategoryBtn.removeEventListener('click', finalizeVoting);
            nextCategoryBtn.addEventListener('click', goToNextCategory);
        }
    }
    
    // Função para atualizar progresso
    function updateProgress() {
        const completedCount = completedCategories.size;
        const total = categoriesData.length;
        const percentage = (completedCount / total) * 100;
        
        progressFill.style.width = `${percentage}%`;
        progressCount.textContent = completedCount;
        
        // Habilitar botão de finalizar se todas estiverem completas
        finalizeVoteBtn.disabled = completedCount !== total;
    }
    
    // Função para finalizar votação
    function finalizeVoting() {
        // Verificar se todas as categorias foram preenchidas
        if (completedCategories.size !== categoriesData.length) {
            alert('Por favor, complete todas as categorias antes de finalizar.');
            return;
        }
        
        // Calcular jogo mais votado pelo usuário
        const voteCount = {};
        Object.values(selectedGames).forEach(game => {
            voteCount[game] = (voteCount[game] || 0) + 1;
        });
        
        let mostVotedGame = null;
        let maxVotes = 0;
        
        Object.entries(voteCount).forEach(([game, votes]) => {
            if (votes > maxVotes) {
                maxVotes = votes;
                mostVotedGame = game;
            }
        });
        
        // Preparar dados para resultados
        const votingData = {
            selections: selectedGames,
            mostVoted: {
                game: mostVotedGame,
                count: maxVotes,
                image: getGameImageUrl(mostVotedGame)
            },
            timestamp: new Date().toISOString()
        };
        
        // Salvar e redirecionar
        localStorage.setItem('gameAwardsVotes', JSON.stringify(votingData));
        window.location.href = 'results.html';
    }
    
    // Função para obter URL da imagem do jogo
    function getGameImageUrl(gameName) {
        // Remove informações extras (como nome do artista) para encontrar imagem
        const cleanGameName = gameName.split(' - ')[0];
        
        // Verifica se há URL específica no mapa
        if (gameImages[cleanGameName]) {
            return gameImages[cleanGameName];
        }
        
        // Placeholder genérico com tamanho Steam (460x215)
        return `https://via.placeholder.com/460x215/1a5e2c/ffffff?text=${encodeURIComponent(cleanGameName.substring(0, 40))}`;
    }
});