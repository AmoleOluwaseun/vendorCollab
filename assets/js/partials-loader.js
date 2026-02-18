document.addEventListener("DOMContentLoaded", function () {
    // Load Navigation
    fetch('partials/navigation.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navigation-placeholder');
            if (placeholder) {
                placeholder.outerHTML = data;

                // Replace feather icons in the newly injected nav
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }

                // Ensure all submenus start closed
                $('.nxl-navbar .nxl-submenu').hide();
                $('.nxl-navbar li').removeClass('nxl-trigger active');

                // Remove any previously bound click handlers, then rebind
                $('.nxl-navbar li').off('click');

                // Top-level menu items (accordion)
                $('.nxl-navbar > li:not(.nxl-caption)').on('click', function () {
                    if ($(this).hasClass('nxl-trigger')) {
                        $(this).removeClass('nxl-trigger');
                        $(this).children('.nxl-submenu').slideUp('fast');
                    } else {
                        $('li.nxl-trigger').children('.nxl-submenu').slideUp('fast');
                        $('li.nxl-trigger').removeClass('nxl-trigger');
                        $(this).addClass('nxl-trigger');
                        $(this).children('.nxl-submenu').slideDown('fast');
                    }
                });

                // Nested submenu items
                $('.nxl-navbar > li:not(.nxl-caption) li').on('click', function (e) {
                    e.stopPropagation();
                    if ($(this).hasClass('nxl-trigger')) {
                        $(this).removeClass('nxl-trigger');
                        $(this).children('.nxl-submenu').slideUp('fast');
                    } else {
                        $(this).parent('.nxl-submenu').find('li.nxl-trigger').children('.nxl-submenu').slideUp('fast');
                        $(this).parent('.nxl-submenu').find('li.nxl-trigger').removeClass('nxl-trigger');
                        $(this).addClass('nxl-trigger');
                        $(this).children('.nxl-submenu').slideDown('fast');
                    }
                });

                // Init PerfectScrollbar on the navbar-content
                if ($('.navbar-content')[0] && typeof PerfectScrollbar !== 'undefined') {
                    new PerfectScrollbar('.navbar-content', {
                        wheelSpeed: 0.5,
                        swipeEasing: false,
                        suppressScrollX: true,
                        wheelPropagation: true,
                        minScrollbarLength: 40
                    });
                }

                // Set active state for current page
                var currentUrl = window.location.href.split(/[?#]/)[0];
                $(".nxl-navigation .nxl-navbar a").each(function () {
                    if (this.href == currentUrl && "" != $(this).attr("href")) {
                        $(this).parent("li").addClass("active");
                        $(this).parent("li").parent().parent(".nxl-hasmenu").addClass("active").addClass("nxl-trigger");
                        $(this).parent("li").parent().parent(".nxl-hasmenu").parent().parent(".nxl-hasmenu").addClass("active").addClass("nxl-trigger");
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
