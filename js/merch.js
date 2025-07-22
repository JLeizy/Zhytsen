document.addEventListener('DOMContentLoaded', () => {
    class Modal {
        constructor(modalId) {
            this.modal = document.getElementById(modalId);
            this.slides = [];
            this.currentSlide = 0;
            
            if(this.modal) {
                this.init();
            }
        }

        init() {
            this.slides = Array.from(this.modal.querySelectorAll('.thumb-img'));
            this.mainImage = this.modal.querySelector('.featured-image');
            this.thumbnailsContainer = this.modal.querySelector('.secondary-thumbs');
            
            this.addEventListeners();
            this.initFirstThumb();
            this.initHoverEffects();
        }

        addEventListeners() {

            this.thumbnailsContainer.addEventListener('click', (e) => {
                const thumbnail = e.target.closest('.thumb-img');
                if(thumbnail) {
                    const index = this.slides.indexOf(thumbnail);
                    this.showSlide(index);
                }
            });

          
            this.modal.querySelector('.popup-close').addEventListener('click', () => this.close());
            this.modal.addEventListener('click', (e) => {
                if(e.target === this.modal) this.close();
            });
        }

        initFirstThumb() {
            if(this.slides.length > 0 && !this.modal.dataset.initialized) {
                this.slides[0].classList.add('active-thumb');
                this.modal.dataset.initialized = true;
            }
        }

        showSlide(index) {
            this.currentSlide = index;
            this.mainImage.src = this.slides[index].src;
            this.setActiveThumbnail(index);
        }

        setActiveThumbnail(index) {
            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active-thumb', i === index);
            });
        }

        initHoverEffects() {
            this.slides.forEach(thumbnail => {
                thumbnail.addEventListener('mouseenter', () => {
                    this.mainImage.style.opacity = '0.7';
                    this.mainImage.style.transition = 'opacity 0.3s';
                });

                thumbnail.addEventListener('mouseleave', () => {
                    this.mainImage.style.opacity = '1';
                });
            });
        }

        open() {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        
close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
}
    }

  
    const modals = {};
    document.querySelectorAll('.merch-card').forEach(card => {
        const cardId = card.id.match(/\d+/)[0];
        const modalId = `modal${cardId}`;
        
        if(document.getElementById(modalId)) {
            modals[modalId] = new Modal(modalId);
        }
    });

  
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cardId = this.closest('.merch-card').id.match(/\d+/)[0];
            const modalId = `modal${cardId}`;
            
            if(modals[modalId]) {
                modals[modalId].open();
            }
        });
    });

 
    document.querySelectorAll('.buy-btn, .popup-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Вы купілі дадзены тавар! Мы з вамі пазней звяжамся, каб удакладніць час дастаўкі і тэрмін.');
            
        });
    });

   
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            Object.values(modals).forEach(modal => modal.close());
        }
    });
});