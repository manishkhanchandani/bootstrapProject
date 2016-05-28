angular.module('myApp').service('mkServices', [function() {
  
  this.services = function() {
		return {
			automotive: {name: 'Automotive', key: 'automotive'},
			beauty: {name: 'Beauty', key: 'beauty'},
			computer: {name: 'Computer', key: 'computer'},
			creative: {name: 'Creative', key: 'creative'},
			cycle: {name: 'Cycle', key: 'cycle'},
			events: {name: 'Event', key: 'events'},
			farm_garden: {name: 'Farm & Garden', key: 'farm_garden'},
			financial: {name: 'Financial', key: 'financial'},
			household: {name: 'Household', key: 'household'},
			labor_move: {name: 'Labor / Move', key: 'labor_move'},
			legal: {name: 'Legal', key: 'legal'},
			lessons: {name: 'Lessons', key: 'lessons'},
			marine: {name: 'Marine', key: 'marine'},
			pet: {name: 'Pet', key: 'pet'},
			realestate: {name: 'Real Estate', key: 'realestate'},
			skilledtrade: {name: 'Skilled Trade', key: 'skilledtrade'},
			smallbusinessads: {name: 'Small Business Ads', key: 'smallbusinessads'},
			therapeutic: {name: 'Therapeutic', key: 'therapeutic'},
			travel_vacation: {name: 'Travel / Vacation', key: 'travel_vacation'},
			writingeditingtranslation: {name: 'Writing / Editing / Translation', key: 'writingeditingtranslation'}
		}
	};
 
    this.locationType = function() {
		return {
      county: {name: 'Within County', key: 'county'},
      state: {name: 'Within State', key: 'state'},
      country: {name: 'Within Country', key: 'country'},
      city: {name: 'Within City', key: 'city'},
    };
	};
  
  
  this.sortingType = function() {
		return {
      distAsc: {name: 'Distance Asc', key: 'distAsc', value: 'distance'},
      createdDesc: {name: 'Created At Desc', key: 'createdDesc', value: '-createdAt'},
      distDesc: {name: 'Distance Desc', key: 'distDesc', value: '-distance'},
      createdAsc: {name: 'Created At Asc', key: 'createdAsc', value: 'createdAt'}
    };
	};
}]);