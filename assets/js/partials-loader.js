document.addEventListener("DOMContentLoaded", function () {
    // Load Navigation
    fetch('partials/navigation.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navigation-placeholder');
            if (placeholder) {
                placeholder.outerHTML = data;
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }

                // Sidebar Toggle Logic
                const hasMenus = document.querySelectorAll('.nxl-hasmenu > .nxl-link');
                hasMenus.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const parent = this.parentElement;
                        
                        // Accordion behavior cleanup
                        const siblings = parent.parentElement.querySelectorAll('.nxl-hasmenu.active');
                        siblings.forEach(sibling => {
                            if (sibling !== parent) {
                                sibling.classList.remove('active');
                                sibling.classList.remove('nxl-trigger');
                                if (window.jQuery) {
                                    $(sibling).find('.nxl-submenu').slideUp();
                                }
                            }
                        });
                        
                        // Toggle current
                        if (parent.classList.contains('active')) {
                            parent.classList.remove('active');
                            parent.classList.remove('nxl-trigger');
                            if (window.jQuery) {
                                $(parent).find('.nxl-submenu').slideUp();
                            }
                        } else {
                            parent.classList.add('active');
                            parent.classList.add('nxl-trigger');
                            if (window.jQuery) {
                                $(parent).find('.nxl-submenu').slideDown();
                            }
                        }
                    });
                });

                // Set Active State
                const currentPage = window.location.pathname.split("/").pop();
                const navLinks = document.querySelectorAll('.nxl-link'); 
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                        link.parentElement.classList.add('active');
                        const parentMenu = link.closest('.nxl-hasmenu');
                        if (parentMenu) {
                             parentMenu.classList.add('active');
                             parentMenu.classList.add('nxl-trigger');
                             if (window.jQuery) {
                                 $(parentMenu).find('.nxl-submenu').show();
                             }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Error loading navigation:', error));

    // Load Header
    fetch('partials/header.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.outerHTML = data;
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));
});
