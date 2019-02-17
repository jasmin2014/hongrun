<template>
<el-cascader :options="dataList" @active-item-change="handleItemChange" v-model="option"
             :props="props" style="width: 100%;" @change="setCityId" ref="cascader"></el-cascader>
</template>

<script type="text/ecmascript-6">
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                dataList: [],
                props: {
                    value: 'id',
                    label:'title',
                    children: 'children'
                },
                option:[]
            };
        },
        props: {
            liveId: [String, Number],
            is_init: {
                type: Boolean,
                default: true
            }
        },
        mounted () {
            if(this.is_init) this.initList();
        },
        watch: {
            'liveId': function (newVal,oldVal) {
                if(oldVal == undefined || oldVal == ''){
                    this.initList();
                }
            }
        },
        methods: {
            ...mapActions([
                'getCityList','initCityList'
            ]),
            initList(){
                const _this = this;
                this.initCityList(this.liveId).then(function(resp){
                    _this.dataList = resp.data;
                    _this.option = resp.option;
                    _this.$nextTick(() => {
                        _this.$emit('setLiveName');
                    })
                });
            },
            handleItemChange(val) {
                let grade = val.length;
                const _this = this;
                this.getCityList(val[grade-1]).then(function(resp){
                    switch(grade){
                        case 1:
                            _this.dataList.forEach(function(e){
                                if(e.id == val[0]) {
                                    e['children'] = resp;
                                }
                            });
                            break;
                        case 2:
                            _this.dataList.forEach(function(e){
                                if(e.id == val[0]) {
                                    e['children'].forEach(function(ee){
                                        if(ee.id == val[1]) {
                                            ee['children'] = resp;
                                        }
                                    });
                                }
                            });
                            break;
                    }
                });
            },
            getCurrentLabels(){
                return this.$refs.cascader.currentLabels;
            },
            setCityId(val) {
                this.$emit('setLiveId',val[1]);
            }
        }
    };
</script>