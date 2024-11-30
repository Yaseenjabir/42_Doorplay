import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router";
import ReviewForm from "./ReviewForm";
import { DoorSchema, ReviewModel, UserModel } from "../../utils/utils";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useStore from "../../store/Store";

interface ReviewInterface {
  singleDoor: DoorSchema;
  reviews: ReviewModel[] | undefined;
  setReviews: Dispatch<SetStateAction<ReviewModel[] | undefined>>;
}

const Review: React.FC<ReviewInterface> = ({
  singleDoor,
  reviews,
  setReviews,
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel | undefined>();
  const triggerForm = useRef<HTMLButtonElement | null>(null);
  const [selectedDoor, setSelectedDoor] = useState<DoorSchema | undefined>();

  const { globalReviews } = useStore();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);
    if (parsedUser) {
      setUser(parsedUser.user);
      setSelectedDoor(singleDoor);
    }
  }, []);

  useEffect(() => {
    if (singleDoor) {
      const fetchReviews = async () => {
        try {
          const filteredData = globalReviews.filter(
            (item) => item.door._id === singleDoor?._id
          );
          if (filteredData) {
            setReviews(filteredData);
          }
        } catch (ex: unknown) {
          if (ex instanceof AxiosError) {
            if (ex.response?.data.message) {
              toast.error(ex.response.data.message);
              return;
            }
            if (ex.response && ex.response.data && ex.response.data.error) {
              toast.error(ex.response.data.error);
              return;
            }
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
      };
      fetchReviews();
    }
  }, [singleDoor, globalReviews]);

  return (
    <div className="w-full mt-10 lg:w-[70%]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-semibold text-titleColor">
          Reviews({reviews && reviews?.length > 0 ? reviews?.length : 0})
        </h1>
        {user && user.userRole === "admin" ? (
          <button
            onClick={() => triggerForm.current?.click()}
            className="py-2 px-4 bg-darkRed border-[2px] border-darkRed rounded-md text-white hover:bg-transparent hover:text-darkRed transition-all ease-in-out duration-200 text-nowrap"
          >
            Write a review
          </button>
        ) : (
          <p
            onClick={() => {
              const user = sessionStorage.getItem("user");
              const parsedUser = user && JSON.parse(user);
              if (!parsedUser) navigate("/auth?location=review");
            }}
            className="underline cursor-pointer"
          >
            Login to add review
          </p>
        )}
      </div>
      {reviews && reviews.length > 0 && (
        <div className="w-full flex flex-col mt-5 gap-12  lg:grid lg:grid-cols-2 lg:mt-10">
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review) => {
              return (
                <div key={review._id} className="w-full flex flex-col gap-2">
                  <div className="flex text-3xl text-yellow-400 gap-1">
                    {[...Array(5)].map((_, index) => {
                      const isFilled = index < review.rating;
                      return (
                        <IoMdStar
                          key={index}
                          className={
                            isFilled ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      );
                    })}
                  </div>
                  <h1 className="text-gray-800 font-bold md:text-lg">
                    "{review.title}"
                  </h1>
                  <p className="text-gray-500 md:text-xl">
                    {review.description}
                    {/* <span className="text-gray-700 cursor-pointer hover:underline">
                      Read More
                    </span> */}
                  </p>

                  <div className="flex gap-1 text-gray-600 text-sm mt-4 md:text-lg">
                    <span className="font-semibold text-gray-800">by</span>
                    <span>-</span>
                    <span>{review.name}</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <ReviewForm
        setSelectedDoor={setSelectedDoor}
        setReviews={setReviews}
        triggerForm={triggerForm}
        selectedDoor={selectedDoor}
      />
    </div>
  );
};

export default Review;
