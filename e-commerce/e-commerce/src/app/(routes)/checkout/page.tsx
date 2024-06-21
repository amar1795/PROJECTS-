"use client";

import SummaryCard from "@/components/summary product card/SummaryCard";
import React, { use, useEffect, useRef, useState, useTransition } from "react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import {
  RadioGroupComponent,
  formatAddress,
} from "@/components/RadioGroupComponent";
import StyledButton from "@/components/styled Button/StyledButton";
import { auth } from "@/auth";
import {
  addAddressToUser,
  getAllAddressesForUser,
} from "@/actions/user-account/userAddress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, PaymentSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { userCheckoutPayment } from "@/actions/user-account/userpayment";
import {
  calculateCartSummary,
  getProductsInCartSummary,
} from "@/actions/cart/cartSummary";
import { prepareOrderData } from "@/actions/order/prepareOrderData";
import { createOrder } from "@/actions/order/orderCreation";
import { processOrder } from "@/actions/order/checkout";
import { useRouter } from "next/navigation";

const page = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [alladdress, setalladdress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [productData, setproductData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);

  const user = useCurrentUser();
  console.log("this is the user id", user?.id);

  const addresses = [
    "1234 Elm Street, Apt 5B, Springfield, IL 62704, United States",
    "5678 Maple Avenue, Suite 101, Austin, TX 73301, United States",
    "9101 Oak Drive, Unit 22, San Francisco, CA 94103, United States",
    "1122 Pine Lane, Floor 3, New York, NY 10001, United States",
    "3344 Birch Boulevard, Room 10, Miami, FL 33101, United States",
  ];
  const { toast } = useToast();
  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      toast({
        title: "Error",
        description: "Please select a shipping address",
        variant: "destructive",
      });
      return;
    }
    // i guess formref was creating the issue of creating the order twice  at times 
    // if (formRef.current) {
    //   formRef.current.dispatchEvent(
    //     new Event("submit", { cancelable: true, bubbles: true })
    //   );
    // }
  };

  useEffect(() => {
    const data = async () => {
      const alladdress = await getAllAddressesForUser(user?.id);
      setalladdress(alladdress);
      const cartSummaryData = await calculateCartSummary(user.id);
      if (cartSummaryData.totalUniqueItems === 0) {
        toast({
          variant: "destructive",
          title: "No Orders in the Cart ",
          description:
            "Please add some products to the cart to proceed with the checkout",
        });
      }
    };
    data();
  }, [success]);

  // userId: string,
  // products: Product[],
  // addressID: string,
  // paymentMode: string,
  // cardId?: string,
  // walletId?: string

  useEffect(() => {
    const cartSummary = async () => {
      const data = await getProductsInCartSummary(user.id);
      setproductData(data);
      console.log("this is the product data", data);
    };
    cartSummary();
  }, []);

  // console.log("this is the payment Data ", paymentData);

  // console.log("this is the user id", user?.id);
  const addresses1 = [
    {
      street: "1234 Elm Street",
      apartment: "Apt 5B",
      city: "Springfield",
      state: "IL",
      country: "United States",
      postalCode: "62704",
    },
    {
      street: "5678 Maple Avenue",
      apartment: "Suite 101",
      city: "Austin",
      state: "TX",
      country: "United States",
      postalCode: "73301",
    },
    {
      street: "9101 Oak Drive",
      apartment: "Unit 22",
      city: "San Francisco",
      state: "CA",
      country: "United States",
      postalCode: "94103",
    },
    {
      street: "1122 Pine Lane",
      apartment: "Floor 3",
      city: "New York",
      state: "NY",
      country: "United States",
      postalCode: "10001",
    },
    {
      street: "3344 Birch Boulevard",
      apartment: "Room 10",
      city: "Miami",
      state: "FL",
      country: "United States",
      postalCode: "33101",
    },
  ];
  // addAddressToUser(user, addresses1[4])

  const onSubmit = (values: z.infer<typeof AddressSchema>) => {
    setError("");
    setSuccess("");
    // alert(values.email);

    startTransition(() => {
      addAddressToUser(user?.id, values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        reset();
      });
    });

    toast({
      title: "Successfully added the address",
      description: "You have successfully added the address",
    });
  };

  const onSubmitPayment = async (values: z.infer<typeof PaymentSchema>) => {
    // Check if the address is selected before proceeding
    if (!selectedAddress) {
      toast({
        title: "Error",
        description: "Please select a shipping address",
        variant: "destructive",
      });
      return;
    }

    setError("");
    setSuccess("");
    try {
      startTransition(async () => {
        try {
          const data = await userCheckoutPayment(user?.id, values);
          setError(data.error);
          setSuccess(data.success);
          setPaymentData(data.paymentRecord);
        } catch (error) {
          console.error("Error during payment:", error);
          setError("Failed to process payment. Please try again.");
        } finally {
          resetPayment();
        }
      });

      // Await until the transition is complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Successfully Filled the Data",
        description:
          "Order Creation in progress and proceeding to the next step...",
      });
      const order = await processOrder({
        selectedAddressId: selectedAddress?.id,
      });
      console.log("this is the order data", order.url);

      // Creating the order after the transition
      // const { userId, products, addressID,totalAmount } =  prepareOrderData(user.id, productData, selectedAddress?.id);
      // const orderData = {
      //     userId: userId,
      //     products: products,
      //     addressID: addressID,
      //     totalAmount
      //     // Changed to addressId to match the interface
      // };
      // console.log("selected addresID is", selectedAddress?.id);
      // console.log("Order data prepared successfully:", orderData);

      // this addressId was done for debugging purposes

      // const addressID = selectedAddress?.id;
      // Append the address ID to the URL

      // if (addressID) {
      //   const url = new URL(window.location);
      //   url.searchParams.set("addressID", addressID);
      //   window.history.pushState({}, "", url);
      // }

      window.location = order.url;
      // router.push(order.url);
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create order. Please try again.",
      });
      setError("Failed to create order. Please try again.");
    }
  };

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      apartment: "",
      street: "",
      city: "",
      state: "",
      landmark: "",
      postalCode: "",
      phoneNumber: "",
    },
    mode: "onBlur", // Validate on blur
  });

  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    formState: { errors: errorsPayment },
    trigger: triggerPayment,
    reset: resetPayment,
  } = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      nameOnCard: "",
    },
    mode: "onBlur",
  });

  const handleAddressChange = (address) => {
    // formatAddress
    toast({
      title: "Shipping Address Selected",
      description: `Your Shipping Address is: ${formatAddress(address)}`,
    });
    setSelectedAddress(address);

    console.log("Selected Address: ", selectedAddress?.id);
    // alert(`Your Shipping Address is: ${formatAddress(address)}`);
  };

  // Format card number as XXXX-XXXX-XXXX-XXXX
  const formatCardNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16);
    const formattedValue =
      value
        .match(/.{1,4}/g)
        ?.join("-")
        .substring(0, 19) || "";
    e.target.value = formattedValue;
  };

  // Format expiration date as MM/YY with leading zero for months 2-9
  // Format expiration date as MM/YY with handling of leading zero for months 2-9
  const formatExpirationDate = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    let formattedValue = "";

    if (value.length >= 1) {
      const month = value.substring(0, 2);
      const year = value.substring(2, 4);

      if (month === "00" || year === "00") {
        // Prevent '00/' or '/00'
        formattedValue = "";
      } else if (parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12) {
        // Valid month, format as MM/YY
        formattedValue = `${month}/${year}`;
      } else if (
        value.length === 4 &&
        parseInt(month, 10) >= 2 &&
        parseInt(month, 10) <= 9
      ) {
        // Handle cases like '08/5' -> '08/05'
        formattedValue = `0${month}/${year}`;
      } else if (value.length === 4 && parseInt(month, 10) === 1) {
        // Handle case like '1' -> '01/'
        formattedValue = `0${month}/`;
      } else {
        // Invalid input, reset value
        formattedValue = "";
      }
    }

    e.target.value = formattedValue;
  };
  // Restrict CVV to 3 digits
  const restrictCvv = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    e.target.value = value;
  };

  return (
    <div>
      <div className=" bg-teal-600 h-[8rem] border-b-4 border-black">
        <h1 className=" text-[5rem] px-4">CHECKOUT </h1>
      </div>
      <div className="  bg-green-400  ">
        <div className="">
          <div className=" ">
            <div className="py-4 px-5">
              <div className=" flex">
                <div className=" flex-1">
                  <div className=" mb-8 ">
                    <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                      Shipping Address
                    </h3>
                  </div>
                  <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      {...registerField("country")}
                      placeholder="Country"
                      className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    />
                    {errors.country && (
                      <span className=" italic text-red-950  text-[1.1rem]">
                        {errors.country.message}
                      </span>
                    )}
                    <div className="flex justify-between ">
                      <div className=" flex flex-col w-full">
                        <input
                          type="text"
                          {...registerField("firstName")}
                          placeholder="First Name"
                          className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                        />
                        {errors.firstName && (
                          <span className=" italic text-red-950  text-[1.1rem]">
                            {errors.firstName.message}
                          </span>
                        )}
                      </div>
                      <div className=" flex flex-col w-full">
                        <input
                          type="text"
                          {...registerField("lastName")}
                          placeholder="Last Name"
                          className="w-full ml-5 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                        />
                        {errors.lastName && (
                          <span className=" italic text-red-950  text-[1.1rem]">
                            {errors.lastName.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      {...registerField("apartment")}
                      placeholder="Apartment, suite etc."
                      className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    />
                    {errors.apartment && (
                      <span className=" italic text-red-950  text-[1.1rem]">
                        {errors.apartment.message}
                      </span>
                    )}
                    <input
                      type="text"
                      {...registerField("street")}
                      placeholder="Street"
                      className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    />
                    {errors.street && (
                      <span className=" italic text-red-950  text-[1.1rem]">
                        {errors.street.message}
                      </span>
                    )}
                    <div className="flex">
                      <div className=" flex flex-col w-full">
                        <input
                          type="text"
                          {...registerField("city")}
                          placeholder="City"
                          className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                        />
                        {errors.city && (
                          <span className=" italic text-red-950  text-[1.1rem]">
                            {errors.city.message}
                          </span>
                        )}
                      </div>
                      <div className=" flex flex-col w-full">
                        <input
                          type="text"
                          {...registerField("state")}
                          placeholder="State"
                          className="w-full ml-5 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                        />
                        {errors.state && (
                          <span className=" italic text-red-950  text-[1.1rem]">
                            {errors.state.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      {...registerField("landmark")}
                      placeholder="Landmark"
                      className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    />
                    {errors.landmark && (
                      <span className=" italic text-red-950  text-[1.1rem]">
                        {errors.landmark.message}
                      </span>
                    )}
                    <div className="flex ">
                      <div className=" flex flex-col  w-full">
                        <input
                          type="text"
                          {...registerField("postalCode")}
                          placeholder="Postal Code"
                          className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                        />
                        {errors.postalCode && (
                          <span className=" italic text-red-950  text-[1.1rem]">
                            {errors.postalCode.message}
                          </span>
                        )}
                      </div>
                      <div className=" flex flex-col w-full">
                        <input
                          type="text"
                          {...registerField("phoneNumber")}
                          placeholder="Phone Number"
                          className="w-full ml-5 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                        />
                        {errors.phoneNumber && (
                          <span className=" italic text-red-950  text-[1.1rem]">
                            {errors.phoneNumber.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-[4rem] flex">
                      <button
                        type="submit"
                        className="w-80 p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-green-500"
                      >
                        <h1 className="font-bold">Submit</h1>
                      </button>
                      <button
                        type="button"
                        className="w-80 p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-pink-500 ml-4"
                        onClick={() => {
                          reset(); // Call the reset method from useForm
                        }}
                      >
                        <h1 className="font-bold">Reset</h1>
                      </button>
                    </div>
                  </form>
                </div>

                <div className=" flex-1 ml-14 pl-14">
                  <div className="   mb-8 ">
                    <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                      Saved Address
                    </h3>
                  </div>
                  <div>
                    <div></div>

                    <RadioGroupComponent
                      address={alladdress}
                      selectedAddress={selectedAddress}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>

              <div className=" border-2 border-black  mt-8"></div>
              <form
                // ref={formRef}
                onSubmit={handleSubmitPayment(onSubmitPayment)}
              >
                <div className="w-[20rem] pt-5">
                  <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                    Payment Method
                  </h3>
                  <input
                    type="text"
                    {...registerPayment("cardNumber")}
                    placeholder="Card Number"
                    className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    // onInput={formatCardNumber}
                  />
                  {errorsPayment.cardNumber && (
                    <span className="italic text-red-950 text-[1.1rem]">
                      {errorsPayment.cardNumber.message}
                    </span>
                  )}
                  <input
                    type="text"
                    {...registerPayment("expirationDate")}
                    placeholder="MM/YY"
                    className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    // onInput={formatExpirationDate}
                  />
                  {errorsPayment.expirationDate && (
                    <span className="italic text-red-950 text-[1.1rem]">
                      {errorsPayment.expirationDate.message}
                    </span>
                  )}
                  <input
                    type="text"
                    {...registerPayment("cvv")}
                    placeholder="CVV"
                    className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                    // onInput={restrictCvv}
                  />
                  {errorsPayment.cvv && (
                    <span className="italic text-red-950 text-[1.1rem]">
                      {errorsPayment.cvv.message}
                    </span>
                  )}
                  <input
                    type="text"
                    {...registerPayment("nameOnCard")}
                    placeholder="Name on card"
                    className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 focus:outline-none"
                  />
                  {errorsPayment.nameOnCard && (
                    <span className="italic text-red-950 text-[1.1rem]">
                      {errorsPayment.nameOnCard.message}
                    </span>
                  )}

                  <div className=" mt-5" onClick={handleProceedToPayment}>
                    <StyledButton buttonName="Proceed to Payment" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className=" bg-pink-500 flex-1">
          <div className=" px-5 py-5">
          <div className=" pt-5 mb-8 ">
            <h3 className="w-[20rem] text-[3rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              Summary
            </h3>
          </div>
            <div>
              <div className=" px-4 py-1 mt-2 mb-2 w-[40rem] flex-1 ">
                <SummaryCard />
              </div>{" "}
              <div className=" px-4 py-1 mt-2 mb-2 w-[40rem] flex-1 ">
                <SummaryCard />
              </div>
            </div>

            <div></div>

            <div className=" w-[25rem] px-4 flex py-3">
              <Input placeholder="Enter Promo Code" />
              <button className=" bg-black text-white w-[10rem] p-2 ml-5 rounded-md">
                Apply
              </button>
            </div>

            <div>
              <div className=" flex justify-between  px-5 w-[40rem]">
                <div className=" self-center">SUBTOTAL</div>

                <div className=" flex self-center py-2 ">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">9.99</h1>
                </div>
              </div>
              <div className=" flex justify-between  px-5 w-[40rem]">
                <div className=" self-center">SHIPPING</div>

                <div className=" flex self-center py-2 ">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">FREE</h1>
                </div>
              </div>

              <div className=" flex justify-between  px-5 w-[40rem]">
                <div className=" self-center font-bold text-[1.5rem]">
                  SUBTOTAL
                </div>

                <div className=" flex self-center py-2 font-bold">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">9.99</h1>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default page;
