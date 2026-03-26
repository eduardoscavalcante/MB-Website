document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('nav-links').classList.toggle('active');
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const aboutSection = document.querySelector('.about-section');
    const posAbout = aboutSection.getBoundingClientRect().top;
    if (posAbout < window.innerHeight - 150) {
        document.getElementById('about-content').classList.add('animate-in');
        document.getElementById('about-image-side').classList.add('animate-in');
    }

    const valuesTitle = document.getElementById('values-title');
    if (valuesTitle.getBoundingClientRect().top < window.innerHeight - 100) {
        valuesTitle.classList.add('animate-in');
        document.querySelectorAll('.reveal-value').forEach(item => item.classList.add('animate-in'));
    }

    const depSection = document.getElementById('depoimentos-inner');
    if (depSection.getBoundingClientRect().top < window.innerHeight - 150) {
        depSection.classList.add('animate-in');
    }

    const formInner = document.getElementById('form-contato');
    if (formInner && formInner.getBoundingClientRect().top < window.innerHeight - 150) {
        formInner.classList.add('animate-in');
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        requestAnimationFrame(() => {
            document.getElementById('hero-text').classList.add('animate-in');
            document.getElementById('hero-image').classList.add('animate-in');
        });
    }, 100);
});

// --- SCRIPTS DA SEÇÃO TIME ---
const teamContent = document.getElementById('team-content');
const profiles = {
    ceo: `<div class="profile-title"><h3>Perfil CEO</h3></div><div class="profile-container"><img src="img/ceo.png"><div class="profile-text"><p><strong>Advogada com atuação internacional</strong> e sólida trajetória jurídica, com mais de 20 anos de experiência estratégica. Especialista na interface entre o Direito e a Gestão, possui amplo histórico no acompanhamento de empresas do setor de saúde, focando em governança, conformidade e viabilidade de negócios.</p><br><p>Sua atuação é pautada pela <strong>prevenção de riscos e eficiência operacional</strong>, com expertise em:</p><strong>Gestão e Compliance:</strong> Implantação de programas de conformidade, mapeamento de processos e segurança de dados (LGPD).<br><strong>Estratégia Corporativa:</strong> Planejamento comercial, análise de indicadores de rentabilidade e suporte jurídico para novos projetos.<br><strong>Consultoria Especializada:</strong> Vasta experiência em Direito Médico-Hospitalar e seguros de vida e previdência.</div></div>`,
    coo: `<div class="profile-title"><h3>Perfil COO</h3></div><div class="profile-container"><img src="img/coo.png"><div class="profile-text"><p><strong>Advogada com mais de 12 anos de atuação</strong>, dedicada à defesa de direitos fundamentais e ao suporte jurídico especializado. Com uma trajetória pautada pela ética e pelo rigor técnico, possui sólida experiência em demandas complexas que exigem um olhar estratégico e humanizado.</p><p>Sua prática jurídica é concentrada em áreas de alto impacto social e familiar, com especial domínio em:</p><p><strong>Direito à Saúde e Inclusão:</strong> Referência na defesa de direitos de pessoas com deficiência (PCD) e suporte jurídico especializado em espectro autista.<br><strong>Direito das Famílias:</strong> Atuação estratégica em resoluções de conflitos familiares, unindo sensibilidade e segurança jurídica.<br>    <strong>Direito Civil e do Trabalho:</strong> Ampla base de conhecimento em processos cíveis e relações trabalhistas, com foco na prevenção de litígios.</p><br><p>Com diversas pós-graduações e participação ativa em órgãos representativos da classe, mantém uma atualização constante nas principais tendências do Direito Moderno, garantindo aos clientes uma assessoria jurídica robusta e soluções personalizadas para cada caso.</p></div></div>`,
    juridico: `<h3 class="carousel-title">Jurídico e Consultoria</h3>
        <div class="carousel-wrapper"><button class="carousel-nav carousel-prev" onclick="scrollCarousel('jur-c', -1)">&#10094;</button>
            <div class="carousel" id="jur-c">
                <div class="carousel-item">
                    <img src="img/advogada-1.png">
                    <p><strong>Advogada</strong><br>Especialista em Direito Médico</p>
                </div>
                <div class="carousel-item">
                    <img src="img/advogada-2.png">
                    <p><strong>Advogada</strong><br>Especialista em Direito Público</p>
                </div>
                <div class="carousel-item">
                    <img src="img/advogada-3.png">
                    <p><strong>Advogada</strong><br>Especialista em Direito Previdenciário</p>
                </div>
            </div><button class="carousel-nav carousel-next" onclick="scrollCarousel('jur-c', 1)">&#10095;</button>
        </div>`,
    admin: `<h3 class="carousel-title">Administrativo</h3>
        <div class="carousel-wrapper">
            <div class="carousel">
                <div class="carousel-item">
                    <img src="img/admin-1.png">
                    <p><strong>Gerente</strong><br>Marketing Digital</p>
                </div>
                <div class="carousel-item">
                    <img src="img/admin-2.png">
                    <p><strong>Supervisora</strong><br>Departamento de Direitos Humanos</p>
                </div>
            </div>
        </div>`
};

function showContent(key) {
    const allCards = document.querySelectorAll('.team-cards .card');
    allCards.forEach(c => c.classList.remove('active'));
    if (teamContent.classList.contains('show') && teamContent.dataset.current === key) {
        teamContent.classList.remove('show');
        teamContent.dataset.current = '';
    } else {
        teamContent.innerHTML = profiles[key];
        teamContent.dataset.current = key;
        teamContent.classList.add('show');
        const clicked = Array.from(allCards).find(c => c.getAttribute('onclick').includes(key));
        if(clicked) clicked.classList.add('active');
        setupReadMore();
    }
}

function scrollCarousel(id, dir) {
    const el = document.getElementById(id);
    el.scrollBy({ left: dir * 250, behavior: 'smooth' });
}

function setupReadMore() {
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.onclick = (e) => {
            const item = btn.closest('.carousel-item');
            item.classList.toggle('expanded');
            btn.innerText = item.classList.contains('expanded') ? 'Ler menos' : 'Ler mais';
        };
    });
}

const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animate'), i * 150);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.team-cards .card').forEach(c => teamObserver.observe(c));

new Swiper('.swiper-depoimentos', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
    speed: 1000,
    breakpoints: {
        1200: { slidesPerView: 4 },
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
    },
});