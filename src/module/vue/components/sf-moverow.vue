<template>
  <div class="item-row">
    <h4 style="margin: 0" class="flexrow" :title="tooltip">
      <i class="fa fa-dice-d6 clickable text nogrow" @click="rollMove" />
      <span @click="expanded = !expanded">{{ move.Name }}</span>
    </h4>
    <transition name="slide">
      <with-rolllisteners
        element="div"
        class="move-summary"
        :actor="actor"
        v-if="expanded"
      >
        <div v-html="$enrichHtml(description)" />
        <p v-if="strong">
          <strong>{{ $t('IRONSWORN.OnAStrongHit') }}:</strong>
          <span v-html="$enrichHtml(strong)"></span>
        </p>
        <p v-if="weak">
          <strong>{{ $t('IRONSWORN.OnAWeakHit') }}:</strong>
          <span v-html="$enrichHtml(weak)"></span>
        </p>
        <p v-if="miss">
          <strong>{{ $t('IRONSWORN.OnAMiss') }}:</strong>
          <span v-html="$enrichHtml(miss)"></span>
        </p>
      </with-rolllisteners>
    </transition>
  </div>
</template>

<style lang="less" scoped>
h4 {
  margin: 0;
}
i.fa-dice-d6 {
  padding-right: 0.5rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
  max-height: 1000px;
  opacity: 1;
}
.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>

<script>
export default {
  props: {
    actor: Object,
    move: Object,
  },

  data() {
    return {
      expanded: false,
    }
  },

  computed: {
    tooltip() {
      // TODO: page number, when it shows up
      return this.move.Source?.Title
    },

    description() {
      return this.move.foundryItem?.data?.data?.description
    },
    strong() {
      return this.move.foundryItem?.data?.data?.strong
    },
    weak() {
      return this.move.foundryItem?.data?.data?.weak
    },
    miss() {
      return this.move.foundryItem?.data?.data?.miss
    },
  },

  methods: {
    async rollMove() {
      CONFIG.IRONSWORN.RollDialog.show({
        actor: this.$actor,
        move: this.move.foundryItem.getMoveData(),
      })
    },
  },
}
</script>
