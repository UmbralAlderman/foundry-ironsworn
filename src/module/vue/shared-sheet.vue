<template>
  <div class="flexcol">
    <header class="sheet-header nogrow">
      <document-img :document="actor" />
      <document-name :document="actor" />
    </header>

    <section class="sheet-area nogrow">
      <h4 class="clickable text" @click="rollSupply">
        {{ $t('IRONSWORN.Supply') }}
      </h4>

      <boxrow
        style="line-height: 25px"
        :min="0"
        :max="5"
        :current="actor.data.supply"
        @click="setSupply"
      />
    </section>

    <section class="sheet-area nogrow">
      <bonds :actor="actor" />
    </section>

    <section
      class="sheet-area ironsworn__drop__target"
      data-drop-type="progress"
    >
      <transition-group name="slide" tag="div" class="nogrow">
        <progress-box
          v-for="item in progressItems"
          :key="item._id"
          :item="item"
          :actor="actor"
        />
      </transition-group>

      <progress-controls :actor="actor" />
    </section>

    <textarea
      class="notes"
      :placeholder="$t('IRONSWORN.Notes')"
      v-model="actor.data.biography"
      @blur="saveNotes"
    />
  </div>
</template>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 83px;
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
  border-top: 0;
  border-bottom: 0;
}

textarea.notes {
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  font-family: var(--font-primary);
  resize: none;
  flex: 1;
  min-height: 150px;
}
</style>

<script>
export default {
  props: {
    actor: Object,
  },

  computed: {
    progressItems() {
      return [
        ...this.actor.items.filter((x) => x.type === 'vow'),
        ...this.actor.items.filter((x) => x.type === 'progress'),
      ]
    },
  },

  methods: {
    setSupply(_ev, value) {
      this.$actor.update({ data: { supply: value } })
      CONFIG.IRONSWORN.IronswornSettings.maybeSetGlobalSupply(value)
    },

    rollSupply() {
      CONFIG.IRONSWORN.RollDialog.show({
        actor: this.$actor,
        stat: 'supply',
      })
    },

    saveNotes() {
      this.$actor.update({ 'data.biography': this.actor.data.biography })
    },
  },
}
</script>
