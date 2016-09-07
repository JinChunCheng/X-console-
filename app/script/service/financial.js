define(['common/config'], function(config) {
    return ['financialService', ['$http', '$resource', '$q', function($http, $resource, $q) {
        var serverErrorData = {
            status: 500,
            msg: '服务器连接失败，请检查服务是否可用或联系管理员！'
        };

        //提现出款
        var withdrawCashTable = $resource(config.CASHOUT_CONSOLE + '/cashout/allList', { id: "@id" }, { 'query': { isArray: false }, 'update': { method: 'PUT' } });
        //满标出款
        var endBiddingCashTable = $resource(config.CASHOUT_CONSOLE + '/cashout/allList', { id: "@id" }, { 'query': { isArray: false }, 'update': { method: 'PUT' } });
        //出款指令列表
        var cashDirectiveTable = $resource(config.CASHOUT_CONSOLE + '/cashout/allList', { id: "@id" }, { 'query': { isArray: false }, 'update': { method: 'PUT' } });
        var cashDetailsTable = $resource(config.CASHOUT_CONSOLE + '/cashout/:id', { id: "@id" }, { 'query': { isArray: false }, 'update': { method: 'PUT' } });
        //划款打印
        var transferCashPrintTable = $resource(config.CASHOUT_CONSOLE + '/capitalAccountRemitePrint/showCapitalAccountRemiteList', { id: "@id" }, { 'query': { isArray: false }, 'update': { method: 'GET' } });
        //提现出款监控
        var withdrawCashMonitorTable = $resource(config.CASHOUT_CONSOLE + '/paymentMonitor/allList', { id: "@id" }, { 'query': { isArray: false }, 'update': { method: 'PUT' } });
        var monitorDetailsTable = $resource(config.CASHOUT_CONSOLE + '/paymentMonitor/:id', null, { 'query': { isArray: false }, 'update': { method: 'PUT' } });

        return {

            withdrawCashTable: withdrawCashTable,
            endBiddingCashTable: endBiddingCashTable,
            cashDirectiveTable: cashDirectiveTable,
            cashDetailsTable: cashDetailsTable,
            transferCashPrintTable: transferCashPrintTable,
            withdrawCashMonitorTable: withdrawCashMonitorTable,
            monitorDetailsTable: monitorDetailsTable,
            withdrawAccept: function(ids, exeChannel) {
                return $http({
                        method: 'PUT',
                        url: config.CASHOUT_CONSOLE + '/cashout/withdraw/accept/' + ids + '/' + exeChannel
                    })
                    .then(function(resp) {
                            if (resp) {
                                return resp.data;
                            } else {
                                return serverErrorData;
                            }
                        },
                        function(errResp) {
                            return $q.reject(errResp);
                        }
                    );
            },
            fullAccept: function(ids) {
                return $http({
                        method: 'PUT',
                        url: config.CASHOUT_CONSOLE + '/cashout/project/accept/' + ids
                    })
                    .then(function(resp) {
                            if (resp) {
                                return resp.data;
                            } else {
                                return serverErrorData;
                            }
                        },
                        function(errResp) {
                            return $q.reject(errResp);
                        }
                    );
            },
            fullAccept: function(ids) {
                return $http({
                        method: 'PUT',
                        url: config.CASHOUT_CONSOLE + '/cashout/project/accept/' + ids
                    })
                    .then(function(resp) {
                            if (resp) {
                                return resp.data;
                            } else {
                                return serverErrorData;
                            }
                        },
                        function(errResp) {
                            return $q.reject(errResp);
                        }
                    );
            },
            sendAccept: function(remitPrintId) {
                return $http({
                        method: 'PUT',
                        url: config.CASHOUT_CONSOLE + '/paymentMonitor/send/' + remitPrintId
                    })
                    .then(function(resp) {
                            if (resp) {
                                return resp.data;
                            } else {
                                return serverErrorData;
                            }
                        },
                        function(errResp) {
                            return $q.reject(errResp);
                        }
                    );
            },
            receiptAccept: function(remitPrintId) {
                return $http({
                        method: 'PUT',
                        url: config.CASHOUT_CONSOLE + '/paymentMonitor/receipt/' + remitPrintId
                    })
                    .then(function(resp) {
                            if (resp) {
                                return resp.data;
                            } else {
                                return serverErrorData;
                            }
                        },
                        function(errResp) {
                            return $q.reject(errResp);
                        }
                    );
            }

        }
    }]]
});
