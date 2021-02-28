<template>
  <div class="md-field" :class="[fieldClasses]" @blur="onBlur">
    <slot />
  </div>
</template>

<script>

  export default {
    name: 'TextField',
    components: {
    },
    props: {
      mdInline: Boolean,
      mdOutline: Boolean,
      small: Boolean
    },
    data: () => ({
      MdField: {
        value: null,
        focused: false,
        highlighted: false,
        disabled: false,
        required: false,
        placeholder: false,
        textarea: false,
        autogrow: false,
        maxlength: null
      }
    }),
    provide () {
      return {
        MdField: this.MdField
      }
    },
    computed: {
      stringValue () {
        return (this.MdField.value || this.MdField.value === 0) && this.MdField.value.toString()
      },
      hasValue () {
        return this.stringValue && this.stringValue.length > 0
      },
      fieldClasses () {
        return {
          'md-inline': this.mdInline,
          'md-outline': this.mdOutline,
          'md-focused': this.MdField.focused,
          'md-highlight': this.MdField.highlighted,
          'md-disabled': this.MdField.disabled,
          'md-required': this.MdField.required,
          'md-has-value': this.hasValue,
          'md-has-placeholder': this.MdField.placeholder,
          'md-has-textarea': this.MdField.textarea,
          'md-autogrow': this.MdField.autogrow,
          'md-small': this.small
        }
      }
    },
    methods: {
      onBlur () {
        this.MdField.highlighted = false
      }
    }
  }
</script>

<style lang="scss">
  @import "../Animation/variables";

  $md-input-height: 38px;

  .md-field {
    width: 100%;
    min-height: 54px;
    margin: 4px 0 40px;
    display: flex;
    position: relative;
    font-family: inherit;

    &:before,
    &:after {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      transition: border .3s $md-transition-default-timing,
                  opacity .3s $md-transition-default-timing,
                  transform 0s .3s $md-transition-default-timing;
      will-change: border, opacity, transform;
      content: " ";
      background-color: #448aff;
    }

    &:after {
      height: 1px;
    }

    &:before {
      height: 2px;
      z-index: 2;
      opacity: 0;
      transform: scaleX(.12);
    }

    label {
      position: absolute;
      top: 23px;
      left: 0;
      pointer-events: none;
      transition: $md-transition-stand;
      transition-duration: .3s;
      font-size: 16px;
      line-height: 16px;
    }

    .md-input {
      margin-top: 14px;
      height: $md-input-height;
      padding: 0;
      display: block;
      flex: 1;
      border: none;
      background: none;
      transition: $md-transition-stand;
      transition-property: font-size, padding-top, color;
      font-family: inherit;
      font-size: 16px;
      line-height: 24;
      min-width: 200px;

      &[disabled] {
        cursor: default;
      }

      &:focus {
        outline: none;
      }

      &::-webkit-input-placeholder {
        font-size: 16px;
        text-shadow: none;
        -webkit-text-fill-color: initial;
        transition: $md-transition-stand;
        transition-property: font-size, color;
      }
    }

    .md-helper-text{
      height: 20px;
      position: absolute;
      bottom: -22px;
      font-size: 12px;
      transition: .3s $md-transition-default-timing;
    }

    .md-input-action {
      width: 32px;
      min-width: 32px;
      height: 32px;
      margin: 0;
      position: absolute;
      top: 16px;
      right: 0;
      transition: $md-transition-default;

      &.md-input-action-enter-active,
      &.md-input-action-leave-active {
        opacity: 0;
      }

      &.md-input-action-enter-to {
        opacity: 1;
      }
    }
  }

  .md-field {

    &.md-has-placeholder {
      label {
        pointer-events: auto;
        top: 10px;
        opacity: 0;
        font-size: 12px;
      }

      .md-input {
        font-size: 16px;
      }
    }

    &.md-focused,
    &.md-highlight {
      &:before {
        opacity: 1;
        transform: scaleX(1);
        transition: .3s $md-transition-default-timing;
        transition-property: border, opacity, transform;
      }
    }

    &.md-focused,
    &.md-has-value {
      label {
        pointer-events: auto;
        top: 0;
        opacity: 1;
        font-size: 12px;
      }

      .md-input{
        font-size: 16px;
      }
    }

    &.md-inline {
      label {
        pointer-events: none;
      }

      &.md-focused {
        label {
          top: 23px;
          font-size: 16px;
        }
      }

      &.md-has-value {
        label {
          opacity: 0;
        }
      }
    }

    &.md-outline {
      &:before,
      &:after {
        height: auto;
        pointer-events: none;
        top: 0;
        bottom: 0;
        transform: none;
        background: none !important;
        border: 1px solid grey;
        border-radius: 3px;
      }

      &:before {
        border-width: 2px;
      }

      label {
        top: calc(50% - 10px);
        left: 10px;
      }

      &.md-has-textarea:not(.md-autogrow) {
        .md-textarea {
          min-height: 100px;
          padding: 0 10px;
          resize: vertical;
        }
      }

      &.md-focused,
      &.md-has-value {
        label {
          top: 6px;
        }

        .md-input, .md-textarea {
          padding: 10px;
        }
      }

      &.md-focused {
        &:before,
        &:after {
          border-color: #448aff;
        }
      }
    }

    &.md-disabled {
      &:after {
        background: bottom left repeat-x;
        background-size: 4px 1px;
      }
    }

    &.md-required {
      label:after {
        position: absolute;
        top: 2px;
        right: 0;
        transform: translateX(calc(100% + 2px));
        content: "*";
        line-height: 1em;
        vertical-align: top;
      }
    }
  }
</style>
