define(function(require, module, exports){
    
    /**
     * Under Construction !!!
     * Until I figure out how to properly use Vue Router
     */
     
    var Breadcrumbs = function(Vue){
        return new Promise((resolve, reject)=>{
            
            Vue.component("page-breadcrumb", {
                props: ["site"],
                template: `
                <div class="breadcrumb-wrapper row">
                    <div class="content col-sm-12">
                        <ul>
                            <li>
                                <span class="link current">Home</span> >
                            </li>

                        </ul>
                    </div>
                </div>
                `
            });
            
            resolve();
            
        });
    };
    
    return Breadcrumbs;
    
});