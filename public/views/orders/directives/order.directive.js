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
                  <div class="col-9 col-sm-3 col-md-auto">
                      <h3>ORDER PLACED</h3>
                      <p>{{currentorder.createddate | date:'fullDate'}}</p>
                  </div>
                  <div class="col-3 col-sm-auto">
                      <h3>TOTAL</h3>
                      <p>{{currentorder.orderprice | currency }}</p>
                  </div>
                  <div class="col-9 col-sm">
                      <h3>SHIP TO</h3>
                      <p>{{currentorder.address}}</p>
                  </div>
                  <div class="col-3 col-sm-auto">
                      <h3>ORDER #{{currentorder.id}}</h3>
                      <button class="btn-pay-order btn-oneplus-red" ng-if="!currentorder.paid" ng-click="payForOrder({orderid: currentorder.id})">Pay</button>
                      <button class="btn-pay-order btn-oneplus-red" ng-if="currentorder.paid" ui-sref="receipt({orderid: currentorder.id})">Receipt</button>
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
        </div>
      `,
    }
  });