import React, { Component } from 'react';

export type ProductProps = {
    product?: {images:any, title:string};
    key?: number;
};

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}
export const Product = (props: ProductProps): JSX.Element =>{
    const { key, product } = props;
    // const {images, title} = product
    console.log(product);


    return (
      <div className="Product">
        {/* <img src={product?.images.edges[0].node.src} /> */}
        <h2>{product?.title}</h2>
      </div>
    );
}
