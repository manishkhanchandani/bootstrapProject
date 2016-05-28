'use strict';

describe('ngSocialApp.version module', function() {
  beforeEach(module('ngSocialApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
