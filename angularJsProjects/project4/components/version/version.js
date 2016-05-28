'use strict';

angular.module('ngSocialApp.version', [
  'ngSocialApp.version.interpolate-filter',
  'ngSocialApp.version.version-directive'
])

.value('version', '0.1');
