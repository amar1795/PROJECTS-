"use client";
import UploadImage from "@/components/uploadImage";

import React, { startTransition, useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  RadioGroupComponent,
  formatAddress,
} from "@/components/RadioGroupComponent";
import { AddressSchema, PaymentSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  addAddressToUser,
  getAllAddressesForUser,
} from "@/actions/user-account/userAddress";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { userCheckoutPayment } from "@/actions/user-account/userpayment";
import StyledButton from "@/components/styled Button/StyledButton";
import { fetchUserCards } from "@/actions/payments/fetchAllCards";
import Image from "next/image";
import { DeleteModal } from "@/components/deleteModal";

const page = () => {
  const user = useCurrentUser();
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [alladdress, setalladdress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [paymentData, setPaymentData] = useState([]);
  const [AllUserCards, setAllUserCards] = useState([]);

  console.log("this is the user", user);
  // console.log("All Address: ", alladdress);
  console.log("All User Cards: ", AllUserCards);

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

  const onSubmitPayment = async (values: z.infer<typeof PaymentSchema>) => {
    // Check if the address is selected before proceeding

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
          console.error("Error adding the card :", error);
          setError("Failed to add the card details. Please try again.");
        } finally {
          resetPayment();
        }
      });

      // Await until the transition is complete to mimic a loading state
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Successfully Added the Card details",
        description: "Successfully Add the Card details",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to Add the Card Details . Please try again.",
      });
      setError("Failed to Add the Card Details. Please try again.");
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

  useEffect(() => {
    const data = async () => {
      const alladdress = await getAllAddressesForUser(user?.id);
      console.log("All Address: ", alladdress);
      setalladdress(alladdress);
      const allUserCards = await fetchUserCards(user?.id);
      setAllUserCards(allUserCards);
    };
    data();
  }, [success]);

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

  return (
    <div className="overflow-hidden border-2 border-black  flex flex-col ">
      <div className=" bg-violet-600 w-full border-b-4 border-black fixed top-0 left-0 right-0 z-10">
        <div className="flex px-16 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center mt-4 uppercase">
              Profile
            </h1>
            <h1 className="mb-5 font-bold text-[25px] uppercase">
              Update your profile
            </h1>
          </div>

          <div className=" flex">
            <div className="h-[4rem]">
              <Link href="/orders">
                <button className=" mr-12 p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-400">
                  <h1 className="font-bold">Go to Order's History Page</h1>
                </button>
              </Link>
            </div>
            <div className="h-[4rem]">
              <Link href="/">
                <button className=" mr-12 p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-green-600">
                  <h1 className="font-bold">Back to Home Page</h1>
                </button>
              </Link>
            </div>
            <div className="h-[4rem]">
              <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-pink-600">
                <h1 className="font-bold">Logout</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        {/* Adjust this margin-top to ensure content starts below the fixed topbar */}
        <div className="bg-pink-600 flex-1 border-2 border-black min-h-96 px-[5rem] ">
          {/* profile photo */}
          <div className="  bg-teal-600 border-2 border-black  h-[30rem] mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4  w-[34rem]">
                <h1 className=" text-4xl font-bold">Profile Photo</h1>
                <p className=" text-2xl mt-4">
                  {" "}
                  This image will appear as your profile photo
                </p>
              </div>
              <div className="flex flex-col    border-2 border-black flex-1  h-full  ">
                <div className=" flex px-4 py-4 justify-between h-full">
                  <div>
                    <div className=" pl-[2rem] pt-4 flex   h-[10rem] w-full">
                      <UploadImage />
                    </div>
                  </div>
                </div>
                <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* personal information  */}
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4 ">
                <h1 className=" text-4xl font-bold">Personal information </h1>
                <p className=" text-2xl  mt-4">
                  Upload your personal information here
                </p>
              </div>
              <div className="flex flex-col  border-2 border-black w-[50vw]   ">
                <div className=" flex px-4 py-4 justify-center h-full ">
                  <div>
                    <form className="">
                      <div className="flex flex-col items-center">
                        <div className=" flex ">
                          <div className=" flex">
                            <input
                              type="text"
                              placeholder="First Name"
                              className=" w-64 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none  mr-8"
                            />
                            <input
                              type="text"
                              placeholder="Last Name"
                              className="w-64 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                            />
                          </div>

                          <div>
                            <button className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 ml-2  bg-green-500">
                              <h1 className=" font-bold">Update </h1>
                            </button>
                          </div>
                        </div>
                        <div className=" flex ">
                          <input
                            type="email"
                            placeholder="Please Enter your Email"
                            className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                          />
                          <button className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 ml-2  bg-green-500">
                            <h1 className=" font-bold">Update </h1>
                          </button>
                        </div>
                        <div className=" flex">
                          <div className=" h-[4rem]">
                            <div className="  p-2  ml-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-green-500">
                              <h1 className=" font-bold">
                                <div className=" flex">
                                  <Check className=" mr-2" />
                                  <span>{"Your Email is Verified"}</span>
                                </div>
                              </h1>
                            </div>
                          </div>
                          <div className=" h-[4rem]">
                            <button className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-green-500">
                              <h1 className=" font-bold">Verify Your Email </h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/*user  addresss */}
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4  w-full">
                <h1 className=" text-4xl font-bold">Your Address </h1>
                <p className=" text-2xl  mt-4">
                  Upload/update your address here
                </p>
              </div>
            </div>
            <div className="  m-5 mx-10">
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
            </div>
          </div>
          {/* user card details */}
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4 ">
                <h1 className=" text-4xl font-bold">Your Card Details</h1>
                <p className=" text-2xl  mt-4">
                  Add/Update your Card information here
                </p>
              </div>
            </div>
            <div className=" m-8  flex  justify-between">
              <div>
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

                    <div className=" mt-5">
                      <StyledButton buttonName="Add Card" />
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="w-[20rem] pt-5 mr-[20rem] ">
                  <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                    Saved Cards
                  </h3>
                  {/* cardHolderName: true,
                cardExpiry: true,
                lastFourDigits: true */}
                  <div className=" mt-4">
                    {AllUserCards.map((card) => (
                      <div className="w-[40rem] h-[4rem] mt-2 text-[1rem] leading-none p-2 border-2 border-black text-black  border-b-8 border-r-4 bg-yellow-500">
                      <div className=" flex justify-between h-full">
                      <div className=" flex ">
                        <div className=" h-full">
                        <Image src="/1.jpg" width={50} height={50} alt="Logo" className=' rounded-md mr-2' />

                        </div>
                        <div className=" flex flex-col justify-between h-full ">
                      <div className=" flex">
                          <p>{card.cardHolderName}</p>
                              <div className=" flex ml-4">
                              <p>VISA </p>
                              <p> **** {card.lastFourDigits}</p>
                              </div>
                      </div>
                      <p>Expires :{card.cardExpiry} </p>
                      </div>
                      </div>
                      <div className=" flex self-center">
                      
                      <DeleteModal />

                      </div>
                      </div>
                    </div>

                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* user wallet details */}
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4 ">
                <h1 className=" text-4xl font-bold">Your Wallet Details </h1>
                <p className=" text-2xl  mt-4">
                  Upload your personal information here
                </p>
              </div>
              <div className="flex flex-col  border-2 border-black w-[50vw]  h-full  ">
                <div className=" flex px-4 py-4 justify-center h-full ">
                  <div>
                    <form className="">
                      <div className="flex flex-col items-center">
                        <div className=" flex ">
                          <input
                            type="text"
                            placeholder="First Name"
                            className=" w-64 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none  mr-8"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="w-64 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                        />

                        <div className=" flex">
                          <input
                            type="number"
                            placeholder="Enter your phone number"
                            className="w-[30rem] mr-4 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                          />
                          <div className=" h-[4rem]">
                            <div className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-green-500">
                              <h1 className=" font-bold">
                                <Check />{" "}
                              </h1>
                            </div>
                          </div>
                        </div>

                        <div className=" h-[4rem]">
                          <button className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-green-500">
                            <h1 className=" font-bold">Verify Phone Number </h1>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* password update */}
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4 ">
                <h1 className=" text-4xl font-bold">Update Password </h1>
                <p className=" text-2xl  mt-4">
                  Enter your Current Password to update it{" "}
                </p>
              </div>
              <div className="flex flex-col  border-2 border-black w-[50vw]  h-full  ">
                <div className=" flex px-4 py-4 justify-center h-full ">
                  <div>
                    <form className="">
                      <div className="flex flex-col items-center">
                        <input
                          type="password"
                          placeholder="Current pasword"
                          className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                        />

                        <input
                          type="password"
                          placeholder="New pasword"
                          className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
                  </div>
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
