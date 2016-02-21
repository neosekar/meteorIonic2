angular
  .module('starter')
  .controller('LoginCtrl', LoginCtrl)
  .controller('HomeCtrl', HomeCtrl);

	 LoginCtrl.$inject = ['$scope', '$state','$reactive'];
	function LoginCtrl($scope, $state,$reactive) {
		$scope.credentials={};
		$reactive(this).attach($scope);

			$scope.doLoginAction = function() {
				console.log("login started..");
				Meteor.loginWithPassword($scope.credentials.username,$scope.credentials.password,this.$bindToContext((err) => {
					if (err){
						console.log(err);
					}
					else{
						console.log("login success");
						$state.go('home');
					}
					  
				  })
				);
		
			}
		  
     		$scope.doFacebookLogin=function(){
				console.log("service config",Accounts.loginServicesConfigured());
				Meteor.loginWithFacebook({requestPermissions: ['user', 'public_repo'],loginStyle:"popup"},this.$bindToContext((err) => {
					if (err){
						console.log("facebook login",err);
					}
					else{
						console.log("facebook login success");
						$state.go('home');
					}
					  
				  })
				);
			}

	   $scope.doCreateAccountAction = function() {
			Accounts.createUser({username: $scope.credentials.username, password: $scope.credentials.password,  profile: {
					createdOn: new Date()
					  }}, this.$bindToContext((err) => {
							if (err){
								console.log("account creation error",err);
							}
							else{
								console.log("account created successfully..");
								$state.go('home');
							}
							  
			}));
		}
	}

	  HomeCtrl.$inject = ['$scope', '$state', '$reactive'];

	function HomeCtrl($scope, $state, $reactive) {
		$scope.currentUser=Meteor.user();
		$reactive(this).attach($scope);
		
			$scope.doLogoutAction = function() {
				Meteor.logout(this.$bindToContext((err) => {
					if (err){
						console.log(err);
					}else{
						console.log("logged Out successfully..");
						$state.go('login');
					}
					  
				}));
			};

	}