import {
  Button,
  Description,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import MainHeader from "@/components/MainHeader";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SendHorizonal,
} from "lucide-react";

const CreateProduct = () => {
  return (
    <div className="flex flex-1 h-full flex-col mt-14  ">
      <MainHeader back />

      <div className="flex flex-row w-full mt-3 items-center justify-between px-4">
        <div className="flex w-full">
          <h1 className="text-base font-semibold">Create item</h1>
        </div>

        <div className="flex flex-row w-full gap-x-2 items-center justify-end text-orange-500">
          <ChevronLeft size={15} />
          <ChevronRight size={15} />
        </div>
      </div>

      <div className="flex flex-col px-4">
        <Field>
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2 ">Product Name</Label>
            <Input className="w-full border rounded-sm h-10 p-4 outline-none text-sm" />
          </div>

          {/* description */}
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2 ">
              Short description
            </Label>
            <Textarea className="w-full border rounded-sm  px-4 outline-none h-36" />
          </div>

          {/* Price */}
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2 ">Price</Label>

            <div className="flex flex-row items-center w-1/2">
              <div className="flex h-10 rounded-l-sm w-16 border-l bg-neutral-50 border-y items-center justify-center">
                <h1 className="text-base font-semibold ">$</h1>
              </div>
              <Input
                type="number"
                className="w-full border rounded-r rounded-y h-10 p-4 outline-none text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2 ">Category</Label>

            <div className="flex flex-row items-center w-1/2">
              <div className="w-full border rounded-l rounded-y h-10 p-4 outline-none text-sm flex items-center">
                <h1>🍹 Drinks</h1>
              </div>
              <div className="flex h-10 rounded-r-sm w-16 border-r bg-neutral-50 border-y items-center justify-center">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <Button className="h-10 my-5 text-sm text-white font-semibold flex flex-row items-center justify-center bg-green-500 w-full rounded-sm">
            <div className="flex flex-row items-center">
              <p className="mr-2">Save</p>
              <SendHorizonal size={18} />
            </div>
          </Button>
        </Field>
      </div>
    </div>
  );
};

export default CreateProduct;
