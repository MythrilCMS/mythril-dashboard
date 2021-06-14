define(function(require, module, exports){
    
    var Charts = function(Vue, Chart){
        return new Promise((resolve, reject)=>{
            
            Vue.component("chart", {
                props: ["config"],
                data: function(){
                    return {
                        chart: null
                    };
                },
                template: `<canvas class="chart"></canvas>`,
                methods: {
                    draw(ctx){
                        this.chart = new Chart(ctx, this.config);
                    },
                },
                mounted: function() {
                    var c = this.$el;
                    var ctx = c.getContext("2d");
                       
                    this.draw(ctx);
                    console.log("Chart component has mounted");
                }
            });
            
            resolve();
        });
    };
    return Charts;
});