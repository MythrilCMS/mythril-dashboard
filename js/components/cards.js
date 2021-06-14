define(function(require, module, exports){
    
    var Cards = function(Vue){
        
        return new Promise((resolve, reject)=>{
            
            Vue.component("welcome-card", {
                props: ["user"],
                template: `
                <div class="welcome-card row col-sm-12">
                    <div class="content shadowed rounded col-sm-12">
                        <div class="col-sm-12">
                            <h3 class="head">Welcome {{ user.fullname }}!</h3>
                        </div>
                        <div class="col-sm-12">
                            <p>
                              Howdy! Welcome to your dashboard.
                            </p>
                            <p>
                               Make sure that you check your messages and notifications.
                            </p>
                        </div>
                    </div>
                </div>
                `
            });
            
            resolve();
            
        });
        
    };
    
    return Cards;
    
});