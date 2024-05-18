import React from 'react';

const MainFooter = () => {
  type SiteData = {
    [key: string]: string[];
  };

  const siteData:SiteData = {
    products: ["Men", "Women", "Kids"],
    collection: ["New Arrival", "Best Seller"],
    info: ["About Us", "Press", "Wishlist", "Contact Us"],
    support: ["Store Locator", "Size Chart", "FAQs", "Delivery", "Returns and Refunds"],
    follows: ["Facebook", "Instagram", "Twitter", "Pinterest", "TikTok", "YouTube"]
  };

  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.keys(siteData).map((key) => (
          <div key={key} className="flex flex-col">
            <h1 className="font-bold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h1>
            {siteData[key].map((item, index) => (
              <button key={index} className="text-left mb-1 hover:text-gray-300 focus:outline-none">
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainFooter;
