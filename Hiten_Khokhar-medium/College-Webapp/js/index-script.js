var grid = document.querySelector('.grid');
const gridItems = document.querySelectorAll('.grid-item');
        var msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: 100,
            gutter: 10,
        });

        document.addEventListener('DOMContentLoaded', function() {
            
            const observerOptions = {
                threshold: 0.5 // Trigger animation when at least 50% of the item is visible
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        if (entry.target.classList.contains('grid-item-3')) {
                            handleGridItemAnimation(entry.target, 'fade-left');
                        } else {
                            handleGridItemAnimation(entry.target, 'fade-up'); 
                        }
                    } else {
                        handleGridItemAnimation(entry.target, 'fade-down'); 
                    }
                });
            }, observerOptions);
            
            gridItems.forEach(item => {
                observer.observe(item);
            });
            
            function handleGridItemAnimation(item, animationType) {
                switch (animationType) {
                    case 'fade-up':
                        item.classList.add('visible', 'fade-up');
                        break;
                    case 'fade-left':
                        item.classList.add('visible', 'fade-left');
                        break;
                    case 'fade-down':
                        item.classList.remove('visible', 'fade-up', 'fade-left');
                        break;
                    default:
                        break;
                }
            }
        });
        

        function handleMasonry() {
            if (window.innerWidth <= 580) {
                gridItems.forEach(item => {
                    item.classList.remove('fade-up', 'fade-left');
                });
                if (msnry) {
                    msnry.destroy();
                    msnry = null;
                }
            } else {
                if (!msnry) {
                    msnry = new Masonry(grid, {
                        itemSelector: '.grid-item',
                        columnWidth: 100,
                        gutter: 10,
                    });
                }
            }
        }
    
        window.addEventListener('resize', handleMasonry);
        handleMasonry();

        window.addEventListener('scroll', function() {
            const image = document.querySelector('.scroll-image');
            const rect = image.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight) {
                image.classList.add('revealed');
            } else {
                image.classList.remove('revealed');
            }
        });


        // ************************education image handeling starts here***************************************

        var scrolledToOriginal = false;
        var finalAngleReached = false;

        function updateImageRotation() {
            var imageContainer = document.getElementById('imageContainer');
            var image = document.getElementById('animatedImage');
            var containerPosition = imageContainer.getBoundingClientRect();
            var scrollPosition = window.scrollY || window.pageYOffset;

           
            var containerBottom = containerPosition.top + imageContainer.clientHeight;

            
            if (containerPosition.top < window.innerHeight && containerBottom > 0) {
                
                var scrollPercentage = (window.innerHeight - containerPosition.top) / (window.innerHeight + imageContainer.clientHeight);
                
               
                scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);

                
                var initialAngle = 70;
                var finalAngle = 0;

                
                var angle = initialAngle + (finalAngle - initialAngle) * (2*scrollPercentage);

                if(angle > finalAngle){
                image.style.transform = 'rotateX(' + angle + 'deg)';
                 
                }
                else{
                    var oangle = -angle;
                    image.style.transform = 'rotateX(' + oangle + 'deg)';
                }
                
                if (scrollPercentage >= 1 && !scrolledToOriginal) {
                    scrolledToOriginal = true;
                }

                
                
            } else {
                
                image.style.transform = 'rotateX(' + initialAngle + 'deg)';
                scrolledToOriginal = false;
                finalAngleReached = false;
            }
        }

        window.addEventListener('scroll', updateImageRotation);
        window.addEventListener('resize', updateImageRotation); // Ensure it works on resize
        document.addEventListener('DOMContentLoaded', updateImageRotation);

        //****************************** activity js

        const cardScroll = document.getElementById('cardScroll');
        const progressBar = document.getElementById('progressBar');

        const shapes = document.querySelectorAll('.shape');

        cardScroll.addEventListener('scroll', function () {
            const scrollPercentage = (cardScroll.scrollLeft / (cardScroll.scrollWidth - cardScroll.clientWidth)) * 100;
            progressBar.style.width = scrollPercentage + '%';

            shapes.forEach(shape => {
                const speed = shape.dataset.speed || 1; 
                const movement = cardScroll.scrollLeft * speed;
                shape.style.transform = `translateX(${movement}px)`;
            });
        });
        let scrollInterval
        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                cardScroll.scrollLeft += cardScroll.clientWidth;
                
                console.log(cardScroll.scrollLeft);
                if (cardScroll.scrollLeft >= ( 4 * cardScroll.clientWidth)) {
                    console.log("hi");
                    cardScroll.scrollLeft = 0;
                    
                }
            }, 2800);
        }

        
        cardScroll.addEventListener('mouseover', () => {
            clearInterval(scrollInterval);
        });

        
        cardScroll.addEventListener('mouseout', () => {
            startAutoScroll();
        });

        
        startAutoScroll();

        
        cardScroll.addEventListener('scroll', () => {
            updateProgress();
        });