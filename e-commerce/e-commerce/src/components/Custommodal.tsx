import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomModal({buttonName}:{buttonName:string}) {
  return (
    <Dialog >
     <div>
         <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className="w-auto p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-yellow-400">
                    <h1 className=" font-bold">{buttonName} </h1>
                  </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle><h1  className="w-[12rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4   bg-yellow-400">
                    <h1 className=" font-bold">Forgot Password </h1>
                  </h1></DialogTitle>
          <DialogDescription>
            Please Enter your Email address registered with us and we will send you a link to reset your password
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className=" text-2xl font-bold">
              Email
            </Label>
            <input
                  type="text"
                  placeholder="Please enter your Email "
                  className="w-[18rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
          </div>
          
        </div>
        <div>
            <p className="text-sm text-gray-500">
                We have sent a link to reset your password to your email address .
            </p>
        </div>
        <DialogFooter>
        <button type="submit" className="w-[12rem] h-[3rem]  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-yellow-400">
                    <h1 className=" font-bold">Submit </h1>
                  </button>
        </DialogFooter>
      </DialogContent>
     </div>
    </Dialog>
  )
}
