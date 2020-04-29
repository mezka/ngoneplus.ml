SELECT id, createddate, address1, address2, city, state, country, zipcode, paid, receipt_url, json_agg(orderitem) AS orderitems
    FROM(
        SELECT id, createddate, address1, address2, city, state, country, zipcode, paid, receipt_url, json_build_object('productname', productname, 'optionname', optionname, 'quantity', quantity, 'discount', discount, 'optionprice', optionprice, 'optionimages', optionimages) AS orderitem
            FROM(
                SELECT Public.order.id, address1, address2, city, state, country, zipcode, paid, receipt_url, createddate, productname, optionname, quantity, discount, optionprice, json_agg(OptionImages.imageurl) AS optionimages FROM Public.order
                JOIN OrderItem ON OrderItem.Orderid = Public.order.id
                JOIN Products ON Products.productid = OrderItem.productid
                JOIN Options ON Options.optionid = OrderItem.optionid
                JOIN OptionImages ON OptionImages.optionId = Options.optionId
                JOIN Users ON Users.userId = Public.Order.userId
                JOIN Address ON Address.userId = Users.userId
                WHERE Public.Order.userid = $1
                GROUP BY Public.order.id, address1, address2, city, state, country, zipcode, paid, receipt_url, createddate, productname, optionname, quantity, discount, optionprice
            ) as agg_images
    ) as agg_object
GROUP BY id, address1, address2, city, state, country, zipcode, paid, receipt_url, createddate;