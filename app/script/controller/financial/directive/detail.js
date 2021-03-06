define([], function() {
    return ['$scope', '$timeout', '$state', '$stateParams', 'toaster', 'financialService',
        function($scope, $timeout, $state, $stateParams, toaster, financialService) {

            var action = $stateParams.id ? 'edit' : 'add';

            $scope.vm = {
                action: action,
                data: {},
                cancel: function() {
                    $state.go('financial.directive.directive');
                }
            };

            (function(id) {
                if(!id)
                    return;
                financialService.cashDetailsTable.get({id: id}).$promise.then(function(res) {
                    if(res.code == 200) {
                        $scope.vm.data = res.data;
                    }
                    else
                        toaster.pop('error', res.msg);
                }, function(err) {
                    toaster.pop('error', '服务器连接错误！');
                });
            })($stateParams.id);
        }
    ];
});
