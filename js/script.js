// Função para inicializar o timer de contagem regressiva
function initCountdown() {
    // Define o tempo final (24 horas a partir de agora)
    const now = new Date();
    const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Atualiza o timer a cada segundo
    const timer = setInterval(() => {
        // Calcula o tempo restante
        const currentTime = new Date();
        const timeLeft = end - currentTime;
        
        // Se o tempo acabou, limpa o intervalo
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.querySelector('#hours').textContent = '00';
            document.querySelector('#minutes').textContent = '00';
            document.querySelector('#seconds').textContent = '00';
            return;
        }
        
        // Calcula horas, minutos e segundos
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Atualiza os elementos na página
        document.querySelector('#hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('#minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('#seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Função para inicializar o acordeão FAQ
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle a classe active no item atual
            item.classList.toggle('active');
            
            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Função para suavizar o scroll ao clicar em links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para mostrar botão de WhatsApp após rolagem
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    // Inicialmente esconde o botão
    whatsappButton.style.opacity = '0';
    whatsappButton.style.visibility = 'hidden';
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        } else {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.visibility = 'hidden';
        }
    });
}




// Função para inicializar exibição do número de estoque limitado
function initLimitedStock() {
    // Espera um pequeno tempo para garantir que os elementos estejam carregados
    setTimeout(() => {
        const plans = document.querySelectorAll('.plan-card');
        
        if (plans.length > 0) {
            plans.forEach((plan, index) => {
                // Cria stocks diferentes para cada plano
                const stocks = [7, 12, 18];
                const stock = stocks[index] || stocks[0]; // Fallback para o primeiro valor se o índice não existir
                
                const stockElement = document.createElement('p');
                stockElement.className = 'stock-info';
                stockElement.innerHTML = `<i class="fas fa-box"></i> Apenas <span class="highlight">${stock}</span> unidades em estoque`;
                stockElement.style.marginTop = '15px';
                stockElement.style.fontSize = '0.9rem';
                
                // Adiciona antes do botão de compra se o botão existir
                const btnOffer = plan.querySelector('.btn-offer');
                if (btnOffer) {
                    btnOffer.parentNode.insertBefore(stockElement, btnOffer);
                } else {
                    // Se o botão não for encontrado, adiciona ao final do card
                    plan.appendChild(stockElement);
                }
                
                // Diminui o estoque a cada 3-5 minutos aleatoriamente
                setInterval(() => {
                    const stockSpan = stockElement.querySelector('span');
                    if (stockSpan) {
                        const currentStock = parseInt(stockSpan.textContent);
                        if (currentStock > 1) {
                            stockSpan.textContent = currentStock - 1;
                        }
                    }
                }, Math.floor(Math.random() * (5 - 3 + 1) + 3) * 60 * 1000);
            });
        } else {
            // Se os planos não foram encontrados, tenta novamente após um tempo maior
            console.log("Planos não encontrados, tentando novamente...");
            setTimeout(initLimitedStock, 1000);
        }
    }, 500);
}


// Função para mostrar popup de saída (exit intent)
function initExitIntent() {
    let popupShown = false;
    
    // Cria o elemento de popup
    const popup = document.createElement('div');
    popup.className = 'exit-popup';
    popup.innerHTML = `
        <div class="exit-popup-content">
            <span class="close-popup">&times;</span>
            <h3>ESPERE! NÃO VÁ EMBORA!</h3>
            <p>Temos uma oferta especial exclusiva para você!</p>
            <div class="exit-offer">
                <h4>10% OFF EXTRA</h4>
                <p>Use o cupom:</p>
                <div class="coupon-code">MAIS10OFF</div>
                <p>Válido apenas hoje!</p>
            </div>
            <a href="#ofertas" class="btn btn-cta">APROVEITAR AGORA</a>
        </div>
    `;
    
    // Estiliza o popup
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '999';
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    popup.style.transition = 'all 0.3s ease';
    
    // Estiliza o conteúdo
    const content = popup.querySelector('.exit-popup-content');
    content.style.backgroundColor = '#fff';
    content.style.borderRadius = '8px';
    content.style.padding = '30px';
    content.style.maxWidth = '500px';
    content.style.position = 'relative';
    content.style.textAlign = 'center';
    
    // Estiliza o botão de fechar
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    
    // Estiliza o cupom
    const coupon = popup.querySelector('.coupon-code');
    coupon.style.backgroundColor = '#f5f5f5';
    coupon.style.padding = '10px 15px';
    coupon.style.margin = '15px auto';
    coupon.style.fontWeight = 'bold';
    coupon.style.fontSize = '1.5rem';
    coupon.style.letterSpacing = '2px';
    coupon.style.borderRadius = '4px';
    coupon.style.border = '2px dashed #006400';
    coupon.style.display = 'inline-block';
    
    // Adiciona à página
    document.body.appendChild(popup);
    
    // Função para mostrar o popup
    function showPopup() {
        if (!popupShown) {
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
            popupShown = true;
        }
    }
    
    // Monitora o movimento do mouse
    document.addEventListener('mouseleave', (e) => {
        // Se o mouse sair pelo topo da página
        if (e.clientY < 5) {
            showPopup();
        }
    });
    
    // Fecha o popup ao clicar no botão ou no fundo
    closeBtn.addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        }
    });
    
    // Fecha o popup ao clicar no botão CTA
    popup.querySelector('.btn-cta').addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    });
}

// Inicializa todas as funções quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    
    // Aguarda um pequeno intervalo para garantir que todos os elementos estão carregados
    setTimeout(() => {
        try {
            initCountdown();
            initFaqAccordion();
            initSmoothScroll();
            initWhatsAppButton();
            initLimitedStock();
            initExitIntent();
            
            // Verifica se os botões de oferta foram carregados corretamente
            const offerButtons = document.querySelectorAll('.btn-offer');
            if (offerButtons.length === 0) {
                console.log("Botões de oferta não encontrados, tentando novamente...");
                setTimeout(() => {
                    attachOfferButtonEvents();
                }, 1000);
            } else {
                attachOfferButtonEvents();
            }
        } catch (error) {
            console.error("Erro ao inicializar funções:", error);
        }
    }, 300);
});

// Função para anexar eventos aos botões de oferta
function attachOfferButtonEvents() {
    const offerButtons = document.querySelectorAll('.btn-offer');
    offerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Cria feedback visual
            const feedback = document.createElement('div');
            feedback.className = 'add-to-cart-feedback';
            feedback.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Produto adicionado ao carrinho!</p>
            `;
            
            // Estiliza o feedback
            feedback.style.position = 'fixed';
            feedback.style.top = '20px';
            feedback.style.left = '50%';
            feedback.style.transform = 'translateX(-50%) translateY(-100px)';
            feedback.style.backgroundColor = 'rgba(0, 100, 0, 0.9)';
            feedback.style.color = '#fff';
            feedback.style.padding = '15px 30px';
            feedback.style.borderRadius = '5px';
            feedback.style.display = 'flex';
            feedback.style.alignItems = 'center';
            feedback.style.zIndex = '9999';
            feedback.style.transition = 'transform 0.3s ease';
            
            // Estiliza o ícone
            feedback.querySelector('i').style.fontSize = '1.5rem';
            feedback.querySelector('i').style.marginRight = '10px';
            
            // Adiciona à página
            document.body.appendChild(feedback);
            
            // Anima a entrada
            setTimeout(() => {
                feedback.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);
            
            // Remove após 3 segundos
            setTimeout(() => {
                feedback.style.transform = 'translateX(-50%) translateY(-100px)';
                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 300);
            }, 3000);
            
            // Redireciona para a seção de checkout (simulado)
            setTimeout(() => {
                const targetLink = button.getAttribute('href');
                const targetElement = document.querySelector(targetLink);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 1000);
        });
    });
}