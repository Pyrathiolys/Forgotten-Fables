import { ModItemTypes, ModTearVariants } from "../constants";

export function ghostShot(tear: EntityTear): void {
  if (
    tear.SpawnerEntity !== null &&
    tear.SpawnerEntity.Type === EntityType.ENTITY_PLAYER
  ) {
    const player = tear.SpawnerEntity.ToPlayer();
    if (player !== null && player.HasCollectible(ModItemTypes.BBGHOST_SHOT)) {
      bbghostReplace(tear, player);
    } else if (
      player !== null &&
      player.HasCollectible(ModItemTypes.GHOST_SHOT)
    ) {
      ghostReplace(tear, player);
    }
  }
}
function bbghostReplace(tear: EntityTear, player: EntityPlayer): Entity {
  tear.Visible = false;
  const ghost = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.PURGATORY,
    1,
    tear.Position,
    tear.Velocity.div(0 - player.TearHeight)
      .mul(23.75)
      .div(1.5),
    player,
  );
  ghost.GetSprite().PlaybackSpeed *= 2;
  ghost.CollisionDamage = player.Damage;
  tear.Remove();
  return ghost;
}
function ghostReplace(tear: EntityTear, player: EntityPlayer): EntityTear {
  const newtear = Isaac.Spawn(
    EntityType.ENTITY_TEAR,
    ModTearVariants.GHOST,
    0,
    tear.Position,
    tear.Velocity,
    player,
  ).ToTear();
  if (newtear !== null) {
    newtear.TearFlags = tear.TearFlags;
    newtear.AddTearFlags(TearFlags.TEAR_HOMING);
  }
  tear.AddTearFlags(TearFlags.TEAR_HOMING);
  tear.GetData().ghost = true;
  tear.GetData().player = player;
  return tear;
}
export function ghostUpdate(tear: EntityTear, _collider: Entity): EntityTear {
  if (tear.GetData().ghost === true) {
    if (tear.GetData().player !== null) {
      const player: EntityPlayer = tear.GetData().player as EntityPlayer;
      const explosionEffect = Isaac.Spawn(
        EntityType.ENTITY_EFFECT,
        EffectVariant.BLOOD_EXPLOSION,
        0,
        tear.Position,
        Vector(0, 0),
        player,
      ).ToEffect();
      if (explosionEffect !== null) {
        explosionEffect.SetDamageSource(EntityType.ENTITY_PLAYER);
        explosionEffect.CollisionDamage = player.Damage * 0.8;
        const playeradjrange = (player.TearHeight * -1) / 24;
        explosionEffect.Scale *= playeradjrange;
      }
    } else {
      print("no player associated with tear");
    }
  }
  return tear;
}
