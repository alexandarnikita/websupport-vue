<template>
  <input
    class="md-input"
    v-model="model"
    v-bind="attributes"
    v-on="listeners"
    @focus="onFocus"
    @blur="onBlur">
</template>

<script>
  import MdFieldMixin from '../MdFieldMixin'

  export default {
    name: 'MdInput',
    mixins: [MdFieldMixin],
    inject: ['MdField'],
    props: {
      id: {
        type: String,
        default: () => 'md-input'
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    computed: {
      listeners () {
        var l = {...this.$listeners}
        delete l.input
        return l
      }
    }
  }
</script>
