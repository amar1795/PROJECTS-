"use client";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { ResetSchema } from "@/schemas";
import { Reset } from "@/actions/email/reset-password";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import StarRatingComponent from "./rating star component/StarRatingComponent";
import Image from "next/image";

export function ReviewModal({
  buttonName,
  ProductImage,
  ProductName,
}: {
  buttonName: string;
}) {
  const { toast } = useToast();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [Modalerror, setModalError] = useState<string | undefined>("");
  const [Modalsuccess, setModalSuccess] = useState<string | undefined>("");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array

    // Extract file names from the array of files
    const fileNames = files.map((file) => file.name);

    // Update state with selected file names
    setSelectedFiles(fileNames);

    // Optionally, you can also handle other file details here if needed
    console.log("Selected files:", files);
  };
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  // toast is not working inside the modal need to check

  // console.log("this is callback url", callbackUrl);

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setModalError("");
    setModalSuccess("");

    startTransition(() => {
      Reset(values)
        .then((data) => {
          if (data?.error) {
            reset();
            setModalError(data.error);

            // setModalErrorToast(data.error);
          }

          if (data?.success) {
            reset();
            // alert("Password reset link sent! Password rest link has been sent to your email address. Please check your email to reset your password.");
            setModalSuccess(data.success);
            // toast({
            //   title: "Password reset link sent!",
            //   description:
            //     "Password rest link has been sent to your email address. Please check your email to reset your password.",
            // });
            // setTimeout(() => {
            //   router.push('/password-reset'); // Replace with your target page URL
            // }, 2000); // 2000 milliseconds = 2 seconds
          }
        })
        .catch(() => setModalError("Something went wrong"));
    });
  };

  useEffect(() => {
    if (Modalerror) {
      // alert(error);
      toast({
        title: `${Modalerror}`,
        description:
          "Password rest link has been sent to your email address. Please check your email to reset your password.",
      });
    }
    if (Modalsuccess) {
      // alert(success);
      toast({
        title: `${Modalsuccess}`,
        description:
          "Password rest link has been sent to your email address. Please check your email to reset your password.",
      });
    }
  }, [Modalerror, Modalsuccess]);

  // Function to handle modal close
  const handleModalClose = () => {
    setIsOpen(false);
    setModalError("");
    setModalSuccess("");
    setSelectedFiles([]); // Clear selected files state
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setModalError("");
          setModalSuccess("");
          handleModalClose(); // Reset state when modal closes
        }
      }}
    >
      <div>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
          <button className="w-auto p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-teal-600">
            <h1 className=" font-bold">{buttonName} </h1>
          </button>
        </DialogTrigger>
        <DialogContent className=" h-[41rem] ">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className=" flex">
                  <div className="w-[4rem] overflow-hidden h-[4rem] border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 text-[1.1rem]  ">
                    <Image
                      src={ProductImage}
                      width={100}
                      height={100}
                      className=" h-[5.5rem]  object-contain "
                    />
                  </div>
                  <h1 className=" h-[4rem] border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 pt-4 text-[1.1rem]  bg-yellow-400">
                    {ProductName}
                  </h1>
                </div>
              </DialogTitle>
              {/* <DialogDescription>
                Please Enter your Email address registered with us and we will
                send you a link to reset your password
              </DialogDescription> */}
            </DialogHeader>
            <div className=" main flex bg-green-300 h-[30rem]  border-2 border-black border-b-8 border-r-4">
              <div className=" left flex-1 pl-5">
                <div>
                  <div>
                    <h1 className="w-[25rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4   bg-yellow-400">
                      <h1 className=" font-bold text-[1.5rem]">
                        How would you rate it ?
                      </h1>
                    </h1>
                  </div>
                  <div className=" flex mt-2 ml-8">
                    <StarRatingComponent />
                  </div>
                </div>

                <div className=" mt-2">
                  <div>
                    <h1 className="w-[25rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4   bg-yellow-400">
                      <h1 className=" font-bold text-[1.5rem]">
                        Share the Photos{" "}
                      </h1>
                    </h1>
                  </div>
                  <div className="">
                    {/* <div >
                     
                      <input
                        type="file"
                        placeholder="Upload your Photos"
                        {...registerField("email")}
                        className=" w-[25rem] h-[6rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none pt-8 pl-14 "
                      />
                    
                    </div> */}
                    <div className=" flex">
                      <div className=" w-[22rem] mt-7">
                        <label
                          htmlFor="fileInput"
                          className="relative cursor-pointer  h-[6rem] p-2 border-2 border-black bg-white text-black mt-4 flex justify-center items-center border-b-8 border-r-4 focus:outline-none"
                        >
                          <Camera size={50} strokeWidth={1} />

                          {selectedFiles.length > 0 ? (
                            <span className="ml-8">Images Selected</span>
                          ) : (
                            <span className="ml-8">Upload your Photos</span>
                          )}

                          <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            multiple // Allow multiple file selection
                          />
                        </label>
                      </div>

                      {/* Container with white background for selected file names */}
                      <div className=" pl-2">
                        {selectedFiles.length > 0 && (
                          <div className=" mr-2 ">
                            <h2 className="text-xl font-bold mt-2 ">
                              Selected Files:
                            </h2>
                            <div className="bg-white p-4 border border-gray-200 shadow-md mt-2 h-[6rem] overflow-y-auto">
                              <ul className="list-disc list-inside">
                                {selectedFiles.map((fileName, index) => (
                                  <li key={index}>{fileName}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" right flex-1">
                <div>
                  <div>
                    <h1 className="w-[30rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4   bg-yellow-400">
                      <h1 className=" font-bold text-[1.5rem]">
                        Title your Review
                      </h1>
                    </h1>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Whats most important to know?"
                     
                      className=" w-[30rem] h-[3rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <h1 className="w-[30rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4   bg-yellow-400">
                      <h1 className=" font-bold text-[1.5rem]">
                        Write your Review
                      </h1>
                    </h1>
                  </div>
                  <div>
                    <textarea
                      placeholder="What did you like or dislike? What did you use this product for?"
                      
                      className=" w-[30rem] h-[13.5rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className=" text-2xl font-bold">
                  Email
                </Label>
                <input
                  type="text"
                  placeholder="Please enter your Email "
                  {...registerField("email")}
                  className="w-[18rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
              </div>
              {errors.email && (
                <span className=" italic text-red-950  text-[1.1rem]">
                  {errors.email.message}
                </span>
              )}
              {Modalerror && (
                <span className=" italic text-red-950  text-[1.1rem]">
                  {Modalerror}
                </span>
              )}
              {Modalsuccess && (
                <span className=" italic text-yellow-600  text-[1.1rem]">
                  {Modalsuccess} {"Please check your email for the reset link"}
                </span>
              )}
            </div> */}
            <div>
              {/* {success && (
                <p className="text-sm text-gray-500">
                  We have sent a link to reset your password to your email
                  address .
                </p>
              )} */}
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="w-[12rem] h-[3rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-yellow-400"
              >
                <h1 className=" font-bold">Submit </h1>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
