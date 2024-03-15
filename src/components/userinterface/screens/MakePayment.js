import { useCallback,useEffect } from "react";
import useRazorpay from "react-razorpay";
import { ServerURL } from "../../services/ServerServices";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
export default function MakePayment() {
  const Razorpay = useRazorpay();
  
    var user=useSelector((state)=>state.user)
    var userdata=Object.values(user)[0]
    const products = useSelector((state) => state.cart);
    const productList=Object.values(products)
    let total= productList.reduce((a,b) => {
        return  a+b.offerprice*b.qty;
      },0);
     
  const handlePayment = useCallback( async() => {
       const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*1000,
      currency: "INR",
      name: "Gwalior Basket",
      description: "Test Transaction",
      image: `http://${ServerURL}/images/1.jpg`,
    
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: userdata[0].fullname,
        email: "youremail@example.com",
        contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
     <Button onClick={handlePayment}>Click</Button>
    </div>
  );
}