define(function(require, module, exports){
    
    var FABs = function(Vue, appData, fs){
        
        var cwd = fs.cwd();
        
        return new Promise((resolve, reject)=>{
            fetch(cwd+"/json/fab-screen-toolbar.json").then(raw=>raw.json().then(data=>{
                
                appData.fabToolbar = data;
                console.log("Fab loaded", data)
                resolve();
                
                Vue.component("fab-modals-area", {
                    props: ["data"],
                    template: `
                    <div>
                    <fab-modal
                        v-for="i in data.options"
                        :key="i.id"
                        :modal="i.modal"
                        :open="i.state"
                    ></fab-modal>
                    </div>
                    `
                });
                
                Vue.component("fab-modal", {
                    props: ["modal","open"],
                    template: `
                    <div v-if="open === 'open' ? true: false">
                        <div class="card">
                            <label :for="modal.id" class="modal-close" ></label>
                            <h3 class="section">{{ modal.label }}</h3>
                            <div class="section" v-html="modal.description">
                            </div>
                        </div>
                    </div>
                    `
                });
                
                Vue.component("fab-sp-screen-toolbar-option", {
                    props: ["title","modal"],
                    data: function(){
                        return {
                            open: false,
                        };
                    },
                    methods: {
                        toggle: ()=>{
                            if(modal.state === "close"){
                                modal.state = "open";
                            } else {
                                modal.state = "close"
                            }
                        }
                    },
                    template: `
                    <div>
                    <div class="option-wrapper row col-sm-12">
                        <input v-model="open" type="checkbox" :id="modal.id" class="modal">
                    
                        <label :for="modal.id"> {{ title }} </label>
                    </div>
                    </div>
                    `
                });
                Vue.component("fab-sp-screen-toolbar", {
                    props: ["options"],
                    data: function(){
                        return {
                            display_options: false
                        };
                    },
                    methods: {
                        show: function(){
                            this.display_options=true;
                        },
                        hide: function(){
                            this.display_options=false;
                        },
                        toggle: function(){
                            this.display_options=!this.display_options;
                        }
                    },
                    template: `
                    <div>
                        <div class="float-act-btn-wrapper col-sm-12">
                            <div v-if="display_options" class="rounded options container col-sm-12">
                    
                                <fab-sp-screen-toolbar-option
                        
                                    v-for="option in options"
                                    :key="option.id"
                                    :title="option.title"
                                    :modal="option.modal"
                            
                                ></fab-sp-screen-toolbar-option>
                            
                            </div>
                            <div @click="toggle" class="row">
                                <div class="animate__animated shadowed circular icon">
                                    <span class="icon-settings inverse"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            
                Vue.component("fab", {
                props: ["type"],
                data: function(){
                    
                    return {
                        clicked: false,
                        checked: false,
                        current_modal: {
                            
                        },
                        modals: [
                            
                        ]
                    };
                    
                },
                methods: {
                    show(){
                        this.clicked = true;
                    },
                    hide(){
                        this.clicked = false;
                    },
                    
                    
                },
                template: `
                
                <div v-if="type === 'bar' ? true: false" class="float-act-bar-wrapper row">
                    <div class="content col-sm-12">
                        <small>AI Assistant</small>
                    </div>
                </div>
                </div>
                `
            });
            }));
            
        });
    };
    
    return FABs;
    
});