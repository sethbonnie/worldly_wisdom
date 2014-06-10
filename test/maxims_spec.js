var Maxim = require('../maxim');
var assert = require('assert');

describe('Maxim', function() {
  
  describe('#titles()', function() {
    
    var titles = Maxim.titles();

    it('should have null as the first item in returned array', function() {
      assert.strictEqual(null, titles[0])
    });

    it('first actual value should be a string', function() {
      assert.strictEqual('string', typeof titles[1])
    });

    it('last value should be a string', function() {
      assert.strictEqual('string', typeof titles[titles.length - 1])
    });

    it('returned array length should be equal to total number of maxims', function() {
      assert.strictEqual(Maxim.TOTAL_MAXIMS, titles.length - 1 );
    })
  });

  describe('#bodies()', function() {

    var bodies = Maxim.bodies();

    it('should have null as the first item in returned array', function() {
      assert.strictEqual(null, bodies[0])
    });

    it('first actual value should be a string', function() {
      assert.strictEqual('string', typeof bodies[1])
    });

    it('last value should be a string', function() {
      assert.strictEqual('string', typeof bodies[bodies.length - 1])
    });

    it('returned array length should be equal to total number of maxims', function() {
      assert.strictEqual(Maxim.TOTAL_MAXIMS, bodies.length - 1 );
    })
  });

  describe('#bodies.range(x, y)', function() {
    it('ends at TOTAL_MAXIMS if y > TOTAL_MAXIMS', function() {
      var bodies = Maxim.bodies.range(1, 400);

      assert.strictEqual(bodies.length, Maxim.TOTAL_MAXIMS);
    });

    it('returns an array of the correct length', function() {
      var bodies = Maxim.bodies.range(1, 3);

      assert.strictEqual(bodies.length, 3);
    });
  });

  describe('#bodies.from(x).to(y)', function() {
    it('ends at TOTAL_MAXIMS if y > TOTAL_MAXIMS', function() {
      var bodies = Maxim.bodies.from(1).to(400);

      assert.strictEqual(bodies.length, Maxim.TOTAL_MAXIMS);
    });

    it('returns an array of the correct length', function() {
      var bodies = Maxim.bodies.from(1).to(3);

      assert.strictEqual(bodies.length, 3);
    })
  })
})