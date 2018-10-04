(function() {
  Vue.component("fraction", {
    template: `
      <div class="fraction">
        <div class="fraction__number">
            {{ number }}
        </div>
        <div>
          <div class="fraction__numerator">
            <template v-if="typeof data.numerator == 'number'">
              {{ data.numerator }}
            </template>

            <template v-else>
              <fraction v-bind="data.numerator"></fraction>
            </template>
          </div>

          <div class="fraction__denominator">{{ data.denominator }}</div>
        </div>
      </div>
    `,

    props: {
      number: {
        default: 0
      },
      numerator: {},
      denominator: {}
    },

    computed: {
      data: function() {
        var result = {...this.$props};

        if (this.denominator > 2) {
          var divisor = this.denominator / 2;

          result.denominator = 2;
          result.numerator = {
            numerator: this.numerator,
            denominator: divisor
          };
        }

        return result;
      }
    }
  });
})();
