define(function(require, module, exports){
    
    var TodaySiteHealth = function(Vue){
        return new Promise((resolve, reject)=>{
            
            Vue.component("today-site-health-card", {
                
                props: ["health", "title"],
                template: `
                    <div class="stats-card-1 rounded col-sm responsive-margin">
                        <div class="content-wrapper row col-sm-12">
                            <div class="icon-container row">
                                <div class="col-sm-12">
                                    <h1 class="no">{{ health }}%</h1>

                                </div>
                                <p class="type">
                                    {{ title }}
                                </p>
                            </div>
                        </div>
                    </div>
                `
            });
            Vue.component("today-site-health", {
                props: ["stats_data"],
                template: `
                <div class="todaysitehealth shadowed">
                    <div class="head row col-sm-12">
                        <div class="col-sm-5">
                            <h5>Today's Health Stats</h5>
                        </div>
                        <div class="more col-sm-offset-4 col-sm-3">
                            <small>
                                See More
                                <span class="icon-arrow-right-circle"></span>
                            </small>
                        </div>
                    </div>
                    <div class="row col-sm-12">
                    
                        <today-site-health-card
                            v-for="item in stats_data"
                            :key="item.id"
                            :health="item.health"
                            :title="item.name"
                        ></today-site-health-card>
                        
                    </div>
                </div>
                `
            });
            resolve();
        });
    };
    
    return TodaySiteHealth;
});