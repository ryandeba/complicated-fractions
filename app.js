(function() {
  Vue.component("fraction", {
    template: `
      <div class="fraction">
        <!--
        <div class="fraction__number">
            {{ number }}
        </div>
        -->

        <div>
          <div class="fraction__numerator">
            <template v-if="typeof calculatedNumerator == 'number'">
              {{ calculatedNumerator }}
            </template>

            <template v-else>
              <fraction v-bind="calculatedNumerator"></fraction>
            </template>
          </div>

          <div class="fraction__denominator">
            <template v-if="typeof calculatedDenominator == 'number'">
              {{ calculatedDenominator }}
            </template>

            <template v-else>
              <fraction v-bind="calculatedDenominator"></fraction>
            </template>
          </div>
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

    data: function() {
      return {
        calculatedNumerator: 0,
        calculatedDenominator: 0
      };
    },

    watch: {
      denominator: function() {
        this.calculateValues();
      },

      numerator: function() {
        this.calculateValues();
      }
    },

    mounted: function() {
      this.calculateValues();
    },

    methods: {
      calculateValues: function() {
        var self = this;

        self.calculatedDenominator = self.denominator || 0;
        self.calculatedNumerator = self.numerator || 0;

        setTimeout(_calculateValues, 0) // too much recursion!

        function _calculateValues() {
          if (!self.calculatedDenominator || !self.calculatedNumerator) {
            return;
          }

          if (self.denominator > 2) {
            var divisor = self.denominator / 2;

            if (Number.isInteger(self.denominator / 2)) {
              self.calculatedDenominator = self.denominator / divisor;
            } else {
              self.calculatedDenominator = {
                numerator: self.denominator,
                denominator: 2
              }
            }

            self.calculatedNumerator = {
              numerator: self.numerator,
              denominator: divisor
            };
          }
        }
      }
    }
  });
})();
