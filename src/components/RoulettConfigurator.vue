<script setup lang="ts">
import { ref,watch, type PropType } from 'vue';
import type { RoulettConfig } from '@/models/RouletteConfig';
import type { EffectType } from '@/models/EffectType';
import type { StopPattern } from '@/models/StopPattern';

const roulettTitle = ref<string>('Multi Roulett')
const sorceItems = ref<string>('');
const pickCount = ref<number>(0);
const stopPattern = ref<StopPattern>('All');
const effectType = ref<EffectType>('Simple');
const spinInterval = ref<number>(0);
const colmun = ref<number>(1);



const errrors = ref<string[]>(['']);

const fileImportRef = ref<HTMLInputElement>();

const props = defineProps({
    roulettConfig:{
      required: true,
      type: Object as PropType<RoulettConfig>,
    }
})

const emit = defineEmits<{
    (e: 'submit', value: RoulettConfig): void
}>();


watch(
    () => props.roulettConfig,
    () => {
        sorceItems.value = props.roulettConfig.sorceItems.join("\n");
        pickCount.value = props.roulettConfig.pickCount;
        stopPattern.value = props.roulettConfig.stopPattern;
        effectType.value = props.roulettConfig.effectType;
        spinInterval.value = props.roulettConfig.spinInterval;
        colmun.value = props.roulettConfig.colmun;
    },
    { immediate:true }

)

function importConfig(){
    const file = fileImportRef.value?.files?.[0];
    if (file == undefined){
        return;
    }
    let reader = new FileReader();
    reader.onload = e =>{
        let r = e.target?.result
        if (typeof r == 'string'){
            var data = JSON.parse(r);
            

        }
    }
    reader.readAsText(file);

}

function exportConfig(){
    var json = JSON.stringify(props.roulettConfig, null,' ');
    var blob = new Blob([json],{type: 'application/json'})   
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = roulettTitle.value + '.json';
    link.click();
    link.remove(); 

}

function submitConfig(){
    var conf:RoulettConfig = {
        roulettTitle: roulettTitle.value,
        pickCount: pickCount.value,
        sorceItems: sorceItems.value.split("\n"),
        spinInterval: spinInterval.value,
        stopPattern: stopPattern.value,
        effectType: effectType.value,
        colmun: colmun.value
    }

    if(!Valdation(conf)){
        return;
    }

    emit('submit',conf);
}


function Valdation(conf:RoulettConfig): boolean{
    errrors.value.splice(0);

    if(conf.sorceItems.length < 2){
        errrors.value.push('抽選対象は２つ以上必要です。');
    }
    if(conf.pickCount < 1){
        errrors.value.push('抽選数に１より小さい数字は指定できません。');
    }
    if(conf.pickCount > conf.sorceItems.length){
        errrors.value.push('抽選対象よりも多い抽選数は指定できません。');
    }
    if(conf.colmun < 1){
        errrors.value.push('列数は１以上を指定してください。');
    }
    return errrors.value.length == 0  

}


</script>


<template>
    <div class="wrapper">
        <form action="" method="dialog" class="option_area" >
            <div class="roulett-title config-item ">
                <label for="roulett-title">表題</label>
                <input id="roulett-title" type="text" v-model="roulettTitle" ></input>
            </div>
            <div class="sorce-input config-item ">
                <label for="sorce_items">抽選対象</label>
                <textarea id="sorce_items" v-model="sorceItems" ></textarea>
            </div>
            <div class="pick-count config-item ">
                <label for="pick-count">抽選数</label>
                <input id="pick-count" type="number" v-model="pickCount">
            </div>
            <div class="colmun-count config-item ">
                <label for="colmun-count"> 表示列数</label>
                <input id="colmun-count" type="number" v-model="colmun">
            </div>
            <div class="spin-interval config-item ">
                <label for="spin-interval">抽選演出時間</label>
                <input id="spin-interval" type="number" v-model="spinInterval">
            </div>


            <fieldset>
                <legend>抽選時停止演出</legend>
                
                <input type="radio" id="random" value="Random" name="stop-pattern" v-model="stopPattern" />
                <label for="random">Random</label>
    
                <input type="radio" id="all" value="All" name="stop-pattern" v-model="stopPattern" />
                <label for="all">All</label>
    
                <input type="radio" id="wave" value="Wave" name="stop-pattern" v-model="stopPattern" />
                <label for="wave">Wave</label>
            </fieldset>

            <fieldset class="spin-effect">
                <legend>抽選時回転演出</legend>

                <input type="radio" id="simple" value="Simple" name="spin-effect" v-model="effectType" />
                <label for="simple">Simple</label>

                <input type="radio" id="slow" value="Slow" name="spin-effect" v-model="effectType" />
                <label for="slow">Slow</label>

                <input type="radio" id="pari" value="2024Paris" name="spin-effect" v-model="effectType" />
                <label for="pari">Slot</label>
            </fieldset>
            <div class="option-submit">
                <button @click="submitConfig">設定更新</button>
            </div>
        </form>
        <div class="configfile-io">
                
            <button @click="exportConfig">設定ファイル出力</button>

            <button @click="importConfig">設定ファイル読み込み</button>
            <input type="file" accept="application/json"  ref="fileImportRef"/>
        </div>

        <div class="errers">
            {{ errrors }}
        </div>
        <div class="state">
            <div class="current-config">抽選対象設定数：{{ props.roulettConfig.sorceItems.length }}</div>
            <div class="current-config">抽選数設定値: {{ props.roulettConfig.pickCount }}</div>
            <div class="current-config">回転盤列数: {{ props.roulettConfig.colmun }}</div>
            <div class="current-config">回転時間: {{ props.roulettConfig.spinInterval }}</div>
            <div class="current-config">回転停止タイミング: {{ props.roulettConfig.stopPattern }}</div>
            <div class="current-config">回転演出: {{ props.roulettConfig.effectType }}</div>
        </div>
    </div>
</template>


<style scoped>

    .wrapper{
      display: inline-block;
      width: 100%;
      height: 100vh;
    }
    .option_area {
        display: flex;
        background: linear-gradient(#7fcc7c,#caedee);

        flex-wrap: wrap;
    }

    .config-item {
        display: block;
        display: flex;
        justify-content: center;
        text-align:left;
        align-items: center;
        border-radius:10px;
        border: 1px solid;
        padding: 4px;
    }

    .sorce-input{
        width: 100%;
    }
    .sorce-input > textarea{
        height: 50vh;
        width: 70vh;
    }


    .config-item > label {
        display: inline-block;
        height: 100%;
        vertical-align: top;
        font-size: larger;
    }
    .roulett-title{
        width: 100%;
    }

    .option-submit{
        width: 100%;
    }


    .spin-effect{
        display: none;
    }

    .colmun-count{
        display: none;
    }
    .configfile-io{
        display: none;
    }


</style>