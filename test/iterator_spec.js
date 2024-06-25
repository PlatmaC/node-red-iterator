const helper = require('node-red-node-test-helper');
const lowerNode = require('../iterator.js');

describe('iterator Node', function () {
  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    const flow = [{ id: 'n1', type: 'iterator', name: 'iterator' }];
    helper.load(lowerNode, flow, function () {
      const n1 = helper.getNode('n1');
      n1.should.have.property('name', 'iterator');
      done();
    });
  });
});
