<template>
  <div class="cart-page">
    <page-builder
      :sections="sections"
      :options="options"
      :containerFullHeight="calculateHeightStyle"
    ></page-builder>
  </div>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'Cart',
  components: { pageBuilder },
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'Cart'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {}
                }
              }
            ]
          },
          options: {}
        }
      ],
      options: []
    }
  },
  created() {},
  computed: {
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
