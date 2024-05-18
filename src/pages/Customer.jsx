import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "../components/ProductNotFound";
import ProductCard from "../components/ProductCard";
import LargeLoading from "../components/LargeLoading";

const Customer = ({ product }) => {
  const [customer, setCustomer] = useState(null);
  const [customerProduct, setCustomerProduct] = useState(null);
  const { customer_name } = useParams();

  console.log(customer_name);
  useEffect(() => {
    function formatUsername(username) {
      const words = username.split("%20");

      const formattedName = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return formattedName;
    }

    function findCustomerAndProductsByName(customerName) {
      // Find the customer profile
      const customerProfile = product.find(
        (item) => item.customer.name === customerName,
      )?.customer;

      // Find all products associated with this customer
      const products = product.filter(
        (item) => item.customer.name === customerName,
      );

      console.log(product);

      return {
        customerProfile,
        products,
      };
    }

    const formattedUsername = formatUsername(customer_name);
    const result = findCustomerAndProductsByName(formattedUsername);
    setCustomerProduct(result.products);
    setCustomer(result.customerProfile);
  }, [customer, customer_name, product]);

  return (
    <div>
      {customer ? (
        <div className="customer-page">
          <div className="page-profile">
            <div className="page-img">
              <img src={customer.profile_image} alt="" srcset="" />
            </div>
            <div className="page-contact">
              <h2>{customer.name}</h2>
              {/* <div className="page-contact-list">
                <i class="fas fa-envelope"></i>
                <p>{customer.email}</p>
              </div> */}
              <div className="page-contact-list">
                <i class="fas fa-map-marker-alt"></i>
                <p>{customer.location}</p>
              </div>
              <div className="page-contact-list">
                <i class="fas fa-phone"></i>
                <p>0{customer.phone}</p>
              </div>
              <div className="action-buttons">
                <button className="medium-size">Message</button>
                <button className="medium-size contact-btn">Contact</button>
              </div>
            </div>
          </div>
          <section className="customer-product-list">
            {customerProduct ? (
              customerProduct.map((product) => (
                <ProductCard product={product} />
              ))
            ) : (
              <ProductNotFound />
            )}
          </section>
        </div>
      ) : (
        <LargeLoading />
      )}
    </div>
  );
};

export default Customer;
