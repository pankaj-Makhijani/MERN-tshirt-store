var braintree = require("braintree")

const braintree_merchant_id=process.env.braintree_merchant_id;
const braintree_public_key=process.env.braintree_public_key;
const braintree_private_key=process.env.braintree_private_key;


var gateway = new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:   braintree_merchant_id,
    publicKey:    braintree_public_key,
    privateKey:   braintree_private_key
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err,response) {
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.send(response);
        }
    });
}

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount : amountFromTheClient, //IMPORTANT
        paymentMethodNonce : nonceFromTheClient, //IMPORTANT
        // deviceData : deviceDataFromTheClient, //optional
        options : {
            submitForSettlement:true
        }
    }, function (err,result) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
        }
    });
}; 

