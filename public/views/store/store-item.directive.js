angular.module('app').directive('storeItem', function(){
    return{
      restrict: 'E',
      template: `
                    <a class="store-item-image-link" ui-sref="product({productid: storeItem.productid, productname: storeItem.productname})">
                      <img class="store-item-image" ng-src="./img/store{{storeItem.productimage}}">
                    </a>
                    <div class="store-item-text">
                      <p>{{storeItem.productname}}</p>
                      <p>{{'$' + storeItem.productprice}}</p>
                    </div>
                `,
      scope: {
        storeItem: '=item',
      },
    };
});
  