import React from "react";

const page = () => {
  return (
    <div>
      <div className=" bg-pink-500 border-2 border-black px-10 ">
        <div>
          <div className=" ">
            <h1 className=" text-[3rem] uppercase  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500 font-bold">
              Congractulations Account Created Successfully
            </h1>
          </div>

          <div className=" mt-10">
            <div>
            <div className=" w-[35rem] ">
                  <h2 className=" text-4xl font-bold uppercase  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  Dear [User's First Name],
                  </h2>
                </div>
              <p className=" text-lg  mt-4">
                Congratulations and welcome to PurchasesPal.com!
              </p>
              <p className=" text-lg  mt-4">
              We are thrilled to have you join our community. Your registration was successful, and you are now ready to explore a wide variety of products on our platform. At PurchasesPal, we strive to provide you with an exceptional shopping experience, offering everything you need at competitive prices.
              </p>
             

              <div className=" mt-5">
                <div className=" w-[65rem] ">
                  <h2 className=" text-4xl font-bold uppercase  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  Here’s a quick overview of what you can do next:
                  </h2>
                </div>

                <p className=" text-lg  mt-4">
                1. **Explore Products**: Browse through our extensive collection of products across multiple categories. Whether you're looking for electronics, fashion, home goods, or more, we’ve got you covered.

                </p>
                <p className=" text-lg  mt-4">
                2. **Special Offers**: Check out our latest deals and discounts exclusively available to our members.


                </p>
                <p className=" text-lg  mt-4">
                3. **Personalized Recommendations**: Enjoy personalized product recommendations based on your preferences and browsing history.

                </p>
                <p className=" text-lg  mt-4">
                4. **Easy Checkout**: Experience a seamless checkout process with multiple payment options to suit your convenience.


                </p>
                <p className=" text-lg  mt-4">
                5. **Order Tracking**: Keep track of your purchases with our real-time order tracking feature.


                </p>
                <ul>
                  <li className=" text-lg  mt-4">
                    <strong>To get started, simply [log in to your account](insert login link). We recommend updating your profile to enhance your shopping experience.
                    </strong> 
                  </li>
                  <li className=" text-lg  mt-4">
                    <strong>Ensuring Quality and Authenticity:</strong> We
                    partner with trusted brands and suppliers to bring you only
                    the best. Every product on Purchase Pal is vetted for
                    quality and authenticity, so you can shop with confidence
                    knowing you’re getting genuine items.
                  </li>
                  <li className=" text-lg  mt-4">
                    <strong>If you have any questions or need assistance, our customer support team is here to help. Feel free to reach out to us at [support@purchasespal.com] or visit our [Help Center](insert help center link).
                    </strong>
                  </li>
                  <li className=" text-lg  mt-4">
                    <strong>Thank you for choosing PurchasesPal.com. We look forward to serving you!
                    </strong>
                  </li>
                </ul>
              </div>

              <div>
                <div className=" w-[20rem]">
                  <h2 className=" text-4xl font-bold uppercase  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  Best regards,
                  </h2>
                </div>
                <div className=" w-[30rem]">
                  <h2 className=" text-4xl font-bold uppercase  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  The PurchasesPal Team
                  </h2>
                </div>
                

                <div className=" mb-6">
                  <h2 className=" text-2xl font-bold uppercase  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  P.S. Don’t forget to follow us on [Facebook](insert link), [Twitter](insert link), and [Instagram](insert link) for the latest updates and promotions.
                  </h2>
                </div>

               
              </div>

             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
