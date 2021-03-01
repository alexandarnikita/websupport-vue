<template>
  <div class="md-field" :class="[fieldClasses, theme]" @blur="onBlur">
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
      small: Boolean,
      theme: {
        type: String,
        default: 'light'
      }
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

    &.md-small {
      min-height: 42px !important;

      input {
        height: 26px !important;
      }

      &.md-focused,
      &.md-has-value {
        label {
          top: 2px !important;
        }
      }
    }

    &.dark {
      &.md-outline{
        &.md-focused:not(.md-invalid) {
          &:before,
          &:after {
            border-color: #64dd17 !important;
          }
        }

        label {
          color: grey;
        }

        .md-input, .md-textarea {
          color: aliceblue;
        }
      }
    }

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
    .md-suffix {
      font-size: 16px;
      line-height: 32px;
      align-self: center;
      justify-self: center;
      margin-right: 20px;
      color: grey;
    }

    .md-prefix {
      display: none;
      padding-right: 4px;
      font-size: 16px;
      line-height: 24px;
      align-self: center;
      justify-self: center;
    }

    &.md-focused, &.md-has-value {
      .md-prefix {
        display: block;
      }
    }

    .md-input,
    .md-textarea {
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

    .md-textarea {
      min-height: 38px;
      max-height: 230px;
      padding: 10px 0;
      resize: none;
      line-height: 1.3em;
    }

    .md-helper-text,
    .md-error {
      height: 20px;
      position: absolute;
      bottom: -22px;
      font-size: 12px;
      transition: .3s $md-transition-default-timing;
    }

    .md-error {
      display: block !important;
      left: 0;
      opacity: 0;
      transform: translate3d(0, -8px, 0);
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
    + .md-has-textarea:not(.md-autogrow) {
      margin-top: 36px;
    }

    &.md-has-placeholder {
      label {
        pointer-events: auto;
        top: 10px;
        opacity: 0;
        font-size: 12px;
      }

      .md-input,
      .md-textarea {
        font-size: 16px;
      }
    }

    &.md-has-textarea:not(.md-autogrow) {
      &:before,
      &:after {
        height: auto;
        pointer-events: none;
        top: 0;
        bottom: 0;
        transform: none;
        background: none !important;
        border: 1px solid transparent;
        border-radius: 3px;
      }

      &:before {
        border-width: 2px;
      }

      label {
        top: 16px;
        left: 16px;
      }

      .md-textarea {
        min-height: 100px;
        padding: 0 16px;
        resize: vertical;
      }

      &.md-focused,
      &.md-has-value {
        label {
          top: 6px;
        }

        .md-textarea {
          padding-top: 10px;
        }
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

      .md-input,
      .md-textarea {
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

    &.md-invalid {
      @keyframes md-invalid-shake {
        10%, 90% {
          transform: translate3d(-1px, 0, 0);
        }

        30%, 70% {
          transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
          transform: translate3d(4px, 0, 0);
        }
      }

      &.md-has-value label:not(:focus) {
        animation: md-invalid-shake .4s $md-transition-default-timing both;
        backface-visibility: hidden;
        perspective: 1000px;
      }

      &.md-has-textarea:not(.md-autogrow) {
        &:before {
          border-width: 2px;
        }
      }

      .md-error {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .md-helper-text {
        opacity: 0;
        transform: translate3d(0, -8px, 0);
      }

      &:after {
        background-color: red;
      }

      &.md-has-textarea:not(.md-autogrow) {
        &:before {
          border-color: red;
        }
      }

      label {
        color: red;
      }

      .md-error {
        color: red;
      }

      &:before,
      &:after {
        border-color: red;
      }

      &.md-focused {
        &:before,
        &:after {
          border-color: red;
        }
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
