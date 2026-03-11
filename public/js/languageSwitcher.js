(function() {
  'use strict';

  // ── Language Options ──
  var LANGUAGES = [
    { code: 'zh',    label: '简体中文', labelShort: '简体', flagUrl: 'https://flagcdn.com/cn.svg' },
    { code: 'zh-TW', label: '繁體中文', labelShort: '繁體', flagUrl: 'https://flagcdn.com/w20/hk.png' },
    { code: 'en',    label: 'English',  labelShort: 'EN',   flagUrl: 'https://flagcdn.com/w20/us.png' },
    { code: 'ja',    label: '日本語',    labelShort: '日本', flagUrl: 'https://flagcdn.com/w20/jp.png' },
    { code: 'ko',    label: '한국어',    labelShort: '韩国', flagUrl: 'https://flagcdn.com/w20/kr.png' },
    { code: 'fr',    label: 'Français', labelShort: 'FR',   flagUrl: 'https://flagcdn.com/w20/fr.png' },
    { code: 'de',    label: 'Deutsch',  labelShort: 'DE',   flagUrl: 'https://flagcdn.com/w20/de.png' },
    { code: 'es',    label: 'Español',  labelShort: 'ES',   flagUrl: 'https://flagcdn.com/w20/es.png' },
    { code: 'ru',    label: 'Русский',  labelShort: 'RU',   flagUrl: 'https://flagcdn.com/w20/ru.png' }
  ];

  // ── Translation Dictionary (Chinese text → translations) ──
  var T = {
    // Header
    '量子代理':   { en:'Quantum Proxy', ja:'クォンタムプロキシ', ko:'퀀텀 프록시', fr:'Quantum Proxy', de:'Quantum Proxy', es:'Quantum Proxy', ru:'Quantum Proxy' },
    '产品':       { en:'Products', ja:'製品', ko:'제품', fr:'Produits', de:'Produkte', es:'Productos', ru:'Продукты' },
    '价格':       { en:'Pricing', ja:'料金', ko:'가격', fr:'Tarifs', de:'Preise', es:'Precios', ru:'Цены' },
    '解决方案':   { en:'Solutions', ja:'ソリューション', ko:'솔루션', fr:'Solutions', de:'Lösungen', es:'Soluciones', ru:'Решения' },
    '帮助中心':   { en:'Help Center', ja:'ヘルプ', ko:'도움말', fr:'Aide', de:'Hilfe', es:'Ayuda', ru:'Помощь' },
    '文档':       { en:'Docs', ja:'ドキュメント', ko:'문서', fr:'Docs', de:'Docs', es:'Docs', ru:'Документы' },
    '注册/登录':  { en:'Sign Up / Log In', ja:'登録/ログイン', ko:'가입/로그인', fr:'Connexion', de:'Anmelden', es:'Acceder', ru:'Войти' },

    // Hero CTA
    '打造极致连接体验': { en:'Get Started Now', ja:'今すぐ始める', ko:'지금 시작하기', fr:'Commencer', de:'Jetzt starten', es:'Comenzar ahora', ru:'Начать сейчас' },

    // Section titles
    '在什么场景中能使用到？':       { en:'What scenarios can it be used in?', ja:'どのようなシーンで使えますか？', ko:'어떤 시나리오에서 사용할 수 있나요?', fr:'Dans quels scénarios l\'utiliser ?', de:'In welchen Szenarien einsetzbar?', es:'¿En qué escenarios se puede usar?', ru:'В каких сценариях использовать?' },
    '覆盖全球60+国家，在线可用率高达99.99%': { en:'Coverage in 60+ Countries · 99.99% Uptime', ja:'60+カ国をカバー · 稼働率99.99%', ko:'60+ 국가 커버리지 · 99.99% 가동률', fr:'Couverture 60+ pays · 99.99% disponibilité', de:'60+ Länder · 99.99% Verfügbarkeit', es:'60+ países · 99.99% disponibilidad', ru:'60+ стран · Доступность 99.99%' },
    '选择代理套餐':               { en:'Choose Your Proxy Plan', ja:'プロキシプランを選択', ko:'프록시 요금제 선택', fr:'Choisissez votre forfait proxy', de:'Wählen Sie Ihren Proxy-Plan', es:'Elija su plan de proxy', ru:'Выберите тариф прокси' },
    '如何快速开始使用？':           { en:'How to Get Started Quickly?', ja:'すぐに使い始めるには？', ko:'빠르게 시작하는 방법은?', fr:'Comment démarrer rapidement ?', de:'Wie starte ich schnell?', es:'¿Cómo empezar rápidamente?', ru:'Как быстро начать?' },

    // Use case tabs
    '电商运营':               { en:'E-commerce', ja:'EC運営', ko:'이커머스', fr:'E-commerce', de:'E-Commerce', es:'E-commerce', ru:'E-commerce' },
    '在线直播':               { en:'Live Streaming', ja:'ライブ配信', ko:'라이브 방송', fr:'Streaming', de:'Live-Streaming', es:'Streaming', ru:'Стриминг' },
    '数据分析与市场研究':     { en:'Data & Research', ja:'データ分析', ko:'데이터 분석', fr:'Analyse de données', de:'Datenanalyse', es:'Análisis de datos', ru:'Аналитика' },
    'AI访问与数据':           { en:'AI & Data', ja:'AI＆データ', ko:'AI & 데이터', fr:'IA & Données', de:'KI & Daten', es:'IA & Datos', ru:'AI и данные' },
    '社交媒体运营':           { en:'Social Media', ja:'SNS運営', ko:'소셜 미디어', fr:'Réseaux sociaux', de:'Social Media', es:'Redes sociales', ru:'Соцсети' },
    'WEB3应用':               { en:'WEB3 Apps', ja:'WEB3アプリ', ko:'WEB3 앱', fr:'Apps WEB3', de:'WEB3-Apps', es:'Apps WEB3', ru:'WEB3' },
    '限量抢购BOT&智能爬虫':   { en:'BOT & Smart Crawler', ja:'BOT＆クローラー', ko:'BOT & 크롤러', fr:'BOT & Crawler', de:'BOT & Crawler', es:'BOT & Crawler', ru:'BOT и краулер' },

    // Use case descriptions
    '使用静态住宅i p、电商运营 多账号矩阵运营的护航者':                     { en:'Static residential IP for secure multi-account e-commerce operations', ja:'静的住居用IPでマルチアカウントEC運営をサポート', ko:'정적 주거용 IP로 안전한 다중 계정 이커머스 운영', fr:'IP résidentiel statique pour e-commerce multi-comptes', de:'Statische Wohn-IP für Multi-Account E-Commerce', es:'IP residencial estática para e-commerce multi-cuenta', ru:'Статический резидентный IP для e-commerce' },
    '高速稳定的网络连接，确保直播画面流畅不卡顿，助力全球直播业务。':       { en:'High-speed, stable connections ensuring smooth global live streaming.', ja:'高速安定接続でグローバルなライブ配信をスムーズに。', ko:'고속 안정적인 연결로 글로벌 라이브 방송을 원활하게.', fr:'Connexions stables pour un streaming fluide.', de:'Schnelle, stabile Verbindungen für reibungsloses Live-Streaming.', es:'Conexiones estables para streaming fluido.', ru:'Стабильное подключение для глобального стриминга.' },
    '轻松获取全球市场数据，精准分析竞品动态，为业务决策提供强有力的数据支持。': { en:'Access global market data and gain competitive insights for business decisions.', ja:'グローバルな市場データで競合分析と意思決定を支援。', ko:'글로벌 시장 데이터로 경쟁 분석 및 비즈니스 의사 결정 지원.', fr:'Accédez aux données mondiales pour des analyses concurrentielles.', de:'Globale Marktdaten für Geschäftsentscheidungen.', es:'Datos de mercado global para decisiones informadas.', ru:'Глобальные рыночные данные для бизнес-решений.' },
    '解锁AI模型地域限制，高效采集训练数据，赋能人工智能应用开发与落地。':   { en:'Unlock regional restrictions on AI models and collect training data efficiently.', ja:'AIモデルの地域制限を解除し、トレーニングデータを効率収集。', ko:'AI 모델 지역 제한 해제 및 훈련 데이터 효율적 수집.', fr:'Débloquez les restrictions IA et collectez les données.', de:'KI-Beschränkungen aufheben und Trainingsdaten sammeln.', es:'Desbloquee restricciones IA y recopile datos.', ru:'Снимайте ограничения ИИ-моделей.' },
    '轻松管理全球社交媒体账号，突破地域限制，实现多账号安全运营与增长。':   { en:'Manage global social media accounts with ease, break through regional restrictions.', ja:'グローバルSNSアカウントを安全に運営。', ko:'글로벌 소셜 미디어 계정 관리 및 지역 제한 돌파.', fr:'Gérez vos comptes sociaux mondiaux sans restrictions.', de:'Globale Social-Media-Konten sicher verwalten.', es:'Gestione cuentas globales sin restricciones.', ru:'Управляйте соцсетями без ограничений.' },
    '安全连接去中心化网络，保障数字资产交易安全，探索Web3无限可能。':       { en:'Securely connect to decentralized networks and explore Web3 possibilities.', ja:'分散型ネットワークに安全接続、Web3の可能性を探索。', ko:'분산 네트워크에 안전 연결, Web3 가능성 탐색.', fr:'Connectez-vous aux réseaux décentralisés et explorez Web3.', de:'Sicher mit dezentralen Netzwerken verbinden.', es:'Conéctese a redes descentralizadas y explore Web3.', ru:'Безопасно подключайтесь к Web3.' },
    '毫秒级响应速度，高并发支持，助力抢购业务成功，高效采集全网数据。':     { en:'Millisecond response times with high concurrency for efficient data collection at scale.', ja:'ミリ秒レベルの応答速度と高並列性で効率的データ収集。', ko:'밀리초 응답 속도와 높은 동시성으로 효율적 데이터 수집.', fr:'Millisecondes de réponse avec haute concurrence.', de:'Millisekunden-Reaktionszeiten mit hoher Parallelität.', es:'Milisegundos de respuesta con alta concurrencia.', ru:'Время отклика в миллисекундах.' },
    '了解更多':   { en:'Learn More', ja:'詳しく見る', ko:'더 알아보기', fr:'En savoir plus', de:'Mehr erfahren', es:'Más información', ru:'Узнать больше' },

    // Coverage features
    '支持多种场景': { en:'Multi-scenario', ja:'マルチシナリオ', ko:'다중 시나리오', fr:'Multi-scénarios', de:'Multi-Szenario', es:'Multi-escenario', ru:'Мультисценарий' },
    '全协议':       { en:'All Protocols', ja:'全プロトコル', ko:'전 프로토콜', fr:'Tous protocoles', de:'Alle Protokolle', es:'Todos los protocolos', ru:'Все протоколы' },
    '10G+高速带宽': { en:'10G+ Speed', ja:'10G+高速帯域', ko:'10G+ 고속', fr:'10G+ Débit', de:'10G+ Speed', es:'10G+ Velocidad', ru:'10G+ скорость' },
    '按需计费方案': { en:'Pay-as-you-go', ja:'従量課金', ko:'종량 과금', fr:'Paiement à l\'usage', de:'Nutzungsbasiert', es:'Pago por uso', ru:'Оплата по факту' },

    // Country names
    '美国':       { en:'United States', ja:'アメリカ', ko:'미국', fr:'États-Unis', de:'USA', es:'EE.UU.', ru:'США' },
    '加拿大':     { en:'Canada', ja:'カナダ', ko:'캐나다', fr:'Canada', de:'Kanada', es:'Canadá', ru:'Канада' },
    '英国':       { en:'UK', ja:'イギリス', ko:'영국', fr:'Royaume-Uni', de:'Großbritannien', es:'Reino Unido', ru:'Великобритания' },
    '香港':       { en:'Hong Kong', ja:'香港', ko:'홍콩', fr:'Hong Kong', de:'Hongkong', es:'Hong Kong', ru:'Гонконг' },
    '新加坡':     { en:'Singapore', ja:'シンガポール', ko:'싱가포르', fr:'Singapour', de:'Singapur', es:'Singapur', ru:'Сингапур' },
    '日本':       { en:'Japan', ja:'日本', ko:'일본', fr:'Japon', de:'Japan', es:'Japón', ru:'Япония' },
    '德国':       { en:'Germany', ja:'ドイツ', ko:'독일', fr:'Allemagne', de:'Deutschland', es:'Alemania', ru:'Германия' },
    '法国':       { en:'France', ja:'フランス', ko:'프랑스', fr:'France', de:'Frankreich', es:'Francia', ru:'Франция' },
    '巴西':       { en:'Brazil', ja:'ブラジル', ko:'브라질', fr:'Brésil', de:'Brasilien', es:'Brasil', ru:'Бразилия' },
    '韩国':       { en:'South Korea', ja:'韓国', ko:'한국', fr:'Corée du Sud', de:'Südkorea', es:'Corea del Sur', ru:'Южная Корея' },
    '印度尼西亚': { en:'Indonesia', ja:'インドネシア', ko:'인도네시아', fr:'Indonésie', de:'Indonesien', es:'Indonesia', ru:'Индонезия' },
    '印度':       { en:'India', ja:'インド', ko:'인도', fr:'Inde', de:'Indien', es:'India', ru:'Индия' },
    '查看更多地区': { en:'View More Regions', ja:'もっと見る', ko:'더 많은 지역', fr:'Voir plus', de:'Mehr Regionen', es:'Ver más regiones', ru:'Больше регионов' },

    // OOS / Stock status
    '已售罄':     { en:'SOLD OUT', ja:'売り切れ', ko:'매진', fr:'ÉPUISÉ', de:'AUSVERKAUFT', es:'AGOTADO', ru:'ПРОДАНО' },
    '补货通知':   { en:'Notify Me', ja:'再入荷通知', ko:'재입고 알림', fr:'M\'avertir', de:'Benachrichtigen', es:'Notificarme', ru:'Уведомить' },

    // Pricing cards
    '静态住宅IP':   { en:'Static Residential IP', ja:'静的住居用IP', ko:'정적 주거용 IP', fr:'IP Résidentiel Statique', de:'Statische Wohn-IP', es:'IP Residencial Estática', ru:'Статический резидентный IP' },
    '动态住宅IP':   { en:'Dynamic Residential IP', ja:'動的住居用IP', ko:'동적 주거용 IP', fr:'IP Résidentiel Dynamique', de:'Dynamische Wohn-IP', es:'IP Residencial Dinámica', ru:'Динамический резидентный IP' },
    '数据中心IP':   { en:'Data Center IP', ja:'データセンターIP', ko:'데이터 센터 IP', fr:'IP Data Center', de:'Datacenter-IP', es:'IP Data Center', ru:'IP дата-центра' },
    '全协议支持':   { en:'All Protocols', ja:'全プロトコル対応', ko:'전 프로토콜 지원', fr:'Tous protocoles', de:'Alle Protokolle', es:'Todos los protocolos', ru:'Все протоколы' },
    '高速带宽':     { en:'High Speed', ja:'高速帯域', ko:'고속 대역폭', fr:'Haut débit', de:'Hochgeschwindigkeit', es:'Alta velocidad', ru:'Высокая скорость' },
    '多行业适配':   { en:'Multi-industry', ja:'多業種対応', ko:'다업종 적용', fr:'Multi-industrie', de:'Multi-Branche', es:'Multi-industria', ru:'Мультиотрасль' },
    '立即购买':     { en:'Buy Now', ja:'今すぐ購入', ko:'지금 구매', fr:'Acheter', de:'Jetzt kaufen', es:'Comprar ahora', ru:'Купить' },

    // Quick start
    '精选适合你的代理类型':     { en:'Choose the right proxy type for you', ja:'最適なプロキシタイプを選択', ko:'적합한 프록시 유형 선택', fr:'Choisissez votre type de proxy', de:'Wählen Sie Ihren Proxy-Typ', es:'Elija su tipo de proxy', ru:'Выберите тип прокси' },
    '一键下单，快速上线极速服务': { en:'One-click purchase, instant high-speed service', ja:'ワンクリック購入、即座に高速サービス', ko:'원클릭 주문, 즉시 고속 서비스', fr:'Achat en un clic, service ultra-rapide', de:'Ein-Klick-Kauf, sofortiger Highspeed-Service', es:'Compra con un clic, servicio ultrarrápido', ru:'Покупка в один клик, мгновенный сервис' },

    // Footer
    '产品与服务':     { en:'Products & Services', ja:'製品とサービス', ko:'제품 및 서비스', fr:'Produits & Services', de:'Produkte & Services', es:'Productos y Servicios', ru:'Продукты и услуги' },
    '静态住宅代理':   { en:'Static Residential Proxy', ja:'静的住居用プロキシ', ko:'정적 주거용 프록시', fr:'Proxy résidentiel statique', de:'Statischer Wohn-Proxy', es:'Proxy residencial estático', ru:'Статический резидентный прокси' },
    '动态住宅代理':   { en:'Dynamic Residential Proxy', ja:'動的住居用プロキシ', ko:'동적 주거용 프록시', fr:'Proxy résidentiel dynamique', de:'Dynamischer Wohn-Proxy', es:'Proxy residencial dinámico', ru:'Динамический резидентный прокси' },
    '数据中心代理':   { en:'Data Center Proxy', ja:'データセンタープロキシ', ko:'데이터 센터 프록시', fr:'Proxy data center', de:'Datacenter-Proxy', es:'Proxy data center', ru:'Прокси дата-центра' },
    '热门应用场景':   { en:'Popular Use Cases', ja:'人気の利用シーン', ko:'인기 사용 사례', fr:'Cas d\'utilisation populaires', de:'Beliebte Anwendungsfälle', es:'Casos de uso populares', ru:'Популярные сценарии' },
    'AI访问加速':     { en:'AI Access Boost', ja:'AIアクセス加速', ko:'AI 접근 가속', fr:'Accélération IA', de:'KI-Zugang beschleunigen', es:'Aceleración IA', ru:'Ускорение AI' },
    '股票市场':       { en:'Stock Market', ja:'株式市場', ko:'주식 시장', fr:'Marché boursier', de:'Aktienmarkt', es:'Mercado de valores', ru:'Фондовый рынок' },
    '游戏加速':       { en:'Game Acceleration', ja:'ゲーム加速', ko:'게임 가속', fr:'Accélération de jeux', de:'Spielbeschleunigung', es:'Aceleración de juegos', ru:'Ускорение игр' },
    '资源与支持':     { en:'Resources & Support', ja:'リソースとサポート', ko:'리소스 및 지원', fr:'Ressources & Support', de:'Ressourcen & Support', es:'Recursos y Soporte', ru:'Ресурсы и поддержка' },
    'API文档':       { en:'API Docs', ja:'APIドキュメント', ko:'API 문서', fr:'Documentation API', de:'API-Dokumentation', es:'Documentación API', ru:'Документация API' },
    '常见问题':       { en:'FAQ', ja:'よくある質問', ko:'자주 묻는 질문', fr:'FAQ', de:'FAQ', es:'FAQ', ru:'FAQ' },
    '法律合规信息':   { en:'Legal & Compliance', ja:'法律・コンプライアンス', ko:'법률 및 준수', fr:'Juridique & Conformité', de:'Recht & Compliance', es:'Legal y Cumplimiento', ru:'Правовая информация' },
    '隐私政策':       { en:'Privacy Policy', ja:'プライバシーポリシー', ko:'개인정보 처리방침', fr:'Politique de confidentialité', de:'Datenschutz', es:'Política de privacidad', ru:'Конфиденциальность' },
    '服务条款':       { en:'Terms of Service', ja:'利用規約', ko:'서비스 약관', fr:'Conditions d\'utilisation', de:'Nutzungsbedingungen', es:'Términos de servicio', ru:'Условия использования' },
    'Cookie政策':    { en:'Cookie Policy', ja:'Cookieポリシー', ko:'쿠키 정책', fr:'Politique de cookies', de:'Cookie-Richtlinie', es:'Política de cookies', ru:'Политика cookies' },
    '版权所有':       { en:'All Rights Reserved', ja:'全著作権所有', ko:'모든 권리 보유', fr:'Tous droits réservés', de:'Alle Rechte vorbehalten', es:'Todos los derechos reservados', ru:'Все права защищены' },

    // Help Center - navigation & headings
    '目录导航':       { en:'Navigation', ja:'ナビゲーション', ko:'내비게이션', fr:'Navigation', de:'Navigation', es:'Navegación', ru:'Навигация' },
    '选择一个主题':   { en:'Select a topic', ja:'トピックを選択', ko:'주제를 선택하세요', fr:'Choisissez un sujet', de:'Thema auswählen', es:'Seleccione un tema', ru:'Выберите тему' },
    '打印':           { en:'Print', ja:'印刷', ko:'인쇄', fr:'Imprimer', de:'Drucken', es:'Imprimir', ru:'Печать' },
    '欢迎来到帮助中心': { en:'Welcome to Help Center', ja:'ヘルプセンターへようこそ', ko:'도움말 센터에 오신 것을 환영합니다', fr:'Bienvenue au centre d\'aide', de:'Willkommen im Help Center', es:'Bienvenido al Centro de ayuda', ru:'Добро пожаловать в центр поддержки' },
    '请从左侧目录选择您想要了解的内容，我们将为您提供详细的使用指南和常见问题解答。':
                       { en:'Please select a topic from the left navigation. We provide detailed guides and FAQs.', ja:'左側のナビゲーションから知りたい内容を選択してください。詳細なガイドとFAQをご用意しています。', ko:'왼쪽 내비게이션에서 보고 싶은 내용을 선택하세요. 자세한 가이드와 FAQ를 제공합니다.', fr:'Veuillez choisir un sujet dans la navigation de gauche. Nous fournissons des guides détaillés et une FAQ.', de:'Bitte wählen Sie ein Thema in der linken Navigation. Wir bieten detaillierte Anleitungen und FAQs.', es:'Seleccione un tema en la navegación de la izquierda. Ofrecemos guías detalladas y preguntas frecuentes.', ru:'Выберите тему в левой навигации. Мы предоставляем подробные инструкции и FAQ.' },
    '内容区域（暂留为空白）': { en:'Content area (currently empty)', ja:'コンテンツ領域（現在は空です）', ko:'콘텐츠 영역(현재 비어 있음)', fr:'Zone de contenu (actuellement vide)', de:'Inhaltsbereich (derzeit leer)', es:'Área de contenido (actualmente vacía)', ru:'Область содержимого (пока пусто)' },
    '最后更新：':     { en:'Last updated: ', ja:'最終更新: ', ko:'마지막 업데이트: ', fr:'Dernière mise à jour : ', de:'Zuletzt aktualisiert: ', es:'Última actualización: ', ru:'Последнее обновление: ' },
    '阅读量：':       { en:'Views: ', ja:'閲覧数: ', ko:'조회수: ', fr:'Vues : ', de:'Aufrufe: ', es:'Vistas: ', ru:'Просмотры: ' },
    '找到':           { en:'Found', ja:'件', ko:'건', fr:'Trouvé', de:'Gefunden', es:'Encontrado', ru:'Найдено' },
    '个相关结果':     { en:' results', ja:'件の関連結果', ko:'개의 관련 결과', fr:' résultats', de:' relevante Ergebnisse', es:' resultados relacionados', ru:' результатов' },
    '搜索帮助文档、常见问题...':
                       { en:'Search help articles, FAQs...', ja:'ヘルプ記事、FAQを検索...', ko:'도움말 문서, FAQ 검색...', fr:'Rechercher des articles d\'aide, FAQ...', de:'Hilfedokumente, FAQs durchsuchen...', es:'Buscar ayuda, preguntas frecuentes...', ru:'Поиск статей и FAQ...' },

    // Help Center - Browser Config sub-chapters
    '浏览器配置':       { en:'Browser Configuration', ja:'ブラウザ設定', ko:'브라우저 설정', fr:'Configuration du navigateur', de:'Browser-Konfiguration', es:'Configuración del navegador', ru:'Настройка браузера' },
    'AdsPower 配置教程': { en:'AdsPower Setup Guide', ja:'AdsPower 設定ガイド', ko:'AdsPower 설정 가이드', fr:'Guide AdsPower', de:'AdsPower Anleitung', es:'Guía de AdsPower', ru:'Руководство AdsPower' },
    '比特浏览器配置教程': { en:'BitBrowser Setup Guide', ja:'BitBrowser 設定ガイド', ko:'비트브라우저 설정 가이드', fr:'Guide BitBrowser', de:'BitBrowser Anleitung', es:'Guía de BitBrowser', ru:'Руководство BitBrowser' },
    '候鸟浏览器配置教程': { en:'HouNiao Browser Setup Guide', ja:'候鳥ブラウザ設定ガイド', ko:'후냐오 브라우저 설정 가이드', fr:'Guide HouNiao', de:'HouNiao Anleitung', es:'Guía de HouNiao', ru:'Руководство HouNiao' },
    'VMLogin 配置教程':  { en:'VMLogin Setup Guide', ja:'VMLogin 設定ガイド', ko:'VMLogin 설정 가이드', fr:'Guide VMLogin', de:'VMLogin Anleitung', es:'Guía de VMLogin', ru:'Руководство VMLogin' },
    'HubStudio 配置教程': { en:'HubStudio Setup Guide', ja:'HubStudio 設定ガイド', ko:'HubStudio 설정 가이드', fr:'Guide HubStudio', de:'HubStudio Anleitung', es:'Guía de HubStudio', ru:'Руководство HubStudio' },
    'MuLogin 配置教程':  { en:'MuLogin Setup Guide', ja:'MuLogin 設定ガイド', ko:'MuLogin 설정 가이드', fr:'Guide MuLogin', de:'MuLogin Anleitung', es:'Guía de MuLogin', ru:'Руководство MuLogin' },
    '紫鸟浏览器配置教程': { en:'ZiNiao Browser Setup Guide', ja:'紫鳥ブラウザ設定ガイド', ko:'즈냐오 브라우저 설정 가이드', fr:'Guide ZiNiao', de:'ZiNiao Anleitung', es:'Guía de ZiNiao', ru:'Руководство ZiNiao' },
    'MoreLogin 配置教程': { en:'MoreLogin Setup Guide', ja:'MoreLogin 設定ガイド', ko:'MoreLogin 설정 가이드', fr:'Guide MoreLogin', de:'MoreLogin Anleitung', es:'Guía de MoreLogin', ru:'Руководство MoreLogin' },
    'Nstbrowser 配置教程': { en:'Nstbrowser Setup Guide', ja:'Nstbrowser 設定ガイド', ko:'Nstbrowser 설정 가이드', fr:'Guide Nstbrowser', de:'Nstbrowser Anleitung', es:'Guía de Nstbrowser', ru:'Руководство Nstbrowser' },
    'MostLogin 配置教程': { en:'MostLogin Setup Guide', ja:'MostLogin 設定ガイド', ko:'MostLogin 설정 가이드', fr:'Guide MostLogin', de:'MostLogin Anleitung', es:'Guía de MostLogin', ru:'Руководство MostLogin' },

    // Help Center - Cloud Phone sub-chapters
    '云手机':             { en:'Cloud Phone', ja:'クラウドフォン', ko:'클라우드폰', fr:'Téléphone Cloud', de:'Cloud-Telefon', es:'Teléfono en la nube', ru:'Облачный телефон' },
    '云手机使用概览':     { en:'Cloud Phone Overview', ja:'クラウドフォン概要', ko:'클라우드폰 개요', fr:'Aperçu du téléphone cloud', de:'Cloud-Telefon Übersicht', es:'Descripción general del teléfono en la nube', ru:'Обзор облачного телефона' },
    '云手机代理配置':     { en:'Cloud Phone Proxy Setup', ja:'クラウドフォン プロキシ設定', ko:'클라우드폰 프록시 설정', fr:'Configuration proxy du téléphone cloud', de:'Cloud-Telefon Proxy-Einrichtung', es:'Configuración de proxy del teléfono en la nube', ru:'Настройка прокси облачного телефона' },
    '多开与批量管理':     { en:'Multi-Instance & Batch Management', ja:'マルチインスタンスと一括管理', ko:'다중 인스턴스 및 일괄 관리', fr:'Multi-instances et gestion par lots', de:'Multi-Instanz & Stapelverwaltung', es:'Multi-instancia y gestión por lotes', ru:'Мультиэкземпляры и пакетное управление' },
    '云手机常见问题':     { en:'Cloud Phone FAQ', ja:'クラウドフォン FAQ', ko:'클라우드폰 FAQ', fr:'FAQ téléphone cloud', de:'Cloud-Telefon FAQ', es:'Preguntas frecuentes del teléfono en la nube', ru:'FAQ облачного телефона' }
  };

  // ── Hero special translations (innerHTML with <br>) ──
  var HERO_T = {
    title: {
      en: 'World-class<br>ISP Proxy',
      ja: 'ワールドクラス<br>ISPプロキシ',
      ko: '세계적인<br>ISP 프록시',
      fr: 'Proxy ISP<br>de classe mondiale',
      de: 'Weltklasse<br>ISP-Proxy',
      es: 'Proxy ISP<br>de clase mundial',
      ru: 'ISP Прокси<br>мирового класса'
    },
    subtitle: {
      en: 'Meet diverse business challenges<br>Always stable and reliable',
      ja: '多様なビジネス課題に対応<br>常に安定して信頼性が高い',
      ko: '다양한 비즈니스 도전 충족<br>항상 안정적이고 신뢰할 수 있는',
      fr: 'Répondre aux défis commerciaux<br>Toujours stable et fiable',
      de: 'Geschäftliche Herausforderungen meistern<br>Immer stabil und zuverlässig',
      es: 'Afrontar desafíos empresariales<br>Siempre estable y confiable',
      ru: 'Решение бизнес-задач<br>Всегда стабильно и надёжно'
    }
  };

  // ── State ──
  var currentLang = localStorage.getItem('qs-lang') || 'zh';
  var isApplying = false;
  var switcherEl = null;
  var dropdownEl = null;
  var btnEl = null;
  var originalTexts = new WeakMap(); // element → original innerHTML

  // ── Build Dropdown HTML ──
  function buildDropdownHTML() {
    var html = '';
    LANGUAGES.forEach(function(lang) {
      var isActive = lang.code === currentLang;
      var label = lang.label || lang.labelShort || lang.code.toUpperCase();
      var flagHtml = lang.flagUrl
        ? '<img class="lang-flag-img" src="' + lang.flagUrl + '" alt="' + label + '">'
        : '';

      html += '<div class="lang-option' + (isActive ? ' active' : '') + '" data-lang="' + lang.code + '">' +
        '<span class="lang-flag">' + flagHtml + '</span>' +
        '<span class="lang-text">' + label + '</span>' +
        (isActive ? '<span class="lang-check">✓</span>' : '') +
        '</div>';
    });
    return html;
  }

  // ── Create Switcher DOM ──
  function createSwitcher() {
    var wrapper = document.createElement('div');
    wrapper.className = 'lang-switcher';
    wrapper.id = 'lang-switcher';

    var currentLangObj = LANGUAGES.find(function(l) { return l.code === currentLang; }) || LANGUAGES[0];

    // Button (hongkongweb style: flag + label + chevron)
    var btn = document.createElement('button');
    btn.className = 'lang-switcher-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Select language');
    var currentLabel = currentLangObj.label || currentLangObj.labelShort || currentLangObj.code.toUpperCase();
    var currentFlagHtml = currentLangObj.flagUrl
      ? '<img class="lang-flag-img" src="' + currentLangObj.flagUrl + '" alt="' + currentLabel + '">'
      : '';

    btn.innerHTML =
      '<span class="lang-flag">' + currentFlagHtml + '</span>' +
      '<span class="lang-label">' + currentLabel + '</span>' +
      '<span class="lang-chevron">▾</span>';
    btnEl = btn;

    // Dropdown panel
    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown-panel';
    dropdown.innerHTML = buildDropdownHTML();
    dropdownEl = dropdown;

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    switcherEl = wrapper;

    // Toggle dropdown
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains('open');
      if (isOpen) { closeDropdown(); } else { openDropdown(); }
    });

    // Language selection
    dropdown.addEventListener('click', function(e) {
      var option = e.target.closest('.lang-option');
      if (!option) return;
      var code = option.dataset.lang;
      if (code && code !== currentLang) { selectLanguage(code); }
      closeDropdown();
    });

    // Click outside to close
    document.addEventListener('click', function(e) {
      if (switcherEl && !switcherEl.contains(e.target)) { closeDropdown(); }
    });

    // ESC to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { closeDropdown(); }
    });

    return wrapper;
  }

  function openDropdown() {
    if (dropdownEl) dropdownEl.classList.add('open');
    if (btnEl) btnEl.classList.add('active');
  }

  function closeDropdown() {
    if (dropdownEl) dropdownEl.classList.remove('open');
    if (btnEl) btnEl.classList.remove('active');
  }

  // ── Select Language ──
  function selectLanguage(code) {
    currentLang = code;
    localStorage.setItem('qs-lang', code);

    // Update button flag + label
    var langObj = LANGUAGES.find(function(l) { return l.code === code; });
    if (langObj && btnEl) {
      var flagEl = btnEl.querySelector('.lang-flag');
      var labelEl = btnEl.querySelector('.lang-label');
      var nextLabel = langObj.label || langObj.labelShort || langObj.code.toUpperCase();
      if (flagEl) {
        var flagHtml = langObj.flagUrl
          ? '<img class="lang-flag-img" src="' + langObj.flagUrl + '" alt="' + nextLabel + '">'
          : '';
        flagEl.innerHTML = flagHtml;
      }
      if (labelEl) labelEl.textContent = nextLabel;
    }

    // Update dropdown active states
    if (dropdownEl) { dropdownEl.innerHTML = buildDropdownHTML(); }

    // Update <html lang>
    document.documentElement.lang = code === 'zh' ? 'zh-CN' : code;

    // Apply translations
    applyTranslations(code);
  }

  // ── Apply Translations ──
  function applyTranslations(lang) {
    if (isApplying) return;
    isApplying = true;

    var homeContainer = document.querySelector('.home-container');
    var helpPage = document.getElementById('help-center-page');
    if (!homeContainer && !helpPage) { isApplying = false; return; }

    // 1. Hero title (has <br> inside) — use innerHTML
    var heroTitle = homeContainer ? homeContainer.querySelector('.hero-title') : null;
    if (heroTitle) {
      if (!originalTexts.has(heroTitle)) originalTexts.set(heroTitle, heroTitle.innerHTML);
      if (lang === 'zh') {
        heroTitle.innerHTML = originalTexts.get(heroTitle);
      } else if (HERO_T.title[lang]) {
        heroTitle.innerHTML = HERO_T.title[lang];
      }
    }

    // 2. Hero subtitle (has <br> inside)
    var heroSub = homeContainer ? homeContainer.querySelector('.hero-subtitle') : null;
    if (heroSub) {
      if (!originalTexts.has(heroSub)) originalTexts.set(heroSub, heroSub.innerHTML);
      if (lang === 'zh') {
        heroSub.innerHTML = originalTexts.get(heroSub);
      } else if (HERO_T.subtitle[lang]) {
        heroSub.innerHTML = HERO_T.subtitle[lang];
      }
    }

    // 3. Walk all text nodes under需要翻译的根节点（首页 + 帮助中心）并翻译
    [homeContainer, helpPage].forEach(function(root) {
      if (!root) return;

      var walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      var textNodes = [];
      var node;
      while (node = walker.nextNode()) {
        if (node.textContent.trim()) textNodes.push(node);
      }

      textNodes.forEach(function(tn) {
        // Skip nodes inside hero title/subtitle (handled above)
        if (heroTitle && heroTitle.contains && heroTitle.contains(tn)) return;
        if (heroSub && heroSub.contains && heroSub.contains(tn)) return;
        // Skip nodes inside any language switcher
        if (tn.parentElement && tn.parentElement.closest('.lang-switcher')) return;

        // Store original text on first encounter
        if (!tn._origText) { tn._origText = tn.textContent; }

        var original = tn._origText;

        if (lang === 'zh') {
          tn.textContent = original;
        } else {
          var trimmed = original.trim();
          if (T[trimmed] && T[trimmed][lang]) {
            tn.textContent = original.replace(trimmed, T[trimmed][lang]);
          }
        }
      });
    });

    // 4. Also translate alt attributes on images（仅首页容器内）
    if (homeContainer) {
      homeContainer.querySelectorAll('img[alt]').forEach(function(img) {
        if (!img._origAlt) { img._origAlt = img.alt; }
        if (lang === 'zh') {
          img.alt = img._origAlt;
        } else {
          var trimmed = img._origAlt.trim();
          if (T[trimmed] && T[trimmed][lang]) {
            img.alt = T[trimmed][lang];
          }
        }
      });
    }

    // 5. Translate Help Center search placeholder（属性翻译）
    var searchInput = document.getElementById('help-search-input');
    if (searchInput) {
      if (!searchInput._origPlaceholder) {
        searchInput._origPlaceholder = searchInput.placeholder;
      }
      if (lang === 'zh') {
        searchInput.placeholder = searchInput._origPlaceholder;
      } else {
        var key = (searchInput._origPlaceholder || '').trim();
        if (T[key] && T[key][lang]) {
          searchInput.placeholder = T[key][lang];
        }
      }
    }

    // Allow next application after DOM settles
    requestAnimationFrame(function() { isApplying = false; });
  }

  // ── Insert Switcher into Header / ISP Page / Help Center ──
  function insertSwitcher() {
    if (document.getElementById('lang-switcher')) return true;

    // Check if we are on any purchase page (tab=purchase)
    var search = window.location.search || '';
    var params = new URLSearchParams(search);
    var isPurchasePage = params.get('tab') === 'purchase';

    if (isPurchasePage) {
      var ispAnchor = document.getElementById('isp-lang-anchor');
      if (!ispAnchor) return false;

      var swIsp = createSwitcher();
      ispAnchor.appendChild(swIsp);

      // Apply saved language if not Chinese (for home/marketing texts only)
      if (currentLang !== 'zh') {
        setTimeout(function() { applyTranslations(currentLang); }, 300);
      }
      return true;
    }

    // Check if help center is open
    var helpPage = document.getElementById('help-center-page');
    var isHelpCenterOpen = helpPage && helpPage.classList.contains('active');
    
    if (isHelpCenterOpen) {
      var helpNav = helpPage.querySelector('.help-nav-container');
      if (helpNav) {
        var helpLoginBtn = helpNav.querySelector('.nav-login-btn');
        
        // Create actions container if needed
        var actions = helpNav.querySelector('.help-actions');
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'help-actions';
          if (helpLoginBtn) {
            helpNav.insertBefore(actions, helpLoginBtn);
            actions.appendChild(helpLoginBtn);
          } else {
            helpNav.appendChild(actions);
          }
        }

        var sw = createSwitcher();
        var currentLoginBtn = actions.querySelector('.nav-login-btn');
        if (currentLoginBtn) {
          actions.insertBefore(sw, currentLoginBtn);
        } else {
          actions.appendChild(sw);
        }

        // Apply saved language if not Chinese
        if (currentLang !== 'zh') {
          setTimeout(function() { applyTranslations(currentLang); }, 300);
        }
        return true;
      }
    }

    // Default: insert into home page header
    var headerContent = document.querySelector('.header-content');
    if (!headerContent) return false;

    var loginBtn = headerContent.querySelector('.login-btn');
    if (!loginBtn) return false;

    var sw = createSwitcher();
    headerContent.insertBefore(sw, loginBtn);

    // Apply saved language if not Chinese
    if (currentLang !== 'zh') {
      setTimeout(function() { applyTranslations(currentLang); }, 300);
    }

    return true;
  }

  // ── Init with MutationObserver ──
  function init() {
    // Restore scroll position if returning from ISP page
    var shouldRestore = sessionStorage.getItem('should_restore_scroll');
    var scrollPos = sessionStorage.getItem('home_scroll_pos');
    if (shouldRestore === 'true' && scrollPos) {
       // Only if we are on home root (no query params)
       if (!window.location.search) {
          // Use a small delay to ensure layout is ready
          setTimeout(function() {
             window.scrollTo(0, parseInt(scrollPos));
             sessionStorage.removeItem('should_restore_scroll');
          }, 100);
       }
    }

    // Check if we are on purchase page - need to wait for React component
    var search = window.location.search || '';
    var params = new URLSearchParams(search);
    var isPurchasePage = params.get('tab') === 'purchase';

    if (isPurchasePage) {
      // For purchase pages, wait for React component to render
      // Try multiple times with increasing delays
      var attempts = 0;
      var maxAttempts = 20; // Try for up to 2 seconds (20 * 100ms)
      
      function tryInsertPurchaseSwitcher() {
        attempts++;
        if (insertSwitcher()) {
          startContentWatcher();
          return;
        }
        
        if (attempts < maxAttempts) {
          setTimeout(tryInsertPurchaseSwitcher, 100);
        } else {
          // Fallback: use MutationObserver
          var observer = new MutationObserver(function() {
            if (insertSwitcher()) {
              observer.disconnect();
              startContentWatcher();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          
          // Final safety fallback
          setTimeout(function() {
            observer.disconnect();
            insertSwitcher();
            startContentWatcher();
          }, 3000);
        }
      }
      
      // Start trying immediately, then retry
      tryInsertPurchaseSwitcher();
      return;
    }

    // For non-purchase pages, use original logic
    if (insertSwitcher()) {
      startContentWatcher();
      return;
    }

    var observer = new MutationObserver(function() {
      if (insertSwitcher()) {
        observer.disconnect();
        startContentWatcher();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Safety fallback
    setTimeout(function() {
      observer.disconnect();
      insertSwitcher();
      startContentWatcher();
    }, 5000);
  }

  // ── Watch for dynamic content changes (tab switching, etc.) ──
  function startContentWatcher() {
    var reapplyTimer = null;

    var contentObserver = new MutationObserver(function(mutations) {
      if (isApplying || currentLang === 'zh') return;

      var hasChange = mutations.some(function(m) {
        if (switcherEl && switcherEl.contains(m.target)) return false;
        if (m.target.closest && m.target.closest('.lang-dropdown-panel')) return false;
        return m.type === 'characterData' ||
          (m.type === 'childList' && m.addedNodes.length > 0);
      });

      if (hasChange) {
        if (reapplyTimer) clearTimeout(reapplyTimer);
        reapplyTimer = setTimeout(function() {
          applyTranslations(currentLang);
        }, 200);
      }
    });

    var homeContainer = document.querySelector('.home-container');
    if (homeContainer) {
      contentObserver.observe(homeContainer, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  // ── Listen for React component mount event ──
  window.addEventListener('purchase-page-mounted', function() {
    setTimeout(function() {
      if (!document.getElementById('lang-switcher')) {
        insertSwitcher();
        startContentWatcher();
      }
    }, 200);
  });

  window.addEventListener('lang-switcher-insert', function() {
    if (!document.getElementById('lang-switcher')) {
      insertSwitcher();
      startContentWatcher();
    }
  });

  // ── Monitor help center state changes ──
  var helpCenterObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        var helpPage = document.getElementById('help-center-page');
        if (helpPage) {
          var isOpen = helpPage.classList.contains('active');
          var switcher = document.getElementById('lang-switcher');
          
          // If help center is open and switcher doesn't exist, create it
          if (isOpen && !switcher) {
            setTimeout(function() {
              insertSwitcher();
            }, 100);
          }
          // If help center is closed and switcher is in help center, move it back
          else if (!isOpen && switcher) {
            var helpNav = helpPage.querySelector('.help-nav-container');
            if (helpNav && helpNav.contains(switcher)) {
              setTimeout(function() {
                var headerContent = document.querySelector('.header-content');
                if (headerContent) {
                  var loginBtn = headerContent.querySelector('.login-btn');
                  if (loginBtn) {
                    headerContent.insertBefore(switcher, loginBtn);
                  } else {
                    headerContent.appendChild(switcher);
                  }
                }
              }, 50);
            }
          }
        }
      }
    });
  });

  // Start observing help center page
  var helpPage = document.getElementById('help-center-page');
  if (helpPage) {
    helpCenterObserver.observe(helpPage, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // ── Ensure language switcher persists on navigation clicks ──
  function ensureLangSwitcherVisible() {
    var switcher = document.getElementById('lang-switcher');
    if (!switcher) {
      // If switcher doesn't exist, create it
      insertSwitcher();
    } else {
      // If switcher exists but is not in a visible location, move it
      var headerContent = document.querySelector('.header-content');
      var helpNav = document.getElementById('help-center-page')?.querySelector('.help-nav-container');
      var ispAnchor = document.getElementById('isp-lang-anchor');
      var helpPage = document.getElementById('help-center-page');
      var isHelpCenterOpen = helpPage && helpPage.classList.contains('active');
      var search = window.location.search || '';
      var params = new URLSearchParams(search);
      var isPurchasePage = params.get('tab') === 'purchase';

      // Check if switcher is in the right place
      var isInHeader = headerContent && headerContent.contains(switcher);
      var isInHelpNav = helpNav && helpNav.contains(switcher);
      var isInIspAnchor = ispAnchor && ispAnchor.contains(switcher);

      if (!isInHeader && !isInHelpNav && !isInIspAnchor) {
        // Switcher is orphaned, move it to the right place
        if (isPurchasePage && ispAnchor) {
          ispAnchor.appendChild(switcher);
        } else if (isHelpCenterOpen && helpNav) {
          var helpLoginBtn = helpNav.querySelector('.nav-login-btn');
          var actions = helpNav.querySelector('.help-actions');
          if (!actions) {
            actions = document.createElement('div');
            actions.className = 'help-actions';
            if (helpLoginBtn) {
              helpNav.insertBefore(actions, helpLoginBtn);
              actions.appendChild(helpLoginBtn);
            } else {
              helpNav.appendChild(actions);
            }
          }
          var currentLoginBtn = actions.querySelector('.nav-login-btn');
          if (currentLoginBtn) {
            actions.insertBefore(switcher, currentLoginBtn);
          } else {
            actions.appendChild(switcher);
          }
        } else if (headerContent) {
          var loginBtn = headerContent.querySelector('.login-btn');
          if (loginBtn) {
            headerContent.insertBefore(switcher, loginBtn);
          } else {
            headerContent.appendChild(switcher);
          }
        }
      }
    }
  }

  // Monitor navigation menu clicks
  document.addEventListener('click', function(e) {
    var navLink = e.target.closest('.nav-menu a, .nav-menu .dropdown-link, .help-nav-links a');
    if (navLink) {
      // After a short delay, ensure switcher is still visible
      setTimeout(ensureLangSwitcherVisible, 100);
      setTimeout(ensureLangSwitcherVisible, 500);
    }
  }, true);

  // Monitor scroll events (in case navigation triggers scrolling)
  var scrollTimeout = null;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(ensureLangSwitcherVisible, 200);
  }, { passive: true });

  // Monitor DOM changes that might affect the switcher
  var domObserver = new MutationObserver(function(mutations) {
    var shouldCheck = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Check if header or navigation was modified
        var target = mutation.target;
        if (target.classList && (
          target.classList.contains('header-content') ||
          target.classList.contains('nav-menu') ||
          target.classList.contains('help-nav-container') ||
          target.closest('.header-content') ||
          target.closest('.help-nav-container')
        )) {
          shouldCheck = true;
        }
      }
    });
    if (shouldCheck) {
      setTimeout(ensureLangSwitcherVisible, 100);
    }
  });

  // Observe document body for changes
  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // ── Start ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();