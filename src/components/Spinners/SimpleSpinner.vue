<script setup lang="ts">
import type { SpinData } from '@/models/SpinData';
import { ref, watch, type PropType, type Ref } from 'vue';


var isSpinning: boolean = false;

let spinIntervalNum: number;
const currentItem = ref("");

const wheelItem:Ref<string[]> =ref([''])



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
        currentItem.value = wheelItem.value[currentIndex];
        currentIndex = (currentIndex + 1) % wheelItem.value.length;
    },50);
}



function stop() {
    clearInterval(spinIntervalNum);
    currentItem.value = prpops.spinData.spinItems[prpops.spinData.selected];

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

function createWheelItem(){

var sel = prpops.spinData.spinItems[prpops.spinData.selected];

// ソース配列のコピーから選ばれる要素を削除してシャッフル
var w = [...prpops.spinData.spinItems];
w.splice (prpops.spinData.selected ,1);
for (let i = w.length - 1; i >= 0; i--) {
  let rand = Math.floor(Math.random() * (i + 1))
  // 配列の要素の順番を入れ替える
  let tmpStorage = w[i];
  w[i] = w[rand];
  w[rand] = tmpStorage;
}

// 配列の先頭から２番目に選ばれる要素を追加する
w.splice(2,0,sel);
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

        createWheelItem();
        currentItem.value = wheelItem.value[0];
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
    </div>
</template>

<style scoped>

    .spin_wrapper {
        width: 100%;
        height: 100%;
    }

    .spin_body {
        width: 100%;
        height: 100%;
        border-radius:10px;
        color: rgb(235, 222, 153);
        background:linear-gradient(#31a378,#2a8a12,#31a378) ;
        display: block;
        text-align: center;
    }

    .spin_np{
        left: 1px;
        top: 1px;
        text-align: left;
    }

    .select_item{
        text-align: center;
        left:50%;
        padding: auto;
        
    }



</style>