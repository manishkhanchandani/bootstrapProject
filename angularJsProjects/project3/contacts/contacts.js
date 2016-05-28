'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    console.log('calling controller contacts controller');
    //init firebase
    var ref = new Firebase('https://mycontacts12.firebaseio.com/contacts_2');
    //get contacts
    $scope.contacts = $firebaseArray(ref);
    //console.log($scope.contacts);
    //show add form
    $scope.showAddForm = function() {
        $scope.addFormShow = true;
    };
    //hide add form
    $scope.hide = function() {
        $scope.addFormShow = false;
        $scope.contactShow = false;
    }
    //submit contact
    $scope.addFormSubmit = function() {
        console.log('Adding contact');
        var name = ($scope.name) ? $scope.name : null;
        var email = ($scope.email) ? $scope.email : null;
        var company = ($scope.company) ? $scope.company : null;
        var work_phone = ($scope.work_phone) ? $scope.work_phone : null;
        var mobile_phone = ($scope.mobile_phone) ? $scope.mobile_phone : null;
        var home_phone = ($scope.home_phone) ? $scope.home_phone : null;
        var street_address = ($scope.street_address) ? $scope.street_address : null;
        var city = ($scope.city) ? $scope.city : null;
        var state = ($scope.state) ? $scope.state : null;
        var zipcode = ($scope.zipcode) ? $scope.zipcode : null;
        $scope.contacts.$add({
            name: name,
            email: email,
            company: company,
            phones: [
                {
                    work: work_phone,
                    mobile: mobile_phone,
                    home: home_phone
                }
            ],
            address: [
                {
                    street_address: street_address,
                    city: city,
                    state: state,
                    zipcode: zipcode
                }
            ]
        }).then(function(ref) {
            var id = ref.key();
            console.log('added contact with id ' + id);
            
            //clear the form
            clearFields();
            
            //hide the form
            $scope.addFormShow = false;
            
            //send message
            $scope.msg = 'Contact Added';
        });
    }

    // Clear $scope Fields
    function clearFields(){
        console.log('Clearing All Fields...');
    
        $scope.name = '';
        $scope.email = '';
        $scope.company = '';
        $scope.mobile_phone = '';
        $scope.home_phone = '';
        $scope.work_phone = '';
        $scope.street_address = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zipcode = '';
    }//end clearFields
    
    $scope.showContact = function(contact){
        console.log('Getting Contact...');
    
        $scope.disp_name = contact.name;
        $scope.disp_email 			= contact.email;
        $scope.disp_company 			= contact.company;
        $scope.disp_work_phone 		= contact.phones[0].work;
        $scope.disp_home_phone 		= contact.phones[0].home;
        $scope.disp_mobile_phone 	= contact.phones[0].mobile;
        $scope.disp_street_address 	= contact.address[0].street_address;
        $scope.disp_city 			= contact.address[0].city;
        $scope.disp_state 			= contact.address[0].state;
        $scope.disp_zipcode 			= contact.address[0].zipcode;
    
        $scope.contactShow = true;
    }//end show contact
    
    
    // Show Edit Form
    $scope.showEditForm = function(contact){
        $scope.editFormShow = true;
    
        $scope.id			    = contact.$id;
        $scope.name 			= contact.name;
        $scope.email 			= contact.email;
        $scope.company 			= contact.company;
        $scope.work_phone 		= contact.phones[0].work;
        $scope.home_phone 		= contact.phones[0].home;
        $scope.mobile_phone 	= contact.phones[0].mobile;
        $scope.street_address 	= contact.address[0].street_address;
        $scope.city 			= contact.address[0].city;
        $scope.state 			= contact.address[0].state;
        $scope.zipcode 			= contact.address[0].zipcode;
    }


    $scope.editFormSubmit = function(){
        console.log('Updating Contact...');
    
        // Get ID
        var id = $scope.id;
    
        // Get Record
        var record = $scope.contacts.$getRecord(id);
    
        // Assign Values
        record.name 						= $scope.name;
        record.email 						= $scope.email;
        record.company 						= $scope.company;
        record.phones[0].work 				= $scope.work_phone;
        record.phones[0].home 				= $scope.home_phone;
        record.phones[0].mobile 			= $scope.mobile_phone;
        record.address[0].street_address 	= $scope.street_address;
        record.address[0].city 				= $scope.city;
        record.address[0].state 			= $scope.state;
        record.address[0].zipcode 			= $scope.zipcode;
    
        // Save Conrtact
        $scope.contacts.$save(record).then(function(ref){
            console.log(ref.key);
        });
    
        clearFields();
    
        // Hide Form
        $scope.editFormShow = false;
    
        $scope.msg = "Contact Updated";
    }//end editFormSubmit()
    
    $scope.removeContact = function(contact) {
        console.log('removing contact');
        $scope.contacts.$remove(contact);
        $scope.msg="Contact Removed";
    }
}]);