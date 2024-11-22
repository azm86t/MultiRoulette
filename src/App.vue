<script setup lang="ts">
import { reactive, ref, watch, type Ref } from 'vue';
import SpinnersRoot from './components/SpinnersRoot.vue';
import RoulettConfigurator from './components/RoulettConfigurator.vue';
import type { RoulettConfig } from './models/RouletteConfig';
import type { SpinData } from '@/models/SpinData';
import type { StopPattern } from '@/models/StopPattern';

const showConfig: Ref<boolean> = ref(false)

/**
 * アプリ全体の設定項目を保持します。
 */
const roulettConfig: Ref<RoulettConfig> = ref(
  {
    roulettTitle: 'Multi Roulett',
    sorceItems:['項目１','項目２','項目３','項目４','項目５','項目６'],
    pickCount:3,
    colmun:1,
    stopPattern:"All",
    effectType:'Simple',
    spinInterval:5000,
  }
);

/**
 * 指定されコンフィグの内容でアプリの設定を更新します。
 * 設定変更コンポーネントの変更通知から起動されることを想定したメソッドです。
 * @param newConfig 新しい設定値
 */
 function updateConfig(newConfig: RoulettConfig){
  roulettConfig.value = newConfig;
}

</script>

<template>
  <div class="wrapper">
      <header>
          <p @click="showConfig = !showConfig"> {{ roulettConfig.roulettTitle }}</p>
      </header>
      <main>
        <SpinnersRoot :roulett-config="roulettConfig"  v-if="!showConfig"/>
        <div v-if="showConfig">
          <RoulettConfigurator  :roulett-config="roulettConfig" @submit="updateConfig"/>
        </div>
      </main>
  </div>
</template>

<style scoped>
.wrapper{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 1;
}
header {
  line-height: 10vh;
  height: 10vh;
  width: 100%;
  position: sticky;
  top: 0;
  background: linear-gradient(#caedee,#7fcc7c,#caedee);
  padding-left: 10vh;
  font-size: 250%;
  color: rgb(102, 93, 50);;
}

main {
  top: 10vh;
  left: 0;
  height: auto;
  min-height: 90vh;
  width: 100%;
  padding: 2vh;
  background: radial-gradient(#7fcc7c,transparent);
  }

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.spinner-controlls{
    position:sticky;
    top: 95vh;
        width: 100%;
    }

/*
 @media (min-width: 1024px) {
   header {
     display: flex;
     place-items: center;
     padding-right: calc(var(--section-gap) / 2);
   }
 
   .logo {
     margin: 0 2rem 0 0;
   }
 
   header .wrapper {
     display: flex;
     place-items: flex-start;
     flex-wrap: wrap;
   }
 }

 */
</style>
