import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../config/hotel-options-config";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");
  return (
    <div className="flex flex-col gap-2">
      <h2>Type</h2>
      <div className="grid grid-cols-5">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "bg-gray-300 border px-4 py-2 rounded-full text-sm font-semibold cursor-pointer"
                : "bg-blue-300 border px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-200"
            }
          >
            {type}{" "}
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", { required: "type is required" })}
            />
          </label>
        ))}
      </div>
      {errors.type && <p className="text-red-500">{errors.type.message}</p>}
    </div>
  );
};

export default TypeSection;
