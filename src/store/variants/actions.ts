import { store } from "..";
import {
    SET_SELECTED_VARIANT_QUANTITY,
    SET_SELECTED_VARIANT_AND_VARIANT_IMAGE,
} from "./types";

export function handleQuantityChange(
    event: React.ChangeEvent<HTMLInputElement>
) {
    store.dispatch({
        type: SET_SELECTED_VARIANT_QUANTITY,
        payload: {
            selectedVariantQuantity: parseFloat(event.target.value),
        },
    });
}

export function handleOptionChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    product: ShopifyBuy.Product
) {
    const { shopify } = store.getState();
    const { client } = shopify;
    let selectedOptions: any = [];
    if(product.selectedVariant){
        const current_options:any = JSON.parse(JSON.stringify(product.selectedVariant)).selectedOptions
        console.log(current_options)

        current_options.forEach((c_option: any)=>{
            selectedOptions[c_option.name] = c_option.value
        })
    }
    else{
        product.options.forEach((selector) => {
        
            selectedOptions[selector.name] = selector.values[0].value;
        });
    }

    const target = event.target;
    selectedOptions[target.name] = target.value;
    // console.log(selectedOptions)

    if (client) {
        // const selectedVariant = client.product.variantForOptions(
        //     product,
        //     {  name: "Size",
        //     selected: "Small",
        //     values:[]
        // }
        // );
        const selectedVariant = product.variants.find((variant: ShopifyBuy.ProductVariant) => {
            const v_selectedOptions = JSON.parse(JSON.stringify(variant)).selectedOptions
            if(v_selectedOptions){
                return v_selectedOptions.every((selectedOption: any) => {
                    // console.log(selectedOptions[selectedOption.name])
                    // console.log(selectedOption.value)
                    return selectedOptions[selectedOption.name] === selectedOption.value.valueOf();
                });
            }
          });
          console.log(selectedVariant)
        // const selectedVariant = client.product.variantForOptions(
        //     product,
        //     selectedOptions
        // );

        if(selectedVariant){
            product.selectedVariant = selectedVariant
            store.dispatch({
                type: SET_SELECTED_VARIANT_AND_VARIANT_IMAGE,
                payload: {
                    selectedVariant,
                    selectedVariantImage: selectedVariant.attrs.image,
                },
            });
        }
    }
}
