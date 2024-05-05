import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const CategoriesDropdown = () => {

  return (
        <div className=" px-4">
      <DropdownMenu>
  <DropdownMenuTrigger>All
  <DropdownMenuContent>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenuTrigger>
</DropdownMenu>

    </div>
  
  )
}

export default CategoriesDropdown
