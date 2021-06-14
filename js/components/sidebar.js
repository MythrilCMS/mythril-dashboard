define(function(require, module, exports) {
    
    var loc = window.location.pathname;
    var cwd = loc.substring(0, loc.lastIndexOf('/'));
    
    console.log(loc, cwd)
    var Sidebar = function(parentData, Vue) {
        
        return new Promise((resolve, reject)=>{
            
            fetch(cwd+"/json/sidebar.json").then(response=>response.json().then(data=> {
            
                parentData.sidebar = data;
                resolve(data);
                
                
                Vue.component("sidebar-header", {
                    props: ["site"],
                    template: `
                    <div id="sidebar-title" class="logo col-sm-12">
                    
                        <h4> {{ site.name }} </h4>
                        
                    </div>
                    `
                });
                Vue.component("sidebar-user-overview", {
                    props: ["user"],
                    template: `
                        <div class="profile-overview row col-sm-12">

                            <div class="wrapper pic col-sm-3">
                                <img class="img" :src="user.profile_pic" />
                            </div>

                            <div class="wrapper details col-sm-offset-1 col-sm-7">
                                <span class="name">
                                {{ user.fullname }}
                                </span>
                                <span class="role">
                                    <small> {{ user.role }}</small>
                                </span>

                            </div>
                        </div>
                    `,
                });
                Vue.component("sidebar-category", {
                    props: ["self"],
                    template: `
                    <div class="category wrapper responsive-padding col-sm-12">
                        <div class='item col-sm-12'>
                            <small>{{ self.title }}</small>
                        </div>
                        <div
                           class='item col-sm-12'
                           v-for='item in self.items'
                           :key='item.id'
                        >

                            <span :class="item.icon + ' ' + 'inverse'"></span>
                            <span class="title">
                                {{ item.title }}
                            </span>
                            <div v-if="item.description" class="info col-sm-8 col-sm-offset-4 col-md-offset-2 shadowed">
                                <small>
                                    <span class="title">
                                        <span v-if="item.description.title" class="icon-info inverse"></span>
                                        {{ item.description.title }}
                                        
                                    </span>
                                    
                                    <span v-if="item.description.body" v-html="item.description.body"></span>
                                    
                                    <span v-if="item.description.status" class="status">
                                    {{ item.description.status }}
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>
                    `
                });
                Vue.component("sidebar", {
                    props: ["categories","site","user"],
                    template: `
                    
                    <div id="sidebar" class="sidebar responsive-padding row col-sm-5 col-md-2 hidden-sm">

                        <sidebar-header :site="site"></sidebar-header>
                        <sidebar-user-overview :user="user"></sidebar-user-overview>
                        <sidebar-category
                            v-for="category in categories"
                            :key="category.id"
                            :self="category"
                        ></sidebar-category>
                    </div>
                    
                    `
                });

            }));
            
        });
    };
    
    return Sidebar;

});