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

        <md-field md-outline :theme="theme">
          <label>Coupon</label>
          <md-input v-model="coupon"/>
          <button
            class="coupon-button"
            :class="theme"
          >
            <icon name="plus"/>
          </button>
        </md-field>

        <md-field md-outline md-no-label :theme="theme">
          <div
            class='phone-prefix'
            @click="toggleMenu"
            v-click-outside="closeMenu"
            :class="theme"
          >
            + {{selectedPrefix}}
            <icon :name="theme === 'light' ? 'dropdown' : 'dropdown-white'" :class="openMenu ? 'up' : 'down'"/>
            <div class='prefix-menu' v-if="openMenu">
              <div
                class="menu-item"
                v-for="prefix in phonePrefixes"
                @click="setPrefix(prefix)"
              >
                <span>{{prefix}}</span>
              </div>
            </div>
          </div>
          <md-input v-model="phone" type="number"/>
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
import Vue from 'vue'

const dummyPhonePrefixes = [
  123,
  345,
  232
]
const handlers = new Map()

document.addEventListener('click', e => {
  for (const handler of handlers.values()) {
    handler(e)
  }
})

Vue.directive('click-outside', {
  bind(el, binding) {
    const handler = e => {
      if (el !== e.target && !el.contains(e.target)) {
        binding.value(e)
      }
    }

    handlers.set(el, handler)
  },

  unbind(el) {
    handlers.delete(el)
  }
})

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
    theme: 'light',
    coupon: null,
    phone: null,
    openMenu: false,
    selectedPrefix: dummyPhonePrefixes[0],
    phonePrefixes: dummyPhonePrefixes
  }),
  methods: {
    toggleTheme () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
    toggleMenu () {
      this.openMenu = !this.openMenu
    },
    setPrefix (prefix) {
      this.selectedPrefix = prefix
    },
    closeMenu () {
      this.openMenu = false
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

  .coupon-button {
    width: 42px;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1f1f1f;
    cursor: pointer;
    outline: none !important;
    border: none;
    z-index: 2;

    svg {
      fill: white;
      width: 20px;
      height: 20px;
    }

    &.dark {
      background: white;

      svg {
        fill: #1f1f1f;
      }
    }
  }

  .phone-prefix {
    min-width: 80px;
    position: relative;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 10px 10px 20px;

    &.dark {
      color: white;
    }

    .icon-dropdown {
      width: 15px;
      height: 10px;
      transition: all ease 0.3s;

      &.up {
        transform: rotate(180deg);
      }
    }
  }

  .prefix-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    max-height: 200px;
    overflow: auto;
    z-index: 3;
    box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);

    .menu-item {
      font-size: 14px;
      padding: 3px 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #1f1f1f !important;

      span {
        margin-right: 10px;
        max-width: 216px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &:hover {
        cursor: pointer;
        background: #e8e5e5;
      }
    }
  }
</style>
