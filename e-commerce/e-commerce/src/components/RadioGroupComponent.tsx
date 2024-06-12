import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type Address = {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};


// Define the format function
function formatAddress(address: Address): string {
  const { street, apartment, city, state, country, postalCode } = address;
  return `${street}${apartment ? `, ${apartment}` : ''}, ${city}, ${state} ${postalCode}, ${country}`;
}

export function RadioGroupComponent({ address }: { address: Address[]}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {address.map((address, index) => (
        <div className="flex items-center space-x-2">
          <RadioGroupItem className=" h-[2rem] w-[2rem]" value={formatAddress(address)}id={index.toString()} />
          <Label htmlFor={index.toString() } className=" text-[1.1rem]">{formatAddress(address)}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
