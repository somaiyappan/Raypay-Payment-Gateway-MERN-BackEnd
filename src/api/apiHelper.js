import Razorpay from "razorpay"

export const apiRoutes = (expressApp) => {
   

    expressApp.get("/get-razorpay-key", async (req, res) => {
        console.log("getRazorPay Called")
        
        res.send({ "key": 'rzp_test_MVO9A5GHDY06k3' })
    })

    expressApp.post("/create-order", async (req, res) => {
      var amount=req.body.amount
      amount= amount.substring(1)
      parseInt(amount)
        console.log("createOrder Called")
        try
      {  
          var instance = new Razorpay({
            key_id: 'rzp_test_MVO9A5GHDY06k3',
            key_secret: 'RJWicOUP5Zs9ORcTFOdwZ2ot',
          });

          const options = {
              amount :amount,
              currency:"INR"
          }
          const order = await instance.orders.create(options);
          if(!order) return res.status(500).send("Some Error Occured")
          res.send(order)
          console.log(order)

          
        }
        catch(err){
          console.log(err)
            res.status(500).send(err)
        }
    })

    expressApp.post('/pay-order', async (req, res) => {
        try {
          console.log(req.body)
          const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
            req.body;
      
          res.send({ msg: 'Payment was successfull', });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      });

   
}