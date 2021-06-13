(function(window) {
    
    /** ##### MYTHRILCMS JS APPLICATION CORE #####
     * Messy Implementation of VueJS (given that without its Router) for MythrilCMS Dashboard
     * 
     * 
     * GOAL: Provide UI reactivity without suffering from performance loss
     * 
     * TODO: Integrate to Vue Router and then later replace the old Vue with Vuex for better state management
     * 
     */
     
     // Flag: Is this still in development and not for production? (Later to be removed, for debugging purposes only)
    var isDevMode = true
    var finalize = function(url) {
        if (
            !isDevMode &&
            !url.includes(".min")
        ) {
            url += ".min";
        }

        return url;
    };
    
    // Virtual Console is needed for mobile browsers as it doesnt support the standard browsers' dev tools e.g. Inspect Element
    var vconsole_scripts = [
        finalize("js/lib/vconsole.min"),
        finalize("js/lib/vconsole-plugins.min"),
    ];

    var pre_init_scripts = [];
    var post_init_scripts = [
        finalize("js/lib/vue"),
        finalize("js/lib/chart.min"),
        finalize("js/lib/lz-string"),
        finalize("js/fs"),
        finalize("js/components/custom-directives"),
        finalize("js/components/sidebar"),
        finalize("js/components/navbar"),
        finalize("js/components/breadcrumbs"),
        finalize("js/components/alerts"),
        finalize("js/components/cards"),
        finalize("js/components/fabs"),
        finalize("js/components/todaysitehealth"),
        finalize("js/components/charts"),
    ];

    var vconsole_plugins = [
        "erudaTiming",
        "erudaDOM",
        "erudaMemory",
        "erudaFPS",
    ];

    var loadConsole = function() {
        return new Promise((resolve, reject)=> {
            // Flag: We need to check whether the current page url has params "show-alt-console" and was set to true. We dont want to load the vconsole when not its not necessary
            if (/show-alt-console=true/.test(window.location)) {

                define(vconsole_scripts, function(Console, ConsolePlugins) {


                    Console.init();

                    define(vconsole_plugins, function(
                        timing,
                        dom,
                        memory,
                        fps
                    ) {

                        Console.add(timing);
                        Console.add(dom);
                        Console.add(memory);
                        Console.add(fps);

                    });

                    resolve();
                });

            } else {
                resolve();
            }
        });
    };

    loadConsole().then(()=> define(pre_init_scripts, function() {

        define(post_init_scripts, function(
            Vue,
            LZString,
            $Chart,
            fs,
            Directives,
            Sidebar,
            Navbar,
            Breadcrumbs,
            Alerts,
            Cards,
            FABs,
            TodaySiteHealth,
            Charts
        ) {
            
            /**
             * All of this data will "supposed to be"
             * fetched in a Database using PHP+AJAX
             * in the future, so this is temporarily
             * displayed here for demonstrations.
             */
             
             var multiply = {
                 beforeDatasetsDraw: function(chart, options, el) {
                     chart.ctx.globalCompositeOperation = 'multiply';
                     
                 },
                 afterDatasetsDraw: function(chart, options) {
                     chart.ctx.globalCompositeOperation = 'source-over';
                     
                 },
                 
             };
             
            var globaldata = {

                site: {
                    name: "MythrilCMS",
                },

                user: {
                    username: "admin",
                    password: "Hawtf1234",
                    fullname: "Java Potato",
                    role: "Admin",
                    team: "Upper Management",
                    profile_pic: "images/user.png"
                },

                current_page: {
                    title: "Dashboard",
                },

                overall_stats: [{
                    id: 0,
                    name: "Traffic",
                    health: ~~(100*Math.random()),
                    issues: 0
                },
                    {
                        id: 1,
                        name: "Performance",
                        health: ~~(100*Math.random()),
                        issues: 0
                    },
                    {
                        id: 2,
                        name: "Security",
                        health: ~~(100*Math.random()),
                        issues: 0
                    },
                    {
                        id: 3,
                        name: "Site",
                        health: ~~(100*Math.random()),
                        issues: 0
                    },
                ],
                charts: {
                    overview: {
                        data: {
                            type: 'line',
                            data: {
                                labels: [
                                    "Jun 14",
                                    "Jun 15",
                                    "Jun 16",
                                    "Jun 17",
                                    "Jun 18",
                                    "Jun 19",
                                    "Jun 20"
                                ],
                            datasets: [
                                {
                                    label: 'This week',
                                    data: [24, 18, 16, 18, 24, 36, 28],
                                    backgroundColor: "#ff2900",
                                    borderColor: 'transparent',
                                    fill: true, pointBackgroundColor: '#FFFFFF',
                                    pointBorderColor: '#FFFFFF',
                                    lineTension: 0.40,
                                },
                                {label: 'Previous week',
                                data: [20, 22, 30, 22, 18, 22, 30],
                                backgroundColor: "#2d53e5",
                                borderColor: 'transparent',
                                pointBackgroundColor: '#FFFFFF',
                                fill: true,
                                pointBorderColor: '#FFFFFF',
                                lineTension: 0.40,
                                }
                            ]
                        },
                            options: {
    		                    elements: { point: {
          	                    radius: 0,
          	                    hitRadius: 5, 
                                hoverRadius: 5 
                                } 
                            },
    		                legend: {
        		                display: true,
                            },
                            scales: {
                            xAxes: [{
            		            display: true,}],
                            yAxes: [{
            		            display: true,
                                ticks: {
                	                beginAtZero: true
              	                },
                            }]
                        }
                    },
                            plugins: [],
                        }
                    }
                }
            };

            var app = null;
            
            /**
             * "PRE-INIT" components
             * These are the components which should be loaded first after the pre-initialization period
             */
            var pre_init_components = [
                Directives(Vue),
                Navbar(Vue),
                Sidebar(globaldata, Vue),
            ];

            var post_init_components = [
                Breadcrumbs(Vue),
                Alerts(Vue),
                Cards(Vue),
                FABs(Vue, globaldata, fs),
                TodaySiteHealth(Vue),
                Charts(Vue, Chart),
            ];
            
            // Our loading screen hides the cumulative layout shifts when loading these pre and post components
            var loadingScreen = document.querySelector(".loading-screen");
            
            // IMPORTANT: Pre-init components must be verified as "settled" otherwise errors may come up
            Promise.allSettled(pre_init_components).then(precomponents=> {
                
                // ##### DO WHAT YOU NEED HERE AFTER CALLING PRE-INIT COMPONENTS
                
                
                // IMPORTANT: Pre-init components must be settled
                Promise.allSettled(post_init_components).then(postcomponents=> {
                    
                    // Initialize Vue with our app container and data to be used
                    app = new Vue({
                        el: "#mythrilcms-app",
                        data: globaldata
                    });
                    
                    // We want seamless transition after all settled, 500ms should enough
                    setTimeout(function() {
                        // BUG: In Firefox, sometimes the loading screen element returns null, so we need to ensure it doesnt
                        if (loadingScreen) {
                            loadingScreen.classList.add("animate__fadeOutDown", "animate__faster");
                        }
                    },
                        500);
                    
                    // ### DEBUGGING PURPOSES ###
                    console.log(app, globaldata);
                })

            });
        });
    }));

})(this);