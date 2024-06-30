"use client";
import {
  DollarSign,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  StarIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StarChart from "../star charts/starChart";
import Image from "next/image";
import { updatedDataResponse } from "@/app/categories/[categories]/[product]/page";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getProductReviews } from "@/actions/productRating/getProductReview";
import { set } from "zod";
import MiniStarRatingComponent from "../rating star component/MiniStarRatingComponent";
import { ReviewModal } from "../ReviewModal";
import { fetchReview } from "@/actions/productRating/fetchReview";

type CategoriesRightProps = {
  data: updatedDataResponse;
};

// Utility function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const CategoriesRight: React.FC<CategoriesRightProps> = ({
  data,
  handleWishlistToggle,
  handleClickAdd,
  handleQuantityChange,
  callToast
}) => {
  const user = useCurrentUser();

  const [reviews, setReviews] = useState([]);
  const [verifiedPurchaseCount, setVerifiedPurchaseCount] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const [newData, setNewData] = useState(true);

  if (!data) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    const fetchReviewData = async () => {
      const Data = await fetchReview({ productId: data?.id });
      // alert("fethcreviewdata is  been called")
      console.log("this is the fetchreview data", Data);
      setReviewData(Data);
    };
    fetchReviewData();
  }, [data, newData]);

  useEffect(() => {
    const getReviews = async () => {
      if (data?.id) {
        const { reviews, verifiedPurchaseCount, error } =
          await getProductReviews(data?.id);
        const value = reviews;
        setVerifiedPurchaseCount(verifiedPurchaseCount);
        setReviews(value);
        console.log(
          `this is the reviews data for the product ID ${data?.id} ${verifiedPurchaseCount}`,
          value
        );
      }
    };
    getReviews();
  }, [data, newData]);
  // brand cannot be destructured from data issue arised because the data  was null , so i added a check to see if data is null or not and display the loading message if it is null
  console.log("this is the data from categories right", data);
  const { brand, price, discountedPrice, description } = data;

  const [outOfStock, setoutOfStock] = React.useState(false);

  return (
    <div>
      <div className=" bg-teal-600  ">
        <div className=" px-4">
          <h1 className=" text-[4rem] font-bold">{data?.brand?.name}</h1>
          <h2 className=" text-[1.2rem]">{data?.name}</h2>
          <div className="star_rating flex justify-between w-[14rem] border border-black mt-5 h-[2rem]">
            <div className="star flex self-center border-r border-black pr-4">
              <div className=" pl-2">
                {data?.ratings?.averageRating.toFixed(1)}
              </div>
              <div className=" pl-2 self-center">
                <Star fill="yellow" size={18} strokeWidth={0.5} />
              </div>
            </div>
            <div className="rating self-center  pr-5">
              {data?.ratings?.totalRatings}{" "}
              <span className=" font-bold">Ratings</span>
            </div>
          </div>
          <div className=" border-b-2 border-gray-300 mt-5"></div>
          <div className=" mt-2">
            <div className=" flex  w-[35rem]  mb-2">
              <h1 className=" self-center text-[2rem]">MRP</h1>

              <div className=" flex  self-center">
                <div className=" self-center ">
                  <DollarSign size={36} />
                </div>
                <h1
                  className=" text-[2.5rem] font-bold"
                  style={{ textDecoration: "line-through" }}
                >
                  {data?.price}
                </h1>
                <h1 className=" text-[2.5rem] font-bold ml-5">
                  {data?.discountedPrice?.toFixed(2)}
                </h1>
                <h1 className=" text-[2.5rem] font-bold ml-5 text-yellow-400">
                  ({data?.discount}%OFF)
                </h1>
              </div>
            </div>
            <h3>Inclusive of all taxes</h3>

            <div className="button flex w-[15rem] justify-between mt-5">
              {!outOfStock ? (
                <div className="button flex w-[15rem] justify-between mt-4">
                  {data?.cartQuantity > 0 ? (
                    <div className=" flex self-center ">
                      <div className="box flex pr-4 self-center">
                        {/* quantity change icons */}
                        <button
                          className=" pr-2  hover:bg-gray-200 pl-1"
                          onClick={() =>
                            handleQuantityChange(user?.id, data.id, -1)
                          }
                        >
                          <Minus size={30} />
                        </button>
                        <div className=" text-[2rem] w-11  bg-white h-[2.5rem]  ">
                          <h1 className="  flex text-center justify-center align-middle  ">
                            {data?.cartQuantity || 0}
                          </h1>
                        </div>
                        <button
                          className=" pl-2  hover:bg-gray-200 pr-1"
                          onClick={() =>
                            handleQuantityChange(user?.id, data.id, 1)
                          }
                        >
                          <Plus size={30} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className=" h-[4rem]">
                      <button
                        type="submit"
                        className="w-40  p-2  border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500"
                        onClick={() => {
                          handleClickAdd(user?.id, data?.id);
                        }}
                      >
                        <h1 className=" font-bold">{"Add to Cart"} </h1>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className=" h-[4rem]">
                  <button
                    type="submit"
                    className="w-40  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500"
                  >
                    <h1 className=" font-bold">{"Out of stock"} </h1>
                  </button>
                </div>
              )}

              {!data?.isWishlisted ? (
                <div className=" h-[4rem] ml-5">
                  <button
                    type="submit"
                    className="w-60  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500"
                    onClick={() => handleWishlistToggle(user?.id, data.id)}
                  >
                    <Heart size={25} className=" mr-2" />
                    <h1 className=" font-bold">{"Wishlist this item"} </h1>
                  </button>
                </div>
              ) : (
                <div className=" h-[4rem] ml-5">
                  <button
                    type="submit"
                    className="w-60  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500"
                    onClick={() => handleWishlistToggle(user?.id, data.id)}
                  >
                    <Heart size={25} className=" mr-2" fill="red" />
                    <h1 className=" font-bold">{"Item Wishlisted"} </h1>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className=" border-b-2 border-gray-300 mt-5"></div>
          <div className="   mt-10 text-[1.2rem]">
            <h1 className=" text-[2rem] font-bold">Product Details</h1>
            {data?.description}
          </div>
          <div className=" border-b-2 border-gray-300 mt-5"></div>
          <div className="  mt-4 bg">
            <div className=" text-white  mb-14 flex flex-col ">
              <div className=" flex  pl-8">
                <div>
                  <h1 className=" text-[3rem]"> RATINGS </h1>
                </div>
                <div className=" px-5">
                  <Star
                    fill="yellow"
                    strokeWidth={0.5}
                    size={65}
                    stroke="black"
                  />
                </div>
              </div>

              <div className=" flex mt-6">
                <div className="left flex-1 border-r-2 border-gray-600 pl-8 pr-4 ">
                  <div className="">
                    <div className="top flex mt-5 mb-2">
                      <p className=" text-[5rem] leading-none m-0 p-0 font-thin ">
                        {data?.ratings?.averageRating.toFixed(1)}
                      </p>
                      <div className=" self-center ml-5">
                        <Star
                          fill="yellow"
                          size={38}
                          stroke="black"
                          strokeWidth={0.5}
                        />
                      </div>
                    </div>
                    <div className="Bottom">
                      {verifiedPurchaseCount} Verified Buyers
                    </div>
                  </div>
                </div>
                <div className=" text-black w-[5rem] pl-5  flex flex-col justify-between">
                  <p className=" flex w-5">
                    5{" "}
                    <div className=" self-center pl-2 ">
                      <Star stroke="2" fill="aqua" size={15} />
                    </div>
                  </p>
                  <p className=" flex w-5">
                    4{" "}
                    <div className=" self-center pl-2 ">
                      <Star stroke="2" fill="yellow" size={15} />
                    </div>
                  </p>
                  <p className=" flex w-5">
                    3{" "}
                    <div className=" self-center pl-2 ">
                      <Star stroke="2" fill="green" size={15} />
                    </div>
                  </p>
                  <p className=" flex w-5">
                    2{" "}
                    <div className=" self-center pl-2 ">
                      <Star stroke="2" fill="orange" size={15} />
                    </div>
                  </p>
                  <p className=" flex w-5">
                    1{" "}
                    <div className=" self-center pl-2 ">
                      <Star stroke="2" fill="red" size={15} />
                    </div>
                  </p>
                </div>

                <div className="right flex-1 pl-[14rem]  z-0">
                  <div className="  rotate-90 w-[5.5rem] h-[2rem] ">
                    <StarChart />
                  </div>
                </div>
                <div className=" text-black w-[5rem]   flex flex-col justify-between">
                  <p className=" flex w-5 pl-0">322 </p>
                  <p className=" flex w-5">21 </p>
                  <p className=" flex w-5">15 </p>
                  <p className=" flex w-5">75 </p>
                  <p className=" flex w-5">51 </p>
                </div>
              </div>
            </div>

            {/* review component */}
            <div>
              {reviewData?.review?.rating ? (
                <div className="mr-11">
                  <div className=" flex ">
                    <p>You Rated {reviewData?.review?.rating} Stars </p>
                    <div className=" self-center ml-2">
                      <MiniStarRatingComponent
                        reviewStars={reviewData?.review?.rating}
                      />
                    </div>
                  </div>

                  {reviewData?.review?.review === "" ? (
                    <ReviewModal
                      setNewData={setNewData}
                      buttonName="Add your Review"
                      reviewId={reviewData?.review?.id}
                      // ProductImage={data?.images[0]?.url}
                      ProductName={data?.name}
                      ProductId={data?.id}
                      reviewStars={reviewData?.review?.rating}
                      reviewTitle={reviewData?.review?.reviewTitle}
                      reviewMessage={reviewData?.review?.review}
                      isPaid={false}
                    />
                  ) : (
                    <div>
                      <p>Your Review is :</p>
                      <p>{reviewData?.review?.review}</p>
                      <ReviewModal
                        setNewData={setNewData}
                        reviewId={reviewData?.review?.id}
                        buttonName="Edit your Review"
                        reviewStars={reviewData?.review?.rating}
                        reviewTitle={reviewData?.review?.reviewTitle}
                        reviewMessage={reviewData?.review?.review}
                        // ProductImage={data?.images[0]?.url}
                        ProductName={data?.name}
                        ProductId={data?.id}
                        isPaid={false}
                      />
                    </div>
                  )}
                </div>
              ) : user ? (
                <div className="mr-11">
                  <ReviewModal
                    setNewData={setNewData}
                    buttonName="Rate the product"
                    reviewId={reviewData?.review?.id}
                    // ProductImage={data?.images[0]?.url}
                    ProductName={data?.name}
                    ProductId={data?.id}
                    reviewStars={reviewData?.review?.rating}
                    reviewTitle={reviewData?.review?.reviewTitle}
                    reviewMessage={reviewData?.review?.review}
                    isPaid={false}
                  />
                </div>
              ) : (
                <div className=" h-[4rem]">
                  <button
                    type="submit"
                    className="w-80  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500"
                    onClick={() => callToast({
                      variant: "destructive",
                      title: "Not Logged In",
                      description: "Please login to add the review",
                    })}
                  >
                    <h1 className=" font-bold">
                      {"please log in to give review"}{" "}
                    </h1>
                  </button>
                </div>
              )}
            </div>

            <div className="reviews border-2 border-black ">
              <div className=" cxphotos   px-4 pt-4 border-b-2 border-black">
                <div>
                  <h1 className=" text-[1.2rem] font-semibold">
                    CUSTOMER PHOTOS({reviews?.images?.length || 0})
                  </h1>
                </div>

                {reviews?.images?.length > 0 ? (
                  <div className=" flex mt-4">
                    <Image
                      src=""
                      alt="test image"
                      width={100}
                      height={100}
                      className=" bg-green-600 mr-3"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className=" text-[1.2rem] font-semibold">
                      No photos uploaded yet
                    </h1>
                  </div>
                )}
              </div>
              <div className=" cxreviews   mb-4  px-4 pt-4">
                <div className="">
                  <h1 className=" text-[1.2rem] font-semibold mb-4">
                    CUSTOMER REVIEWS({data?.ratings?.totalReviews})
                  </h1>
                  {/* review component */}
                  {reviews?.length > 0 ? (
                    reviews.map((review) => (
                      <div className=" flex border-2 border-black  bg-teal-600  min-h-28">
                        <div className=" w-[3rem] border-r-2 border-black ">
                          <div className=" flex justify-between px-2 pt-1">
                            <div>{review?.rating}</div>
                            <div className=" self-center">
                              <StarIcon size={20} stroke="" fill="white" />
                            </div>
                          </div>
                        </div>
                        <div className="  w-full flex flex-col ">
                          <p className="  h-auto px-2 py-2 border-b-2 border-black">
                            {review?.review}
                          </p>

                          {review?.images && review?.images.length > 0 && (
                            <div className=" px-2 py-2 ImageComponent">
                              <Image
                                src=""
                                alt="test image"
                                width={100}
                                height={100}
                                className=" bg-green-600 mr-3"
                              />
                            </div>
                          )}

                          <div className="  h-[3rem] flex justify-between px-2 py-2  mt-5">
                            <div className=" bg-white border-2 border-black flex self-center py-1 px-4    ">
                              <p className="border-gray-500 border-r-2 pr-2 ">
                                {review?.user?.name}
                              </p>

                              <p className=" pl-2 ">
                                {formatDate(review?.createdAt)}{" "}
                              </p>
                            </div>
                            {review?.verifiedPurchase && (
                              <div className=" bg-white border-2 border-black flex self-center py-1 px-4    ">
                                <p className="border-gray-500  pr-2 ">
                                  {"Verified "}
                                </p>
                              </div>
                            )}

                            <div>
                              <div className=" bg-white border-2 border-black flex px-2 py-1 w-[8rem] h-full self-center justify-between ">
                                <div className=" flex ">
                                  <button>
                                    <div className=" self-center">
                                      <ThumbsUp size={20} fill=" green" />
                                    </div>
                                  </button>
                                  <p className=" pl-1  text-[12px] mt-1  ">
                                    209
                                  </p>
                                </div>

                                <div className=" flex">
                                  <button>
                                    <div className=" self-center">
                                      <ThumbsDown size={20} fill=" red" />{" "}
                                    </div>
                                  </button>
                                  <p className=" pl-1  text-[12px] mt-1  ">
                                    50
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <h1 className=" text-[1.2rem] font-semibold">
                        No reviews yet
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesRight;
