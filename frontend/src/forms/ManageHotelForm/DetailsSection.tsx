import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-2">
      <h1>Add Hotel</h1>
      <label>
        Name
        <input
          type="text"
          {...register("name", { required: "name is required" })}
          className="w-full border"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>
      <div className="flex gap-10">
        <label className="flex-1">
          City{" "}
          <input
            type="text"
            {...register("city", { required: "city is required" })}
            className="w-full border"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </label>
        <label className="flex-1">
          Country
          <input
            type="text"
            {...register("country", { required: "country is required" })}
            className="w-full border"
          />
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}
        </label>
      </div>
      <label className="flex-1">
        Description
        <textarea
          {...register("description", { required: "description is required" })}
          rows={10}
          className="w-full border"
        ></textarea>
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </label>
      <label className="flex-1">
        Price Per Night{" "}
        <input
          {...register("pricePerNight", { required: "pricePerNight is required" })}
          className="w-full border"
        />
        {errors.pricePerNight && <p className="text-red-500">{errors.pricePerNight.message}</p>}
      </label>

      <label className="flex-1 max-w-[50%]">
        Star Rating{" "}
        <select
          {...register("starRating", { required: "starRating is required" })}
          className="w-full p-2 border"
        >
          <option value="">Select as Rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating && <p className="text-red-500">{errors.starRating.message}</p>}
      </label>
    </div>
  );
};

export default DetailsSection;
