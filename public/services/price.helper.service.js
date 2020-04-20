function arraySumHelperService() {
    return {
        createSumOfCbFn: function(arr, cb){
            return function(arr, cb) {
                return arr.reduce(function(prevValue, currentItem){
                    return prevValue + cb(currentItem);
                }, 0) 
            }
        },
        createSumOfPropertyFn: function (arr, key) {
            return function (arr, key) {
                return arr.reduce(
                    function (prevValue, currentItem) {
                        return prevValue + currentItem[key];
                    }, 0)
            }
        }
    };
}

angular.module('app').factory('arraySumHelperService', arraySumHelperService);