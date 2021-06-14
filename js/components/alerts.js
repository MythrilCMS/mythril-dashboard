define(function(require, module, exports){
    
    "use strict";
    
    var Alerts = function(Vue){
        return new Promise((resolve, reject)=>{
            
            var baseData = function(){
                return { display: true };
            };
            
            var hide = function(){
                var el = this.$el;
                el.classList.add("animate__fadeOutUp");
                
                el.addEventListener("animationend", ()=>this.display = false);
                
            };
            
            Vue.component("danger-alert-box", {
                props: ["title", "msg"],
                data: baseData,
                methods: {
                    hide: hide,
                },
                template: `
                    <div v-if="display" class="animate__animated alert-message danger row">
                        <div class="shadowed content col-sm-12">
                            <div class="icon col-sm-1">
                                <span class="icon-alert-octagon inverse"></span>

                            </div>
                            <div class="icon col-sm-10">
                                <small>
                                    <span class="title">{{ title }}</span>: {{ msg }}

                                </small>
                            </div>
                            <div class="close-btn col-sm-1">
                                <span @click="hide" class="icon-x inverse"></span>
                            </div>

                        </div>

                    </div>
                `,
            });
            Vue.component("info-alert-box", {
                props: ["title", "msg"],
                data: baseData,
                methods: {
                    hide: hide,
                },
                template: `
                    <div v-if="display" class="animate__animated alert-message info row">
                        <div class="shadowed content col-sm-12">
                            <div class="icon col-sm-1">
                                <span class="icon-info inverse"></span>

                            </div>
                            <div class="icon col-sm-10">
                                <small>
                                    <span class="title">{{ title }}</span>: {{ msg }}

                                </small>
                            </div>
                            <div class="close-btn col-sm-1">
                               <span @click="hide" class="icon-x inverse"></span>
                            </div>

                        </div>

                    </div>
                `,
            });
            
            Vue.component("success-alert-box", {
                props: ["title", "msg"],
                data: baseData,
                methods: {
                    hide: hide,
                },
                template: `
                    <div v-if="display" class="animate__animated alert-message success row">
                        <div class="shadowed content col-sm-12">
                            <div class="icon col-sm-1">
                                <span class="icon-check-circle inverse"></span>

                            </div>
                            <div class="icon col-sm-10">
                                <small>
                                    <span class="title">{{ title }}</span>: {{ msg }}

                                </small>
                            </div>
                            <div class="close-btn col-sm-1">
                               <span @click="hide" class="icon-x inverse"></span>
                            </div>

                        </div>

                    </div>
                `,
            });
            
            Vue.component("warning-alert-box", {
                props: ["title", "msg"],
                data: baseData,
                methods: {
                    hide: hide,
                },
                template: `
                    <div v-if="display" class="animate__animated alert-message warning row">
                        <div class="shadowed content col-sm-12">
                            <div class="icon col-sm-1">
                                <span class="icon-alert-triangle inverse"></span>

                            </div>
                            <div class="icon col-sm-10">
                                <small>
                                    <span class="title">{{ title }}</span>: {{ msg }}

                                </small>
                            </div>
                            <div class="close-btn col-sm-1">
                               <span @click="hide" class="icon-x inverse"></span>
                            </div>

                        </div>

                    </div>
                `,
            });
            resolve();
            
        });
    };
    
    return Alerts;
});