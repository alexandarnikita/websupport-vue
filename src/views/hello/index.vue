<template>
  <div class="main-frame" :class="theme">
    <div class="container">
      <div class="form-group">
        <md-field md-outline :theme="theme" class="md-invalid">
          <label>Type here!</label>
          <md-input v-model="text1"/>
          <span class="md-helper-text">Helper text</span>
          <span class="md-error">There is an error</span>
        </md-field>

        <md-field md-outline :theme="theme">
          <label>Type here!</label>
          <md-input v-model="text2"/>
          <span class="md-helper-text">Helper text</span>
        </md-field>

        <md-field md-outline small :theme="theme">
          <label>My height is 48px</label>
          <md-input v-model="text3"/>
        </md-field>

        <md-field md-outline :theme="theme">
          <label>Autogrow</label>
          <md-textarea v-model="text4" md-autogrow/>
        </md-field>

        <md-field md-outline :theme="theme">
          <label>Optional</label>
          <md-input v-model="text5"/>
          <span class="md-suffix">optional</span>
        </md-field>
      </div>
      <div>
        <button
          @click="toggleTheme"
          class="btn btn-danger button"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MdField from '../../components/MdField/MdTextField'
import MdInput from '../../components/MdField/MdInput/MdInput'
import MdTextarea from '../../components/MdField/MdTextarea/MdTextarea'

export default {
  name: 'hello',
  components: {
    MdField,
    MdInput,
    MdTextarea
  },
  props: {},
  computed: {},
  data: () => ({
    text1: null,
    text2: null,
    text3: null,
    text4: null,
    text5: null,
    theme: 'light'
  }),
  mounted () {
  },
  methods: {
    toggleTheme () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    }
  }
}

</script>

<style lang="scss">
  .main-frame {
    width: 100%;
    height: 100vh;

    &.dark {
      background: #1f1f1f;
    }
  }

  .container {
    height: 100%;
    display: flex;
    padding-top: 50px;
  }

  .form-group {
    width: 500px;
  }

  .button {
    margin-left: 200px;
    cursor: pointer;
  }
</style>
