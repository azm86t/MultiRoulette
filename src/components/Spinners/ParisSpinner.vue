<script setup lang="ts">
import type { SpinData } from '@/models/SpinData';
import { ref, watch, type PropType } from 'vue';


let isSpinning: boolean = false;

let spinIntervalNum: number;
const currentItem = ref("");
const testIndex = ref(0);
const wheelItem = ref(['']);
const rollSpeed = ref(0);

const prpops = defineProps({
    spinData:{
      required: true,
      type: Object as PropType<SpinData>,
    },
    spinning:{
      required: true,
      type: Boolean,
    },
    widthPercent:{
        required: true,
        type: Number,
    }
})

const emit = defineEmits<{
    (e: 'start', thisNo: number): void
    (e: 'stop', thisNo: number): void
}>();



function spinSimple() {
    if(!isSpinning) return;
    isSpinning = true;
    let currentIndex:number = 1;

    spinIntervalNum = window.setInterval(( ) => {
        currentItem.value = prpops.spinData.spinItems[currentIndex];
        currentIndex = (currentIndex + 1) % prpops.spinData.spinItems.length;
        testIndex.value = (currentIndex + 1) % prpops.spinData.spinItems.length;
    },50);
}



function stop() {
    clearInterval(spinIntervalNum);
    currentItem.value = prpops.spinData.spinItems[prpops.spinData.selected];
    testIndex.value = prpops.spinData.selected;
    isSpinning = false;
    emit('stop',prpops.spinData.spinNo)
}



function start(interval: number){
    emit('start',prpops.spinData.spinNo);
    spinSimple();
    setTimeout(() => {
        stop();
    },  interval);

}

/**
 * 回転データをもとに演出用の回転
 */
function createWheelItem(){

    const sel = prpops.spinData.spinItems[prpops.spinData.selected];

    // ソース配列のコピーから選ばれる要素を削除してシャッフル
    const w = [...prpops.spinData.spinItems];
    w.splice (prpops.spinData.selected ,1);
    for (let i = w.length - 1; i >= 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1))
      // 配列の要素の順番を入れ替える
      const tmpStorage = w[i];
      w[i] = w[rand];
      w[rand] = tmpStorage;
    }

    // 配列の先頭から２番目に選ばれる要素を追加する
    w.splice(2,0,sel);
    // 配列の長さがアニメーションの長さ回転するように調整
    // 調整するコード

    wheelItem.value = w;
}



watch (
    () => prpops.spinning,
    (x) =>  {
            isSpinning = x;
            if( ! isSpinning){return}
            start(prpops.spinData.spinInterval);
        },
    {immediate:true}
)

watch (
    () => prpops.spinData,
    (x) => {
        currentItem.value = prpops.spinData.spinItems[0];

    },
    {immediate:true}
)

</script>


<template>
    <div class="spin_wrapper">
        <div class="spin_body">
            <span class="spin_np">{{ prpops.spinData.spinNo }}</span> :
            <span class="select_item">{{ currentItem }}</span>
        </div>

        <div class="spin_wheel">
            <div class="wheel_item" v-for="item in wheelItem" >
                <span>{{ item }}</span>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .spin_wrapper {
        padding: auto;
        width: v-bind('prpops.widthPercent');
        height: 250px;
    }

    .spin_body {
        border-radius:10px;
        color: rgb(235, 222, 153);
        background-color: rgb(42, 138, 18);
        padding: auto;
        margin: auto;
    }

    .spin_wheel {
        background-color: azure;

    }

</style>