import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <>
      <h1>Facilities</h1>
      <div className="grid grid-cols-5">
        {hotelFacilities.map((facility) => (
          <label className="">
            <input
              value={facility}
              type="checkbox"
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>

      {errors.facilities && <p className="text-red-500">{errors.facilities.message}</p>}
    </>
  );
};

export default FacilitiesSection;
