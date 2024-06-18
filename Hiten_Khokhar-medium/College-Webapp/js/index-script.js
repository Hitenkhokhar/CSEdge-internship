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
                            handleGridItemAnimation(entry.target, 'fade-left'); // Fade-left animation for third item
                        } else {
                            handleGridItemAnimation(entry.target, 'fade-up'); // Fade-up animation for other items
                        }
                    } else {
                        handleGridItemAnimation(entry.target, 'fade-down'); // Make items invisible when not in view
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

            // Calculate the bottom position of the image container
            var containerBottom = containerPosition.top + imageContainer.clientHeight;

            // Check if the bottom of the image container is within the viewport
            if (containerPosition.top < window.innerHeight && containerBottom > 0) {
                // Calculate the percentage of scroll progress relative to the image container
                var scrollPercentage = (window.innerHeight - containerPosition.top) / (window.innerHeight + imageContainer.clientHeight);
                
                // Limit scrollPercentage between 0 and 1
                scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);

                // Calculate the initial and final angles
                var initialAngle = 70; // Initial rotation angle in degrees
                var finalAngle = 0; // Final rotation angle in degrees

                // Calculate the current angle based on scrollPercentage
                var angle = initialAngle + (finalAngle - initialAngle) * (2*scrollPercentage);

                if(angle > finalAngle){
                image.style.transform = 'rotateX(' + angle + 'deg)';
                 // Show the image container
                }
                else{
                    var oangle = -angle;
                    image.style.transform = 'rotateX(' + oangle + 'deg)';
                }
                // Set scrolledToOriginal to true once the final angle is reached
                if (scrollPercentage >= 1 && !scrolledToOriginal) {
                    scrolledToOriginal = true;
                }

                // Check if the final angle has been reached and prevent further rotation
                
            } else {
                // If scrolled out of view, reset opacity and rotation
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
                const speed = shape.dataset.speed || 1; // Default speed is 1 if not set
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
            }, 2800); // Interval in milliseconds
        }

        // Pause auto scrolling on hover
        cardScroll.addEventListener('mouseover', () => {
            clearInterval(scrollInterval);
        });

        // Resume auto scrolling on mouseout
        cardScroll.addEventListener('mouseout', () => {
            startAutoScroll();
        });

        // Initial call to start auto scrolling
        startAutoScroll();

        // Update progress bar and shapes on manual scroll
        cardScroll.addEventListener('scroll', () => {
            updateProgress();
        });