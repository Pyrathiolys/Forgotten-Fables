--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local ModPlayerTypes = ____constants.ModPlayerTypes
function ____exports.alabasterStats(self, player, flags)
    if player:GetPlayerType() == ModPlayerTypes.ALABASTER then
        if flags == CacheFlag.CACHE_SHOTSPEED then
            player.ShotSpeed = player.ShotSpeed - 0.15
        end
        if flags == CacheFlag.CACHE_FLYING then
            player.CanFly = true
        end
    end
end
return ____exports