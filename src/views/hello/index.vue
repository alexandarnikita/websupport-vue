<template>
  <div class="main-frame">
    <div class="container">
      <div class="form-group">
        <md-field md-outline class="md-invalid">
          <label>Type here!</label>
          <md-input v-model="text1"/>
          <span class="md-helper-text">Helper text</span>
          <span class="md-error">There is an error</span>
        </md-field>

        <md-field md-outline>
          <label>Type here!</label>
          <md-input v-model="text2"/>
          <span class="md-helper-text">Helper text</span>
        </md-field>

        <md-field md-outline small>
          <label>My height is 48px</label>
          <md-input v-model="text3"/>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import MdField from '../../components/MdField/MdTextField'
import MdInput from '../../components/MdField/MdInput/MdInput'

export default {
  name: 'hello',
  components: {
    MdField,
    MdInput
  },
  props: {},
  computed: {},
  data: () => ({
    text1: null,
    text2: null,
    text3: null
  }),
  mounted () {
  }
}

</script>

<style lang="scss">
  .main-frame {
    width: 100%;
    height: 100%;
  }

  .container {
    height: 100%;
    display: flex;
    background-color: white;
    padding-top: 50px;
  }

  .form-group {
    width: 500px;
  }
</style>
