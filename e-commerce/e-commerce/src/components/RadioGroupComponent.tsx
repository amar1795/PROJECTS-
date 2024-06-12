import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupComponent({ address }: { address: string[] }) {
  return (
    <RadioGroup defaultValue="comfortable">
      {address.map((address, index) => (
        <div className="flex items-center space-x-2">
          <RadioGroupItem className=" h-[2rem] w-[2rem]" value={address} id={index.toString()} />
          <Label htmlFor={index.toString() } className=" text-[1.1rem]">{address}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
