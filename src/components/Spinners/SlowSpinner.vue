<script setup lang="ts">
import type { SpinData } from '@/models/SpinData';
import { ref, watch, type PropType } from 'vue';


let isSpinning: boolean = false;

let spinIntervalNum: number;
const currentItem = ref("");
const testIndex = ref(0);
const WheelItem = ref(['']);

const prpops = defineProps({
    spinData:{
      required: true,
      type: Object as PropType<SpinData>,
    },
    spinning:{
      required: true,
      type: Boolean,
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
            <div class="wheel-item" v-for="item in WheelItem" >
                {{ item }}
            </div>
        </div>

    </div>
</template>

<style scoped>
    .spin_wrapper {
        padding: auto;
        width: 50%;
        height: 20%;
    }

    .spin_body {
        border-radius:10px;
        color: rgb(235, 222, 153);
        background-color: rgb(42, 138, 18);
        padding: auto;
        margin: auto;
    }

</style>