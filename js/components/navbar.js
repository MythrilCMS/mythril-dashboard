define(function(require, module, exports){
    
    var Navbar = function(Vue){
        
        return new Promise((resolve, reject)=>{
            
            Vue.component("navbar", {
                props: ["page"],
                template: `
                
                 <div class="navbar container col-sm-12 col-md-12 shadowed">
                    <div class="row">

                        <div class="menu-btn col-sm-1 hidden-md">
                            <span class="icon-menu inverse"></span>
                        </div>
                        <div class="title col-sm-2 col-sm-offset-1 col-md-offset-0">
                            {{ page.title }}
                        </div>
                        <div class="menu-shortcuts col-sm-4 col-md-6 row col-sm-offset-3 col-md-offset-3">

                            <div class="icon col-sm-4">
                                <span class="icon-search inverse"></span>
                                <span class="hidden-sm">Search</span>
                            </div>
                            <div class="icon col-sm-4">
                                <span class="icon-message base-icon inverse"></span>
                                <span class="count circular"><small>1</small></span>
                                <span class="hidden-sm">Messages</span>
                            </div>
                            <div class="icon col-sm-4">
                                <span class="icon-notification-bell inverse"></span>
                                <span class="hidden-sm">Notifications</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                `
            });
            resolve();
            
        });
    };
    
    return Navbar;
    
});