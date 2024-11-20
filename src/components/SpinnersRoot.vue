<script setup lang="ts">
import type { SpinData } from '@/models/SpinData';
import { ref,reactive, watch, type Reactive, type Ref, type PropType } from 'vue';
import SimpleSpinner from './Spinners/SimpleSpinner.vue';
import type { RoulettConfig } from '@/models/RouletteConfig';
import type { EffectType } from '@/models/EffectType';
import type { StopPattern } from '@/models/StopPattern';
import SlowSpinner from './Spinners/SlowSpinner.vue';
import ParisSpinner from './Spinners/ParisSpinner.vue';

const props = defineProps({
    roulettConfig:{
      required: true,
      type: Object as PropType<RoulettConfig>,
    }
})

const spinning: Ref<boolean> = ref(false);
const spindetalist: Ref<SpinData[]> = ref([]);


watch (
    () => props.roulettConfig,
    (newConf) => spindetalist.value = createSpinData(newConf),
    {immediate:true}
)

/**
 * ルーレットの設定に沿って回転盤用の設定データを生成します。
 * 実際にはこのタイミングで抽選結果は確定しています。文字の回転はあくまで演出です。
 * @param createConf 
 */
function createSpinData(createConf:RoulettConfig):SpinData[]{

    var selectItems = pickValue(createConf.sorceItems,createConf.pickCount);

    return selectItems.map<SpinData>((v,i) =>{
        return<SpinData> {
            spinNo: i+1,
            spinItems: createConf.sorceItems,
            selected:v,
            spinInterval: generateInterval(
                createConf.stopPattern,i,createConf.spinInterval
            ),
        }
    });
}



/**
 * sorceItemsに指定した配列から重複しないIndexの配列を作成し返します。
 * @param sorceItems 
 * @param pickCount 
 */
function pickValue(sorceItems:string[],pickCount:number) : number[]{
    return [...sorceItems.keys()].
                sort(_ => Math.random()-0.5).
                slice(0 , pickCount);
}

function generateInterval(stopPattern:StopPattern,index:number,baseInterval:number):number{
    switch (stopPattern) {
        case 'All':
            return baseInterval;
        case 'Wave':
            return baseInterval + index * 250;
        case 'Random':
            return baseInterval + Math.floor(Math.random() * 1000)
        default:
            return baseInterval;
    }
}

function spin() {
    spinning.value = true;
}

function updateSpindataToStop(no: number){

}
</script>

<template>
    <div class="spinners" >
        <div class="spinners_viewer">
            <SimpleSpinner v-if="props.roulettConfig.effectType ==='Simple'" v-for="item in spindetalist" 
                :spin-data="item"
                :key="item.spinNo"
                :spinning=spinning
                @stop="updateSpindataToStop"
                class="spinners_item"
            />

            <SlowSpinner Spinner v-if="props.roulettConfig.effectType ==='Slow'" v-for="item in spindetalist" 
                :spin-data="item"
                :key="item.spinNo"
                :spinning=spinning
                @stop="updateSpindataToStop"
                class="spinners_item"
            />

            <ParisSpinner Spinner v-if="props.roulettConfig.effectType === '2024Paris' " v-for="item in spindetalist" 
                :spin-data="item"
                :key="item.spinNo"
                :widthPercent=1
                :spinning=spinning
                @stop="updateSpindataToStop"
                class="spinners_item"
            />
        </div>
    </div>
    <div class="spinner-controlls">
        <p class="spin-start" @click="spin" v-if="!spinning">START</p>
    </div>
</template>


<style scoped>

    .spinner-controlls{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        margin: 0;
        padding: 0;

    }

    .spin-start{
        margin: 0 auto;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: black;
        text-align:center;
        line-height: 80px;
        color: azure;
    }
    .spinners{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .spinners_viewer{

        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns:repeat(auto-fit,minmax(200px,1fr) );

        grid-auto-flow: row;
        grid-gap: 2px;
        justify-items:stretch;
    }

    .spinners_item{

        width: auto;
        height: 100px;
        line-height: 100px;
        aspect-ratio: 16 / 9;
    }

    .spin-start:hover{
        background-color: rgb(91, 230, 230);
        color: azure;
    }

</style>