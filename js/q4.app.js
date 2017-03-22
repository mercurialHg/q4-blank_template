/**
 * Reuseable functions used on Q4 Websites
 * @class q4.app
 * @version 1.0.2
 * @example 
 * - q4.app.js is already loaded on blank
 * - defaults are extended in mainscripts and the init() function is executed (see the below code example)
 *
 * var q4App = $.extend( q4Defaults, {
 *     init: function() {
 *         var app = this;
 *         
 *         app.cleanUp();
 *         app.unWrapLink('a.StockPrice');
 *         app.submitOnEnter('.ModuleSearch');
 *         app.submitOnEnter('.MailingListUnsubscribeContainer');
 *         app.validateSubmit('.ModuleSearch');
 *         app.accessibleNav($('.navbar-collapse'), 'level1');
 *         app.onMenuToggle();
 *         app.onMenuExit($('.PaneNavigation .menu-close'));
 *
 *     }
 * )});
 *
 * q4App.init();
 *
 * - multiple subpages on blank 
 * - you can extend q4App inside the global module : 
 *
 * var q4App = $.extend( q4Defaults, {
 *     init: function() {
 *         this.myFunction()
 *     },
 *     myFunction: function() {...}
 * )});
 *
 * or on an inner page q4App.myFunction() {}
 *
*/

/** @lends q4.app */
var q4Defaults = {
    options: {
        scrollSpeed: 1000,
        /**
         * Any mailing list with this class will have their validation overwritten
         */
        mailingListSignupCls: '.module-subscribe--fancy',
        /**
         * Custom template for email validation
         */
        errorTpl: (
            '<ul>' +
                '{{#.}}' +
                    '<li>{{name}} {{message}}</li>' +
                '{{/.}}' +
            '</ul>'
        ),
        /**
         * Template to overwrite mailing list signup confirmation html.
         */
        mailingListConfirmationTpl: (
            '<div class="module module-subscribe module-subscribe--fancy dark grid_col grid_col--3-of-6 grid_col--md-1-of-2">' +
                '<div class="module_container--outer">' +
                    '<h2 class="module_title">' +
                        '<span class="ModuleTitle">Email Alerts</span>' +
                    '</h2>' +
                    '<div class="module_container--inner">' +
                        '<p>Thank you for signing up for the mailing lists. An activation email will be sent to you shortly.</p>' +
                    '</div>' +
                '</div>' +
            '</div>'
        )
    },

    /**
     * A test used to detect whether not the device satisfies a certain OS
     * @example if (app.isMobile.any()) { // If on a mobile device, execute code }
     */
    isMobile: {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    },

    // Default init function
    init: function() { },

    // Removes DOM elements on load
    cleanUp: function() {
        $('#lnkPostback').remove();
        $('#litPageDiv > a:first').remove();
    },

    // Easier preview navigation
    resetDate: function() {
        if (GetViewType() === "0") {
            console.log("q4App.resetDate() is in effect.");
            $('a[href*="s3.q4web.com').each(function() {
                $(this).attr('href', $(this).attr('href') + '&ResetDate=1');
            });
        }
    },

    /**
     * Used to replace an anchor with a span.
     * @param {cls}  [selector] a selector containing a item to be unwrapped
     * @example <pre>
     *    before: &lt;a class="unwraplink" href="#"&gt;Text to unwrap&lt;/a&gt;
     *
     *    app.unWrapLink( 'a.StockPrice' );
     *
     *    after: &lt;span class="unwraplink"&gt;Text to unwrap&lt;/span&gt;
     * </pre>
     */
    unWrapLink: function(cls) {
        $(cls).replaceWith(function(){
            return $('<span class="'+ cls.split('.').pop() +'">' + $(this).html() + '</span>');
        }); 
    },

    /**
     * Used to reveal an element by clicking on a trigger element.
     * Use this function to create anything from "Read More" buttons to revealing hidden elements with a trigger.
     * @param {container} [selector]  the wrapping element
     * @param {trigger} [selector]  the element that will be clicked to reveal 
     * @param {panel} [selector]  the element to be revealed
     * @param {once} [boolean]  (optional) whether or not the event will be triggered only once
     * @example app.reveal('.read-more', '.read-more_button', '.read-more_panel', true);
     */
    reveal: function(container, trigger, panel, once) {
        if (once) {
            $(container).one('click', trigger, function(e) {
                e.preventDefault();
                $(this).toggleClass('js--active').closest(container).find(panel).toggleClass('js--revealed');
            });
        } else {
            $(container).on('click', trigger, function(e) {
                e.preventDefault();
                $(this).toggleClass('js--active').closest(container).find(panel).toggleClass('js--revealed');
            });
        }
    },

    /**
     * Used to remove the duplicate classes on a Quick Link Module's <ul> element
     * @param {$el} [element]  the quick links module to clean up
     * @example app.cleanQuickLinks($('.module-links'));
     */
    cleanQuickLinks: function($el) {
        $el.find('ul').attr('class', 'module-links_list');
    },

    /**
     * Hide module if "module not found" text is present
     * @param {$el}  [element] the element containing the "module not found" text
     * @param {$hidden}  [element] the element that will be hidden
     * @example app.moduleNotFound( $('.EditSubscriberConfirmation'), $('.MailingListUnsubscribeContainer, .subscribe-text') );
     */
    moduleNotFound: function($el, $hidden) {
        if ( $el.text().trim().length ) {
            $hidden.hide();
        }
    },

    /**
     * Scroll to an element on the page
     * @param {$el}  [element] A selector containing the element to scroll to
     * @example app.scrollTo( $('div[id*="SubscriberConfirmation"]') )
     */
    scrollTo: function($el, duration) {
        var d = duration !== undefined && !isNaN(duration) ? duration : this.options.scrollSpeed;
        if ( $el.length ) {
            if (history) { 
                history.scrollRestoration = 'manual';
            }

            $('html, body').animate({
                scrollTop: $el.eq(0).offset().top
            }, d);
        }
    },

     /**
     * Validate if a string is a vaild email address
     * @param {emailAddress} [string]  An email address that will be tested against the regular expression
     * @example app.isValidEmailAddress ( 'support@q4inc.com' );
     * @return boolean
     */
    isValidEmailAddress: function(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    },

    /**
     * Attaches a click handler to the modules submit button which will not allow 
     * the form to submit without a true email address
     * @param {$el} [element]  an element containing the submit button
     * @example app.validateUnsubscribe($('.MailingListUnsubscribeContainer'));
     */
    validateUnsubscribe: function($el) {
        var inst = this;

        $el.find('input[type="submit"]').on('click', function(e){
            if ( !inst.isValidEmailAddress ( $el.find('input[id*="Email"]').val() ) ) {
                $el.find('.MailingListUnsubscribeMessage').html('Please enter a valid Email Address');
                e.preventDefault();
            }
        });
    },
    
    /**
     * Attaches a check to a search module's submit button which will not allow
     * the module to submit without text inside the search input
     * @param {selector} [selector]  the class being used by the search module
     * @example app.validateSubmit('.module-search');
     */
    validateSubmit: function(selector) {
        var $search = $(selector);

        $search.on('click', 'input:submit', function(e){
            if ( !$(this).closest(selector).find('input:text').val().length ){
                e.preventDefault();
                return false;
            }
        });
    },

    /**
     * Allows the user to submit our forms using the enter key
     * @param {selector} [selector]  the class being used by the formbuilder module
     * @example app.submitOnEnter('.module-form')
     */
    submitOnEnter: function(selector) {
        $(selector).find('input[type="text"]').removeAttr('onkeypress').on('keydown', function(e){
            if (e.keyCode == 13) {
                e.preventDefault();
                $(this).closest(selector).find('input[type="submit"]').trigger('click');
                return false;
            }
        });
    },

    _onMobileMenuExpand: function($nav) {
        $nav.on('click', 'li.has-children > a', function(e) {
            var $this = $(this),
                $parent = $this.parent();
            if (!$parent.hasClass('js--expanded')) {
                e.preventDefault();
                $parent.siblings().removeClass('js--expanded');
                $parent.addClass('js--expanded');
            }
        });
    },

    /**
     * Accessible Navigation powered by Superfish
     * @param {$nav} [element]  the nav element (or ul element) you would like to apply superfish to
     * @param {options} [object]  options to be passed into superfish
     * @example app.superfish($('.nav--secondary .level2'), {cssArrows:false}, 1024)
     */
    superfish: function($nav, options) {
        if (!this.isMobile.any()) {
            $nav.superfish(options);
        }
    },

    /**
     * Standard mobile menu functionality
     * @param {$layout} [element]  the default layout element
     * @param {pane} [selector]  the class of the pane element containing the mobile navigation
     * @param {toggleClass} [selector]  the class assigned to the element used to toggle the mobile navigation
     * @example app.mobileMenuToggle($('.layout'), '.pane--navigation', '.layout_toggle i')
     */
    mobileMenuToggle: function($layout, pane, toggle) {
        var inst = this;
        $layout.on('click', toggle, function(e) {
            $layout.toggleClass('js--mobile');
            inst._onMobileMenuExpand($('.js--mobile ' + pane + ' .nav'));
        });
    },

    /**
     * Gives a navigation element accessibility assistance in the form of the .focused class.
     * @param {$nav} [element]  the navigation element used for this function
     * @param {topLevel} [selector]  the class assigned to the highest visible level of the navigation
     * @example app.accessibleNav($('.nav'), '.level1')
     */
    accessibleNav: function($nav, topLevel) {
        $nav.on('focus ', 'a' ,function(e) {
            var $link = $(this);
            $link.closest('ul').find('li').removeClass('js--focused');
            $link.closest('li').addClass('js--focused');

            if ( $link.closest('li').is(':last-child') && $link.closest('ul').is(topLevel) ) {
                $link.blur(function() {
                    $link.closest(topLevel).find('li').removeClass('js--focused');
                });
            }
        });
    },

    /**
     * Gives element accessibility properties suitable for accordions, slide toggles, and tab navigation.
     * @param {$tablist} [element]  the wrapping element for the accessible section
     * @param {$tab} [element]  the element used to toggle the appropriate $tabpanel
     * @param {$tabpanel} [element]  the element intended to display in respect to the currently selected $tab
     * @example app.accessibilize($tablist, $tab, $tabpanel)
     */
    accessibilize: function($tablist, $tab, $tabpanel) {
        $tablist.attr('role','tablist');
        $tab.attr('tabindex','0').attr('role','tab').attr('aria-expanded','false');
        $tabpanel.attr('role','tabpanel').addClass('js--hidden');
    },

    /**
     * Creates a fully accessible expanding and collapsing accordion with the ability to switch between toggle and accordion functionality.
     * @param {$container} [element]  the wrapping element for the toggle list
     * @param {item} [selector]  the class assigned to each designated toggling element
     * @param {toggle} [selector]  the class assigned to the element that will toggle the containing item
     * @param {panel} [selector]  the class assigned to the section that will be revealed if its containing item is toggled
     * @param {accordion} [boolean]  (optional) if true, the toggling section will take on accordion functionality
     * @param {allButton} [boolean]  (optional) if true, the toggling section will be accompanied by a "Hide All / Show All" button
     * @param {openFirst} [boolean]  (optional) if true, the first item will be set to active with its panel revealed
     * @example app.toggle($('.accordion'), '.accordion_item', '.accordion_toggle', '.accordion_panel', false, true);
     */
    toggle: function($container, item, toggle, panel, accordion, allButton, openFirst) {
        var $this = this,
            $item = $container.find(item);

        $this.accessibilize($container, $container.find(toggle), $container.find(panel));
        
        $item.on('click keypress', toggle, function(e) {
            e.preventDefault();
            if (e.which == 13 || e.type == 'click') {
                if (accordion) {
                    $this._accordionTrigger($(this), $container, item, toggle, panel);
                } else {
                    $this._toggleTrigger($(this), $container, item, panel);
                }
            }
        });

        if (allButton) {
            $this._toggleAll($container, item, toggle, panel);
        }

        if (openFirst) {
            $item.first().find(toggle).attr('aria-expanded', true);
            $item.first().addClass('js--active').find(panel).removeClass('js--hidden');
        }
    },
    _toggleAll: function($container, item, toggle, panel) {
        $container.prepend('<div class="accordion-toggle-all"><a href="#all"></a></div>').on('click', '.accordion-toggle-all a', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
            if ( $(this).parent().is('.active') ) {
                $container.find(toggle).attr('aria-expanded', 'true');
                $container.find(item).addClass('js--active');
                $container.find(panel).slideDown(400, function() {
                    $(this).removeClass('js--hidden');
                });
            } else {
                $container.find(toggle).attr('aria-expanded', 'false');
                $container.find(item).removeClass('js--active');
                $container.find(panel).slideUp(400, function() {
                    $(this).addClass('js--hidden');
                });
            }
        });
    },
    _accordionTrigger: function($this, $container, item, toggle, panel) {
        if ( !$this.closest(item).hasClass('js--active') ) {
            $(item).removeClass('js--active');
            $container.find(toggle).attr('aria-expanded', false);
            $container.find(panel).slideUp(400, function() {
                $(this).addClass('js--hidden');
            });

            $this.attr('aria-expanded', true);
            $this.closest(item).addClass('js--active').find(panel).slideDown(400, function() {
                $(this).removeClass('js--hidden');
            });
        }
    },
    _toggleTrigger: function($this, $container, item, panel) {
        var $allToggle = $container.find('.accordion-toggle-all');

        $this.attr('aria-expanded', function(i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).closest(item).toggleClass('js--active').find(panel).slideToggle(400, function() {
            $(this).toggleClass('js--hidden');
        });

        if ( $container.find(item).not('.js--active').length ) {
            $allToggle.removeClass('js--active');
        } else {
            $allToggle.addClass('js--active');
        }
    },

    /**
     * Used to hide the "Remind Me" functionality for events modules if a reminder has already been created.
     * Works for both list and details pages.
     * @param {$el} [element]  element(s) containing the "Remind Me" form
     * @example app.remindMeOnce($('.module-event .module_item')); or app.remindMeOnce($('.module-event-details'));
     */
    remindMeOnce: function($el) {
        $el.each(function() {
            if ( $(this).find('.ReminderError').text().length ) {
                $(this).find('.ModuleReminderContainer').addClass('js--reminded');
            }
        });
    },

    /**
     * Our standard "Add to Calendar" functionality. Opens up a fancybox.
     * @param {selector} [element]  Selector for the module containing "Add to Calendar" links
     * @example app.addToCalendar('.module-event'); or app.addToCalendar('.module-event-latest, .module-event-upcoming');
     */
     addToCalendar: function(selector) {
        $(selector).on('click', '.module_add-to-calendar-reveal', function(e) {
            var fancyContent = $(this).next()[0].outerHTML;
            $.fancybox.open({
                src: fancyContent,
                type: 'inline',
                opts: {
                    slideClass: 'fancybox-slide--no-padding'
                }
            });
        });
     },
    /**
     * Used to hide the "Add to Calendar" functionality for past events. Works for both list and details pages.
     * @param {$events} [element]  element(s) containing the unwanted "Add to Calendar" link
     * @example app.hidePastCal($('.module-event .module_item')); or app.hidePastCal($('.module-event-details'));
     */
    hidePastCal: function($events) {
        var today = new Date();
        $events.each(function() {
            var $this = $(this),
                $date = $this.find('.ModuleDate');

            if ( $date.text().indexOf("from") >= 0 ) {
                var isolateDate = $date.text().split('from ').pop().split('to ');
                if (today > new Date(isolateDate[1])) {
                    $this.find('.module_add-to-calendar').addClass('js--hidden');
                }
            } else if (today > new Date($date.text())) {
                $this.find('.module_add-to-calendar').addClass('js--hidden');
            }
        });
    },

    _formErrorFormat: function(error) {
        $(error).each(function() {
            if ( $(this).css('visibility') == 'hidden' ) {
                $(this).parent().addClass('hidden');
            } else {
                $(this).parent().removeClass('hidden');
            }
        });
    },

    /**
     * A set of functions used to improve our formbuilder modules.
     * @param {$form} [element]  - the form module this function works for
     * @param {$hidden} [element]  - an element to hide once the form has been submitted
     * @example app.formBuilde($('.module-form'), $('.module-form-intro'));
     */
    formBuilder: function($form, $hidden) {
        var inst = this;

        // check if the form is on the page (it won't be once the form is submitted)
        if ( $form.length ) {
            var errorContainer = $form.find('.error-container');

            // if a set of radio buttons is present, check the first automatically (requirement fix)
            $form.find('.ItemClass input:radio').closest('table').each(function(){
                $(this).find('input:radio:first').prop('checked', true);
            });

            // if a set of check boxes is present, hide the first check box and check it (requirement fix)
            $form.find('.ItemClass input:checkbox').closest('table').addClass('checkboxTable').each(function(){
                $(this).find('input:checkbox:first').parent().hide();
            }); 

            $form.find('.Item').each(function() {
                // assign placeholder values to all inputs
                var name = $(this).find('.label-wrap .Label').text();
                $(this).find('.field-wrap input').attr('placeholder', name);

                // append each error message item to one container (like email alerts)
                var errorMessage = $(this).find('.error-wrap span');
                var errorClass = ( errorMessage.closest('.ItemClass').attr('class') || '').split(' ')[1];

                errorMessage.addClass(errorClass).appendTo(errorContainer).wrap('<li></li>');
            });

            // convert captcha's red star to an error message and append to the error container
            $form.find('.CaptchaContainer span').text("Please provide the code").appendTo(errorContainer).wrap('<li></li>');

            // CMS forces errors to use visibility: hidden, so let's keep track of it and use display:none on the list item instead.
            inst._formErrorFormat( $form.find('.ErrorMessage') );
            $form.find('.SubmitButton').on( 'click', function() {
                inst._formErrorFormat( $form.find('.ErrorMessage') );
            });

            // email validation - need to find a way to make it work with this setup
            $form.find('.SubmitButton').on( 'click', function() {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                    ErrorMessages = errorContainer.find('.ItemClassEmail');
                if(!emailReg.test($('.Item .ItemClassEmail input:last').val())) {
                    ErrorMessages.parent().show();
                    ErrorMessages.css('visibility', 'visible');
                    return false;
                }
                if ($('.Item .ItemClassEmail input:last').val().length > 1) {
                    $el.find('.checkboxTable').each(function(){
                        if (!$(this).find('input:checkbox').is(':checked')){
                            $(this).find('input:checkbox:first').prop('checked', true); 
                        }
                        else if ($(this).find('input:checkbox:not(":first")').is(':checked')){
                            $(this).find('input:checkbox:first').prop('checked', false);
                        }
                    });

                    ErrorMessages.parent().hide();
                    ErrorMessages.css('visibility', 'hidden');
                }
                return true;
            });
        } else {
            inst.moduleNotFound($('.MessageSent'), $hidden);
        }
    },
    /**
     * Opens the Mailing List Signup - Captcha inside a fancybox
     * @param {$el} [element] The mailing list module
     * @example app.fancySignup( '.module-subscribe' );
     */
    fancySignup: function() {
        var inst = this,
            signup = inst.options.mailingListSignupCls;
            $signup = $(signup);


        // Subscriber Confirmation fix
        if ( $('div[id*="SubscriberConfirmation"]').is(':visible') ) {
            $('div[id*="SubscriberConfirmation"]').parent().html( inst.options.mailingListConfirmationTpl );
            inst.scrollTo( $(signup), 0 );
        }

        // If a confirmation or error message is visible on page load, scroll to the module
        if ($(signup).find('input.module_input').length && $(signup).find('input.module_input').val().length){
            inst.scrollTo( $(signup), 0 );
        }

        if ( !$signup.length ) {
            return;
        }

        // Accessibility fixes
        $signup.find('img').attr('alt', 'Captcha');
        $signup.find('input[type="text"]').attr('aria-label', 'Captcha Text');
        $signup.find('table').removeAttr('cellpadding cellspacing border width');

        // Create a second submit button to be displayed inside fancybox
        $signup.find('input[type="submit"]').removeAttr('onclick').clone().appendTo( $signup.find('.CaptchaContainer') );

        $signup.on('click', 'input[type="submit"]', function(e){
            e.preventDefault();

            var $signup = $(this).closest( signup ),
                errors = inst._mailingListValidation( $signup );

            $signup.find('.module_error-container').html('');

            if ( !errors.length ) {
                $signup.find('.CaptchaContainer').data( 'container', $signup.attr('id') );

                $.fancybox.open({
                    src  : '.CaptchaContainer',
                    type : 'inline',
                    opts : {
                        onComplete : function() {
                            $('.fancybox-container').appendTo($('#litPageDiv form:first'));
                        }
                    }
                });
            } else {
                $signup.find('.module_error-container').html( Mustache.render( inst.options.errorTpl, errors ) ).show();
            }

            return false;
        });

        // Submit form on enter
        $signup.find('.CaptchaContainer input[type="text"]').on('keydown', function(e){
            if (e.keyCode == 13) {
                e.preventDefault();
                $(this).closest('.CaptchaContainer').find('input[type="submit"]').trigger('click');
                return false;
            }
        });

        // Make sure the Captcha is filled out
        $signup.find('.CaptchaContainer')
            .prepend('<div class="module_error-container"></div>')
            .find('input[type="submit"]').on('click', function(e){
                var $container = $(this).closest('.CaptchaContainer');

                if ( !$container.find('input[type="text"]').val().length ) {
                    e.preventDefault();
                    $container.find('.module_error-container').html('Captcha is required');
                } else if ($container.find('input[type="text"]').val().length !== 6 ) {
                    e.preventDefault();
                    $container.find('.module_error-container').html('Captcha is invalid');
                }
            });

        // Validate submit on enter
        $signup.find('input[type="text"]').on('keydown', function(e){
            if (e.keyCode == 13) {
                e.preventDefault();
                $(this).closest('.module-subscribe--fancy').find('.module_actions input[type="submit"]').trigger('click');
                return false;
            }
        });
    },
    /**
     * Validates all required fields.
     * Used by default with fancySignup before displaying captcha.
     * Returns an array of errors
     * @param {$el} [element] The mailing list module
     */
    _mailingListValidation: function( $el ) {
        var inst = this,
            errors = [];

        $el.find('.module-subscribe_table-row--invalid').removeClass('module-subscribe_table-row--invalid');

        $el.find('.module_required').each(function(){
            var $item = $(this).closest('.module-subscribe_table-input'),
                message = 'is required',
                field = $item.find('label:first').text(),
                validation = true;

            // Does the input exist?
            if ( $item.find('input').length ) {
                if ( $item.hasClass('module-subscribe_email') ) {
                    // Does the email address contain text?
                    if ( !$item.find('input').val().length ) {
                        validation = false;
                    } 
                    // Is the email address valid?
                    else if ( !inst.isValidEmailAddress ( $item.find('input').val() ) ) {
                        validation = false;
                        message = 'is invalid';
                    }
                } 
                // Does the input contain text?
                else if ( !$item.find('input').val().length ) {
                    validation = false;
                }
            } else if ( $item.find('select').length ) {
                if ( !$item.find('select option:selected').index() ) {
                    validation = false;
                }
            } else {
                if ( !$item.closest('table').find('input[type="checkbox"]:checked').length ) {
                    $item = $item.next();
                    validation = false;
                }
            }

            if (!validation) {
                $item.addClass('module-subscribe_table-row--invalid');
                errors.push({
                    name: field,
                    message: message
                });
            }
        });

        return errors;
    },

    /**
     * Used to automatically set the copyright year to the current year.
     * @param {$el} [element]  an element that will have its html replaced by the year
     * @example app.copyright($('.copyright_year'));
     */
    copyright: function($el) {
        $el.html( new Date().getFullYear() );
    },

    /**
     * Small plugin used for document tracking w/ Google Analytics
     * @example app.docTracking();
     */
    docTracking: function() {
        var fileTypes,
            domainRegex,
            cdnRegex,
            httpRegex,
            baseHref,
            baseTag,
            currentPageMatches,
            currentDomain;

        // Fix for IE8
        window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty; // jshint ignore:line

        baseHref = '';
        fileTypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|mp4|txt|rar|html|wma|mov|avi|wmv|flv|wav)(\?.*)?$/i;
        domainRegex = /^https?:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
        httpRegex = /^https?\:\/\//i;
        cdnRegex = /.*\.cloudfront\.net$/i;
        currentPageMatches = window.location.href.match(domainRegex);
        currentDomain = currentPageMatches.length > 0 ? currentPageMatches[1] : false;
        baseTag = $('base');

        if (baseTag.length > 0 && baseTag.attr('href') !== undefined) {
            baseHref = baseTag.attr('href');
        }

        $('body').on('click', 'a', function(event) {
            var el,
                elEv,
                href,
                domainMatches,
                linkDomain,
                isSiteDomain,
                extensionMatch;

            el = $(this);
            href = el.attr('href') || '';

            // Don't do anything with javascript links
            if (href.match(/^javascript:/i)) {
                return;
            }

            // Extract domain from link
            domainMatches = href.match(domainRegex);

            // Set link domain to the current if nothing matched (e.g. relative URL, tel/mailto)
            linkDomain = null !== domainMatches ? domainMatches[1] : currentDomain;

            // Does the domain match, or is this a CDN
            isSiteDomain = linkDomain === currentDomain || cdnRegex.test(linkDomain) || linkDomain.toLowerCase().indexOf('q4cdn') > -1;

            // Event defaults
            elEv = {
                value: 0,
                non_i: false,
                action: 'click',
                loc: href
            };

            if (href.match(/^mailto\:/i)) {
                // Email links
                elEv.category = 'email';
                elEv.label = href.replace(/^mailto\:/i, '');
            } else if (href.match() && !isSiteDomain) {
                // External downloads always have http[s]
                elEv.category = 'external';
                elEv.label = href.replace(httpRegex, '');
                elEv.non_i = true;
            } else if (null !== (extensionMatch = href.match(fileTypes))) {
                // Matches a filetype we care about (extensionMatch[1] is the type)                
                elEv.category = 'download';
                elEv.action = 'download';
                elEv.label = href.replace(/ /g,'-').replace(httpRegex, '');
                // Only add the base ref if its not a CDN link, or if the link is relative
                elEv.loc = (cdnRegex.test(linkDomain) ? '' : baseHref) + href;
            } else if (href.match(/^tel\:/i)) {
                // iOS tel:// links
                elEv.category = 'telephone';
                elEv.action = 'click';
                elEv.label = href.replace(/^tel\:/i, '');
            } else {
                return;
            }

            window.ga('send','event', elEv.category, elEv.action, elEv.label.toLowerCase(), elEv.value,{'nonInteraction': elEv.non_i});
            window.ga('Client.send','event', elEv.category, elEv.action, elEv.label.toLowerCase(), elEv.value,{'nonInteraction': elEv.non_i});
        });
    }
};