--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local constants = require("constants")
local ____playerdata = require("playerdata")
local modPlayerData = ____playerdata.modPlayerData
local PlayerSeed = ____playerdata.PlayerSeed
function ____exports.razor(self, pickup)
    if pickup.SubType == 13 then
        do
            local i = 0
            while i < constants.game:GetNumPlayers() do
                local player = constants.game:GetPlayer(i)
                if (player ~= nil) and (player:GetPlayerType() == constants.ModPlayerTypes.TAINTED_SARAH) then
                    if (player.Position:Distance(pickup.Position) < 15) and (modPlayerData[PlayerSeed(nil, player)].razors < 5) then
                        player:TakeDamage(
                            1,
                            DamageFlag.DAMAGE_RED_HEARTS,
                            EntityRef(pickup),
                            0
                        )
                        pickup:Remove()
                        local ____obj, ____index = modPlayerData[PlayerSeed(nil, player)], "razors"
                        ____obj[____index] = ____obj[____index] + 1
                        player:AddCacheFlags(CacheFlag.CACHE_DAMAGE)
                        player:EvaluateItems()
                    end
                end
                i = i + 1
            end
        end
    else
        do
            local i = 0
            while i < constants.game:GetNumPlayers() do
                local player = constants.game:GetPlayer(i)
                if (player ~= nil) and (player:GetPlayerType() == constants.ModPlayerTypes.TAINTED_SARAH) then
                    if player.Position:Distance(pickup.Position) < 100 then
                        pickup:Morph(5, 10, 13)
                    end
                end
                i = i + 1
            end
        end
    end
end
return ____exports