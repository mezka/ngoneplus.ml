angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/views/cart/cart.html','<div class="cart-wrapper">\n    <p class="cart-title">Shopping Cart</p>\n    <cart-element ng-repeat="item in items"></cart-element>\n</div>\n\n\n<!-- <!DOCTYPE html>\n\n<div class="cart-wrapper">\n    <div class="cart-container">\n        <cart-element class="row cart-element" ng-repeat="item in items">\n        </cart-element>\n\n        <div class="row cart-details">\n            <div class="col-sm-offset-9 col-sm-3">\n                <span>Total: ${{total}}</span>\n            </div>\n        </div>\n\n        <div class="row cart-nav">\n            <div class="col-sm-offset-9 col-sm-3">\n                <button ng-click="clearCart()">Clear</button>\n                <button ng-click="checkoutCart()">Checkout</button>\n            </div>\n        </div>\n    </div>\n</div> -->\n');
$templateCache.put('/views/checkout/checkout.html','<!DOCTYPE html>\n<div class="checkout-wrapper">\n    <div class="row">\n\n        <div class="offset-col-sm-3 col-sm-12">\n            <form ng-submit="payment.charge(payment.info)" class="credit-card-form">\n                <h1>Checkout Details</h1><br><br>\n                <section class="form-group">\n                    <label>Name on card:</label>\n                    <input type="text" name="name" class="form-control" placeholder="Name" required>\n                </section>\n                <section class="form-group">\n                    <label>Card number:</label>\n                    <input class="form-control" ng-model="payment.info.cardnumber" type="text" placeholder="Credit Card No." required>\n                </section>\n                <section class="form-group">\n                    <label>CVC:</label>\n                    <input class="form-control" ng-model="payment.info.cvc" placeholder="CVC number" type="text" required>\n                </section>\n                <section class="form-group">\n                    <label>Exp. Mo</label>\n                    <input class="form-control" ng-model="payment.info.exp_month" type="text" name="name" placeholder="MM">\n                </section>\n                <section class="form-group">\n                    <label>Exp. Yr</label>\n                    <input class="form-control" ng-model="payment.info.exp_year" type="text" name="name" placeholder="YY">\n                </section>\n                <button class="btn btn-primary" type="sumbit">Confirm</button>\n            </form>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('/views/home/home.html','<!DOCTYPE html>\n<section class="hero">\n    <h1 class="title">\n        <img class="oneplus3t-svg" src="./img/index/oneplus3t-svg.svg" class="oneplus3t" alt="OnePlus3T">\n    </h1>\n    <h2 class="subtitle">A day\'s power in half an hour</h2>\n    <p class="price-title">From $439</p>\n    <a class="btn-transparent" href="#" type="submit">Learn More</a>\n    <div class="logo-container">\n        <img class="awards-logo d-none d-sm-none d-md-block" src="./img/index/encourages.png" alt="encourages">\n        <img class="awards-logo-xs d-block d-md-none" src="./img/index/encourages-xs.png" alt="encourages-xs">\n        <img class="dash-logo" src="./img/index/dash-logo-svg.svg" class="dash" alt="dash-speed-charging">\n    </div>\n</section>\n<section class="row justify-content-md-around media">\n    <div class="col-12 col-md-4 d-flex flex-column justify-content-around align-items-center">\n        <div>\n            <img src="../img/index/media-mkbhd.png" alt="mkbhd-logo">\n        </div>\n        <p class="mb-0">"OnePlus 3T is the fastest charging phone in the world right now."</p>\n        <a href="#" class="media-link"><i class="glyphicon"></i> Learn more</a>\n    </div>\n    <div class="col-12 col-md-4 d-flex flex-column justify-content-around align-items-center">\n        <div>\n            <img src="../img/index/media-verge.png" alt="verge-logo">\n        </div>\n        <p class="mb-0">"OnePlus makes its best phone even better."</p>\n        <a href="#" class="media-link"><i class="glyphicon"></i> Learn more</a>\n    </div>\n    <div class="col-12 col-md-4 d-flex flex-column justify-content-around align-items-center">\n        <div>\n            <img src="../img/index/media-cnet.png" alt="cnet-logo">\n        </div>\n        <p class="mb-0">"The OnePlus 3T was rated 9/10 by CNET and named their Editor\'s Choice of November 2016."\n        </p>\n        <a href="#" class="media-link"><i class="glyphicon"></i> Learn more</a>\n    </div>\n</section>\n\n<section class="row no-gutters images">\n    <a href="#" class="col-12 col-md-4 image-link bg-face">\n        <div class="image-text">\n            <h3>Lick of Love</h3>\n            <p>Enter here</p>\n        </div>\n    </a>\n    <a href="#" class="col-12 col-md-4 image-link bg-awards">\n        <div class="image-text">\n            <h3>2016 Round-Up</h3>\n            <p>Awards and Recognition</p>\n        </div>\n    </a>\n    <a href="#" class="col-12 col-md-4 image-link bg-pidgeons">\n        <div class="image-text">\n            <h3>Shot on OnePlus</h3>\n            <p>Enter here</p>\n        </div>\n    </a>\n</section>\n<section class="mail">\n    <h4>Always be the first to know</h1>\n    <p>Sign up for our new newsletter</p>\n    <input class="oneplus-input" type="text" placeholder="E-mail address">\n    <button class="btn-subscribe" type="submit">Subscribe now</button>\n</section>');
$templateCache.put('/views/login/login.html','<!DOCTYPE html>\n<div class="login-wrapper">\n  <div class ="login-flex" ng-if = "!login.isAuthenticated()">\n    <h1>Log In</h1>\n\n    <form action="">\n        <label>E-mail</label>\n        <input type="email" ng-model="login.user.email" required>\n\n        <label>Password</label>\n        <input type="password" ng-model="login.user.password" ng-minlength="6" ng-maxlength="20" required>\n        <input type="submit" ng-click = "login.attempt(login.user.email, login.user.password)" value="Log In">\n    </form>\n\n    <a ui-sref="signup">Sign up with email</a>\n  </div>\n\n  <div class = "logout-flex" ng-if = "login.isAuthenticated()">\n    <button ng-click = "login.logout()">Log Out</button>\n  </div>\n</div>\n\n\n<!-- <pre ng-bind="user | json"></pre> -->\n');
$templateCache.put('/views/order/order.html','<!DOCTYPE html>\n<div class="summary-wrapper">\n    <div class="row">\n        <div class="col-sm-offset-3 col-sm-6 summary-flex">\n            <h1>Payment Succesful</h1>\n            <h2>Details</h2>\n            <p>Amount: ${{summary.stripeObj.amount / 100}}</p>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('/views/product/product.html','<div class="product-wrapper">\n  <div class="gallery-wrapper">\n    <img class="displayed-image swap-animation" ng-src="./img/store/{{product.current.currentimage}}"\n      ng-animate-swap="product.current.currentimage" alt="option-image">\n    <div class="gallery-container">\n      <div class="image-container" ng-class="{\'background-white\': product.current.currentimage == imageurl}"\n        ng-click="product.changeCurrentImage(imageurl)" ng-repeat="imageurl in product.current.imageurls">\n        <img ng-src="./img/store/{{imageurl}}" alt="">\n      </div>\n    </div>\n  </div>\n\n\n  <div class="option-wrapper">\n    <h3 class="product-title">{{product.current.productname + \' \'  + product.current.optionname}}</h3 class="">\n\n    <hr />\n    <p>Options</p>\n\n    <button class="btn-option my-3" ng-click="product.changeCurrentOption(option)" ng-repeat="option in product.options"\n      ng-class="{\'border-red\': product.current.optionid == option.optionid}">\n      <div class="option-icon-container">\n        <img ng-if="option.optionimageicon" class="option-icon" ng-src="./img/store/{{option.optionimageicon}}" alt="">\n        <div ng-if="option.optionimagecolor" class="option-icon"\n          ng-style="{\'background-color\': option.optionimagecolor}"></div>\n      </div>\n      <p>\n        {{option.optionname}}\n      </p>\n    </button>\n\n    <div class="product-prices">\n      <p class="product-regular-price" ng-class="{\'text-decoration\': product.current.discount? strikethrough : none}">\n        ${{product.current.optionprice}}\n      </p>\n      <p class="product-discounted-price" ng-if="product.current.discount" >\n        {{ product.current.price * (100 - product.current.discount) / 100 }}</p>\n    </div>\n\n    <button class="btn-cart" ng-click="product.addCurrentOptionToCart()">\n      Add to cart\n    </button>\n  </div>\n</div>');
$templateCache.put('/views/signup/signup.html','<!DOCTYPE html>\n<div class="signup-wrapper">\n  <div class="signup-flex">\n      <form class="signup-form" ng-submit="signup.register(signup.user)">\n          <h1>Sign Up</h1>\n\n          <div class="input-flex">\n              <label>E-mail</label>\n              <input type="email" ng-model="signup.user.useremail" required>\n          </div>\n\n          <div class="input-flex">\n              <label>First name</label>\n              <input type="text" ng-model="signup.user.userfirstname" required>\n          </div>\n\n          <div class="input-flex">\n              <label>Last name</label>\n              <input type="text" ng-model="signup.user.userlastname" required>\n          </div>\n\n          <div class="input-flex">\n              <label>Adress 1</label>\n              <input type="text" ng-model="signup.user.useraddress1" required>\n          </div>\n\n          <div class="input-flex">\n              <label>Adress 2</label>\n              <input type="text" ng-model="signup.user.useraddress2">\n          </div>\n\n          <div class="input-flex">\n              <label>Password</label>\n              <input type="password" ng-model="signup.user.userpassword" pattern=".{6,20}" minlength="6" maxlength="20" required>\n          </div>\n\n          <div class="input-flex">\n              <label>Password (repeat)</label>\n              <input type="password" ng-model="signup.user.userpassword" pattern=".{6,20}" minlength="6" maxlength="20" required>\n          </div>\n\n          <button type="submit">Sign Up</button>\n      </form>\n  </div>\n  </div>\n');
$templateCache.put('/views/store/store.html','<!DOCTYPE html>\n\n<section class="store-hero"></section>\n\n<div class="store-main">\n    <store-item class="store-item" item="item" ng-repeat="item in store.items"/>\n</div>\n');
$templateCache.put('/views/cart/directives/cart-element.html','<!DOCTYPE html>\n\n\n<div class="cart-element">\n  <div class="cart-img-container">\n    <img src="./img/store/cases/x-flipcover/orange/orange-front.png" alt="">\n  </div>\n  <div class="cart-info-container">\n    <p class="cart-product-title">\n      Oneplus 6T Bumper Case Karbon\n    </p>\n\n    <p class="cart-price"></p>\n    <p class="cart-discounted-price"></p>\n\n    <div class="cart-item-subtotal-wrapper">\n      <div class="cart-item-qty-selector"></div>\n      <p class="item-subtotal">\n        29.94\n      </p>\n    </div>\n  </div>\n</div>\n\n  <!-- <div class="col-sm-offset-1 col-sm-3">\n    <div class="img-container">\n      <img class="option-img" ng-src="./img/store/{{item.imageurl}}" alt="option">\n    </div>\n  </div>\n  <div class="col-sm-2 cart-title-flex">\n    <p>{{item.productname + \' \' + item.optionname}}</p>\n  </div>\n  <div class="col-sm-2 cart-item-flex">\n    <p>Unit Price: ${{item.optionprice}}</p>\n    <p>Subtotal: ${{(item.optionprice * item.quantity).toFixed(2)}}</p>\n  </div>\n  <div class="col-sm-offset-1 col-sm-1 cart-nav-flex">\n      <i class="fa fa-times icon" aria-hidden="true" ng-click = "deleteCartElement(item.tempid)"></i>\n\n      <div class="quantity">\n        <label for="quantitySelect">Quantity: </label>\n        <select ng-options = "number for number in quantity" name="quantitySelect" ng-model="item.quantity"></select>\n      </div>\n  </div> -->\n');}]);