import Razorpay from "razorpay"
import Jwt from "jsonwebtoken"

export const apiRoutes = (expressApp) => {


  expressApp.get("/get-razorpay-key", async (req, res) => {
    console.log("getRazorPay Called")

    res.send({ "key": 'rzp_test_MVO9A5GHDY06k3' })
  })

  expressApp.get("/tokenAPI", async (req, res) => {
    console.log("tokenAPI")
    let token = Jwt.sign({ date: new Date }, "tokensecretkeys" , {
      expiresIn: "10h" // it will be expired after 10 hours
      //expiresIn: "20d" // it will be expired after 20 days
      //expiresIn: 120 // it will be expired after 120ms
      //expiresIn: "120s" // it will be expired after 120s
})
    console.log(new Date)
    return res.json({ success: true, message: token })
  })





  expressApp.post("/create-order", async (req, res) => {
    console.log("create-order")
    try {
    console.log("try create-order")
      
      let tokenResult = await Jwt.verify(req.body.token, "tokensecretkeys");
      console.log(tokenResult)
      if (tokenResult) {
        var amount = req.body.amount
        amount = amount.substring(1)
        parseInt(amount)
        console.log("createOrder Called")
        try {
          var instance = new Razorpay({
            key_id: 'rzp_test_MVO9A5GHDY06k3',
            key_secret: 'RJWicOUP5Zs9ORcTFOdwZ2ot',
          });
  
          const options = {
            amount: amount,
            currency: "INR"
          }
          const order = await instance.orders.create(options);
          if (!order) return res.status(500).send("Some Error Occured")
          res.send(order)
          console.log(order)
  
  
        }
        catch (err) {
          console.log(err)
          res.status(500).send(err)
        }
      }
      else {
        res.status(500).send("TokenNotMatch")
  
      }
    } catch (error) {
    console.log("catch create-order", error)

      res.status(500).send(error)
      
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