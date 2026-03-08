  (function ($) {

            $.fn.tabsPlugin = function (options) {

                var settings = $.extend({
                    activeClass: "active",
                    speed: 300,
                    defaultTab: 0
                }, options);
            // phir ye loop chalti hai jitni div hogi uske liye.
                return this.each(function () {
                    console.log(this);

                    var container = $(this);

                    var tabs = container.find(".tab-links li");
                    var panels = container.find(".tab-content div");

                    panels.hide();

                    function activateTab(index) {

                        tabs.removeClass(settings.activeClass);
                        panels.hide();

                        var tab = tabs.eq(index);
                        
                        tab.addClass(settings.activeClass);
                        // console.log(tab);
                        var tabName = tab.data("tab");
                        // console.log(tabName);
                        $("#" + tabName).fadeIn(settings.speed);

                        window.location.hash = tabName;

                    }

                    var hash = window.location.hash.replace("#", "");

                    if (hash) {

                        var index = tabs.index(tabs.filter('[data-tab="' + hash + '"]'));

                        if (index >= 0) {
                            activateTab(index);
                        } else {
                            activateTab(settings.defaultTab);
                        }

                    } else {
                        activateTab(settings.defaultTab);
                    }

                    tabs.on("click", function () {

                        var index = tabs.index(this);

                        activateTab(index);

                    });

                    tabs.on("keydown", function (e) {

                        var index = tabs.index(this);

                        if (e.key === "ArrowRight") {
                            index = (index + 1) % tabs.length;
                            tabs.eq(index).focus();
                            activateTab(index);
                        }

                        if (e.key === "ArrowLeft") {
                            index = (index - 1 + tabs.length) % tabs.length;
                            tabs.eq(index).focus();
                            activateTab(index);
                        }

                    });

                });

            };

        })(jQuery);

        //1.so from here the plugin called
        $(".tabs-container").tabsPlugin({
            activeClass: "active",
            speed: 300,
            defaultTab: 0
        });