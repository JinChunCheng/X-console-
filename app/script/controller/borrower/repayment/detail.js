define([], function() {
    return ['$scope', '$timeout','metaService','$filter', '$state', '$stateParams', 'borrowerService', function($scope, $timeout,metaService,$filter, $state, $stateParams, borrowerService) {
        $scope.vm = {
            data: {},
            cancel: function() {
                $state.go('borrower.repayment.list');
            },
            accountSubjectCode:[{code:"1001",title:"人民币"}],
        };

        function getDetail(id) {
                borrowerService.borrowerRepaymentDetail.get({ id: id }).$promise.then(function(res) {
                    //基本信息
                    $scope.vm.accountSubjectCode.forEach(function(item) {
                        if (item.code === res.data.accountSubjectCode) {
                            res.data.accountSubjectCode = item.title;
                            return;
                        }
                    });
                    $scope.vm.data = res.data;
                });
            }
            getDetail($stateParams.id);
    }];
});
