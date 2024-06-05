"use client"
import { DollarSign, Heart, Star, StarIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button";
import StarChart from '../star charts/starChart';
import Image from 'next/image';
import { updatedDataResponse } from '@/app/categories/[categories]/[product]/page';


type CategoriesRightProps = {
  data: updatedDataResponse;
};

const CategoriesRight: React.FC<CategoriesRightProps>  = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const { brand, price, discountedPrice, description } = data;

    const [outOfStock, setoutOfStock] = React.useState(false);
    

  return (
    <div>
       <div className=" bg-pink-500  ">
                  <div className=" px-4">
                    <h1 className=" text-[4rem] font-bold">
                      {data?.brand?.name}
                    </h1>
                    <h2 className=" text-[1.2rem]">{data?.name}</h2>
                    <div className="star_rating flex justify-between w-[14rem] border border-black mt-5 h-[2rem]">
                      <div className="star flex self-center border-r border-black pr-4">
                        <div className=" pl-2">
                          {data?.ratings?.averageRating}
                        </div>
                        <div className=" pl-2 self-center">
                          <Star fill="black" size={18} />
                        </div>
                      </div>
                      <div className="rating self-center  pr-5">
                        {data?.ratings?.totalRatings} <span className=" font-bold">
                        Ratings
                        </span>
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
                          <h1 className=" text-[2.5rem] font-bold" style={{ textDecoration: 'line-through' }}>{data?.price}</h1>
                          <h1 className=" text-[2.5rem] font-bold ml-5" >{data?.discountedPrice?.toFixed(2)}</h1>
                          <h1 className=" text-[2.5rem] font-bold ml-5" >({data?.discount}%OFF)</h1>
                        </div>
                      </div>
                      <h3>Inclusive of all taxes</h3>

                      <div className="button flex w-[15rem] justify-between mt-5">
                        {!outOfStock ? (
                          <div>
                            <Button>Buy Now</Button>
                          </div>
                        ) : (
                          <div>
                            <Button
                              variant="destructive"
                              className="pointer-events-none "
                            >
                              Out of Stock
                            </Button>
                          </div>
                        )}

                        <div className=" ml-4">
                          <Button className=" w-[8rem]">
                            <Heart size={18} className=" mr-2" />
                            Wishlist
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className=" border-b-2 border-gray-300 mt-5"></div>
                    <div className="   mt-10 text-[1.2rem]">
                      <h1 className=" text-[2rem] font-bold">Product Details</h1>
                     {data?.description}
                    </div>
                    <div className=" border-b-2 border-gray-300 mt-5"></div>
                    <div className=" h-[30rem]  mt-10">
                      <div className=" text-white h-[15rem] flex flex-col ">
                        <div className=" flex mt-5 pl-8">
                          <div>
                            <h1> RATINGS </h1>
                          </div>
                          <div className=" px-5">
                            <Star fill="aqua" stroke="0.5" />
                          </div>
                        </div>

                        <div className=" flex mt-6">
                          <div className="left flex-1 border-r-2 border-gray-600 pl-8 pr-4 ">
                            <div className="">
                              <div className="top flex mt-5 mb-2">
                                <p className=" text-[5rem] leading-none m-0 p-0 font-thin ">
                                  3.6{" "}
                                </p>
                                <div className=" self-center ml-5">
                                  <Star fill="aqua" size={38} stroke="0.5" />
                                </div>
                              </div>
                              <div className="Bottom">789 Verified Buyers</div>
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

                      <div className=" border-b-2 border-gray-300 mt-5"></div>
                      <div className="reviews bg-violet-700 h-[15rem]  ">
                        <div className=" cxphotos bg-pink-600 h-[12rem] px-4 pt-4">
                          <div>
                            <h1 className=" text-[1.2rem] font-semibold">
                              CUSTOMER PHOTOS(1299)
                            </h1>
                          </div>
                          <div className=" flex mt-4">
                            <Image
                              src=""
                              alt="test image"
                              width={100}
                              height={100}
                              className=" bg-green-600 mr-3"
                            />
                            <Image
                              src=""
                              alt="test image"
                              width={100}
                              height={100}
                              className=" bg-green-600 mr-3"
                            />
                            <Image
                              src=""
                              alt="test image"
                              width={100}
                              height={100}
                              className=" bg-green-600 mr-3"
                            />
                            <Image
                              src=""
                              alt="test image"
                              width={100}
                              height={100}
                              className=" bg-green-600 mr-3"
                            />
                          </div>
                        </div>
                        <div className=" border-b-2 border-gray-300 "></div>
                        <div className=" cxreviews bg-yellow-500 h-[20rem]  px-4 pt-4">
                          <div>
                            <h1 className=" text-[1.2rem] font-semibold">
                              CUSTOMER REVIEWS({data?.ratings?.totalReviews})
                            </h1>
                            {/* review component */}
                            <div className=" flex ">
                              <div className=" w-[3rem] ">
                                <div className=" flex justify-between px-2 pt-1">
                                  <div>5</div>
                                  <div className=" self-center">
                                    <StarIcon
                                      size={20}
                                      stroke=""
                                      fill="white"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="  w-full flex flex-col">
                                <p className=" bg-green-300 h-auto px-2 py-2">
                                  Lorem ipsum, dolor sit amet consectetur
                                  adipisicing elit. Perspiciatis similique
                                  numquam aperiam tempore debitis culpa, unde
                                  laboriosam cumque iusto, inventore magnam
                                  quod? Exercitationem atque ad dolorum
                                  voluptatum pariatur vero enim?
                                </p>

                                <div className=" px-2 py-2 ImageComponent">
                                  <Image
                                    src=""
                                    alt="test image"
                                    width={100}
                                    height={100}
                                    className=" bg-green-600 mr-3"
                                  />
                                </div>
                                <div className=" bg-yellow-800 h-[3rem] flex justify-between px-2 py-2 ">
                                  <div className=" bg-white flex self-center py-1 px-4  text-gray-400  ">
                                    <p className="border-gray-500 border-r-2 pr-2 ">
                                      John Doe
                                    </p>

                                    <p className=" pl-2 ">17 May 2024 </p>
                                  </div>
                                  <div>
                                    <div className=" bg-white flex px-2 py-1 w-[8rem] h-full self-center justify-between ">
                                      <div className=" flex ">
                                        <button>
                                          <div className=" self-center">
                                            <ThumbsUp size={20} />
                                          </div>
                                        </button>
                                        <p className=" pl-1  text-[12px] mt-1  text-gray-400">
                                          209
                                        </p>
                                      </div>

                                      <div className=" flex">
                                        <button>
                                          <div className=" self-center">
                                            <ThumbsDown size={20} />{" "}
                                          </div>
                                        </button>
                                        <p className=" pl-1  text-[12px] mt-1  text-gray-400">
                                          50
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default CategoriesRight
