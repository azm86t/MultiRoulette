import type { EffectType } from "./EffectType";
import type { StopPattern } from "./StopPattern";

export interface RoulettConfig {
    roulettTitle:string;
    sorceItems: string[];
    pickCount: number;  
    spinInterval: number;
    stopPattern: StopPattern;
    effectType: EffectType;
    colmun: number;
  }