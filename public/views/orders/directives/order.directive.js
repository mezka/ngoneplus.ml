angular.module('app')
  .directive('order', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        currentorder: '=',
        payForOrder: '&'
      },
      template: `
        <div class="row">
          <div class="col-12">
              <div class="row order-title-row">
                  <div class="col">
                      <h3>ORDER PLACED</h3>
                      <p>{{currentorder.createddate | date:'fullDate'}}</p>
                  </div>
                  <div class="col">
                      <h3>TOTAL</h3>
                      <p>{{currentorder.orderprice | currency }}</p>
                  </div>
                  <div class="col-auto">
                      <h3>SHIP TO</h3>
                      <p>{{currentorder.address}}</p>
                  </div>
                  <div class="col-auto">
                      <h3>ORDER #{{currentorder.id}}</h3>
                  </div>
              </div>
          </div>
          <div class="col-12 my-4" ng-repeat="currentorderitem in currentorder.orderitems">
              <div class="row" >
                  <div class="col-auto order-image-container">
                      <img class="img-fluid order-image" src="./img/store/{{currentorderitem.optionimages[0]}}" alt="">
                  </div>
                  <div class="col d-flex align-items-center justify-content-center">
                      <h4>{{currentorderitem.productname + ' ' + currentorderitem.optionname}}</h4>
                  </div>
                  <div class="col-auto d-flex flex-column justify-content-center text-right">
                      <p>Quantity: {{currentorderitem.quantity}}</p>
                      <p ng-class="{strikethrough: currentorderitem.discount}">Price: {{currentorderitem.optionprice | currency}}</p>
                      <p ng-if="currentorderitem.discount">Discounted price: {{currentorderitem.discount}}</p>
                  </div>
              </div>
          </div>
          <button ng-if="!currentorder.paid" ng-click="payForOrder({orderid: currentorder.id})" class="btn-pay-order btn-oneplus-red">Pay for this order</button>
        </div>
      `,
    }
  });