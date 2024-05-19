"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   RegisterCircleInputClient,
//   registerCircleSchemaClient,
// } from "@/schema/circle.schema";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}
const registerCircleSchemaClient = z.object({
  circle_image: z
    .any()
    .refine((file) => file?.length == 1, "Photo is required.")
    .refine((file) => file[0]?.size <= 3000000),
});

type RegisterCircleInputClient = { circle_image: string };

export default function UploadImage() {
  const [preview, setPreview] = useState("");
  const form = useForm<RegisterCircleInputClient>({
    mode: "onSubmit",
    resolver: zodResolver(registerCircleSchemaClient),
  });

  function submitCircleRegistration(value: RegisterCircleInputClient) {
    console.log({ value });
  }

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(submitCircleRegistration)}
        >
          <Avatar className="w-24 h-24">
            <AvatarImage src={preview} />
            <AvatarFallback>Your Image</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="circle_image"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  
                  <FormControl>
                  
                    <Input
                      type="file"
                      {...rest}
                      className="w-auto"
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files);
                      }}
                    />
                    
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className="h-[4rem]">
                    <button type="submit" className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                      <h1 className="font-bold">Save</h1>
                    </button>
                  </div>
        </form>
      </Form>
    </>
  );
}
