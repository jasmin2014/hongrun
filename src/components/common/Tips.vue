<template>
    <el-alert v-if="tip.mode === 'alert'" :title="tip.msg" :type="tip.type" :change="tip.change" show-icon v-show="tip.show" @close="handleClose"></el-alert>
    <span v-else-if="tip.mode === 'text'" class="tips-text" v-show="tip.show"><i class="el-icon-warning"></i>{{tip.msg}}</span>
</template>

<style scoped>
   .tips-text{
       font-size: 14px;
       color: red;
   }
   .tips-text i{
       margin-right: 2px;
   }
</style>
<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';

    export default {
        computed: mapGetters([
            'tip'
        ]),
        created () {
            this.handleClose()
        },
        methods: {
            ...mapActions([
                'hideTip'
            ]),
            handleClose() {
                this.hideTip();
            }
        },
        watch: {
            'tip.change': function (val) {
                if(val){
                    this.$message({
                        message: this.tip.msg,
                        type: this.tip.type,
                        onClose:() => this.handleClose()
                    });
                }
            }
        }
    }
</script>
