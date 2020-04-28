SELECT Public.Order.id as orderid, Users.userid, stripeid, json_agg(json_build_object('id', orderitem.id, 'quantity', orderitem.quantity, 'discount', orderitem.discount, 'optionprice', options.optionprice)) AS orderitems FROM Public.Order
JOIN OrderItem ON OrderItem.orderid = Public.Order.id
JOIN Options ON Options.optionid = OrderItem.optionid
JOIN Users ON Users.userid = Public.Order.userid
WHERE Public.Order.id = $1
GROUP BY Public.Order.id, Users.userid, stripeid;
