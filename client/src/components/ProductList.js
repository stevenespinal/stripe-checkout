import React from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import formatProductPrice from "../utils/formatProductPrice";

export default function ProductList() {
    const {data: products, isLoading} = useQuery('Products', async () => {
        try {
            const res = await axios.get(`/api/products`);
            return res.data.products;
        } catch (error) {
            console.error(error.message);
        }
    })

    return !isLoading ? products.map(product => (
        <ProductItem key={product.id} product={product}/>
    )) : <LoadingSpinner/>;
}

function ProductItem({product}) {
    const formattedPrice = formatProductPrice(product);
    const {id, image, name, category, description} = product;
    return (
        <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <Link to={`/${id}`}>
                    <img
                        className="lg:h-96 md:h-36 w-full object-cover object-center"
                        src={image}
                        alt={name}
                    />
                </Link>
                <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        {category}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                        {name}
                    </h1>
                    <p className="leading-relaxed mb-3">{description}</p>
                    <div className="flex items-center flex-wrap ">
                        <Link to={`/${id}`} className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">
                            See More
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        <span
                            className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-lg pr-3 py-1 border-gray-800 font-bold">
              {formattedPrice}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
