(function() {
  const primes = [
    2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,
    107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199
  ];

  Vue.component("fraction", {
    template: `
      <div class="fraction">
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

          if (self.numerator == self.denominator) {
            self.calculatedNumerator = 1;
            self.calculatedDenominator = 1;
            return;
          }

          if (!primes.find(function(prime) { return prime == self.denominator; })) {
            var primeFactor = primes.find(function(prime) {
              return Number.isInteger(self.denominator / prime);
            });

            if (!primeFactor) {
              return;
            }

            self.calculatedDenominator = primeFactor;

            self.calculatedNumerator = {
              numerator: self.numerator,
              denominator: self.denominator / primeFactor
            };
          }
        }
      }
    }
  });
})();
