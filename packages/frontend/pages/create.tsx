import MainHeader from "@/components/MainHeader";
import { ProductFormData } from "@/types"; // Adjust the import path as needed
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import { ChevronLeft, ChevronRight, Loader, SendHorizonal } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx"; // Import clsx for conditional class names
import CategorySelector from "@/components/Selectors/CategorySelector"; // Adjust the import path as needed
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/router";

const CreateProduct: React.FC = () => {
  const mutation = useWriteContract();

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const router = useRouter();

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Handle form submission logic

      await mutation.writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "addMenuItem",
        args: [
          data.productName,
          data.description,
          data.image,
          data.price,
          data.category,
          data.stock,
        ],
      });

      if (mutation.isSuccess) {
        toast.success(
          `Product created successfully 🎉 Tx: ${mutation.data.slice(
            0,
            4
          )}...${mutation.data.slice(-4)}`
        );
        reset(); // Reset the form fields
        router.push("/"); // Redirect to the home page
      }

      if (mutation.isError) {
        toast.error("Failed to create product");
      }
    } catch (error) {
      toast.error("An error occurred while creating the product");
    }
  };

  const handleCategorySelect = (category: {
    id: number;
    name: string;
    icon: string;
  }) => {
    setValue("category", category.id);
  };

  return (
    <div className="flex flex-1 h-full flex-col mt-14">
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-4">
        <Field>
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2">Image</Label>
            <Input
              className={clsx(
                "w-full border rounded-sm h-10 p-4 outline-none text-sm",
                { "border-red-500": errors.image }
              )}
              {...register("image", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2">Product Name</Label>
            <Input
              className={clsx(
                "w-full border rounded-sm h-10 p-4 outline-none text-sm",
                { "border-red-500": errors.productName }
              )}
              {...register("productName", {
                required: true,
              })}
            />
          </div>

          {/* description */}
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2">
              Short description
            </Label>
            <Textarea
              className={clsx(
                "w-full border rounded-sm px-4 text-sm py-2 outline-none h-24",
                { "border-red-500": errors.description }
              )}
              {...register("description", {
                required: true,
              })}
            />
          </div>

          {/* Price and Stock */}
          <div className="flex flex-row items-center w-full gap-x-3">
            <div className="flex flex-row items-center w-full">
              <div className="flex flex-col w-full">
                <Label className="text-xs font-medium mb-2">Price</Label>
                <div className="flex flex-row items-center w-full">
                  <div className="flex h-10 rounded-l-sm w-16 border-l bg-neutral-50 border-y items-center justify-center">
                    <h1 className="text-base font-semibold ">$</h1>
                  </div>
                  <Input
                    type="number"
                    className={clsx(
                      "w-full border rounded-r rounded-y h-10 p-4 outline-none text-sm",
                      { "border-red-500": errors.price }
                    )}
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center w-full">
              <div className="flex flex-col w-full">
                <Label className="text-xs font-medium mb-2">Stock</Label>
                <div className="flex flex-row items-center w-full">
                  <Input
                    type="number"
                    className={clsx(
                      "w-full border rounded-sm h-10 p-4 outline-none text-sm",
                      { "border-red-500": errors.stock }
                    )}
                    {...register("stock", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col w-full my-4">
            <Label className="text-xs font-medium mb-2">Category</Label>
            <CategorySelector onSelect={handleCategorySelect} />
            <Input
              type="hidden"
              {...register("category", {
                required: true,
              })}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-10 my-5 text-sm text-white font-semibold flex flex-row items-center justify-center bg-green-500 w-full rounded-sm"
          >
            {mutation.isPending ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <div className="flex flex-row items-center">
                <p className="mr-2">Save</p>
                <SendHorizonal size={18} />
              </div>
            )}
          </Button>
        </Field>
      </form>
    </div>
  );
};

export default CreateProduct;
