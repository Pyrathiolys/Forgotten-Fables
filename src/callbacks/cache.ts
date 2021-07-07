import { ModItemTypes, ModPlayerTypes} from "../constants";
import { modPlayerData, PlayerSeed } from "../playerdata";
export function evalCache(player:EntityPlayer, flags:CacheFlag) : void{
  if(flags == CacheFlag.CACHE_FIREDELAY){
if(player.HasCollectible(ModItemTypes.FAT_FETUS)){
      if(player.HasCollectible(CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE)==false && player.HasCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE)==false){
        player.MaxFireDelay *= 15;
      }
    }
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH){
      if(modPlayerData[PlayerSeed(player)].lost){
        player.MaxFireDelay-= 3; //tears are complicated...
      } else {
        player.MaxFireDelay-=1; //...sometimes
      }
    }
  }
  if(flags == CacheFlag.CACHE_DAMAGE){
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH){
      player.Damage+=0.5*modPlayerData[PlayerSeed(player)].razors;
    }
    if(player.HasCollectible(ModItemTypes.FAT_FETUS) && player.HasCollectible(CollectibleType.COLLECTIBLE_MR_MEGA)){
      player.Damage*=2;
    }
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH){
     player.Damage-=1.5; //Tainted Sarah and her lost form have the same damage stat (basically none)
    }
  }
  if(flags==CacheFlag.CACHE_LUCK){
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH && (modPlayerData[PlayerSeed(player)].lost)){
      player.Luck-=2;
    }
  }
  if(flags==CacheFlag.CACHE_SPEED){
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH){
      if(modPlayerData[PlayerSeed(player)].lost){
        player.MoveSpeed-=0.1;
      } else {
        player.MoveSpeed+=0.2;
      }
    }
  }
  if(flags==CacheFlag.CACHE_FLYING){
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH && modPlayerData[PlayerSeed(player)].lost){
      player.CanFly=true;
    }
  }
  if(flags==CacheFlag.CACHE_RANGE){
    if(player.GetPlayerType()==ModPlayerTypes.TAINTED_SARAH){
      player.TearHeight-=1.5; //this should equal 8 base range once tearheight gets fixed
    }
  }
}