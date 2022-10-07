import { Box, Typography } from "@mui/material";
import styled from "@mui/styles/styled";
import * as React from "react";
import { Option, OptionValue } from "shopify-buy";
import { handleOptionChange } from "../../store/variants/actions";

interface IVariantSelectorProps {
  option: Option
}

const VariantContainer = styled(Box)(()=>({
  maxHeight: 50,
  display: 'flex',
  
  
  // [theme.breakpoints.down('md')]: {
  //     paddingLeft: 8,
  // },
}))

export default function VariantSelector(props: IVariantSelectorProps) {
  const { option } = props;
  return (
    <VariantContainer>
      <Typography className="variantLabel">{option.name}: </Typography>
      <select
        className="Product__option"
        name={option.name}
        key={option.name}
        onChange={(event) => handleOptionChange}
      >
        {option.values.map((value: OptionValue) => {
          return (
            <option
              value={value.value}
              key={`${option.name}-${value}`}
            // >{`${value.name}`}</option>
            >{`${value.value}`}</option>
          );
        })}
      </select>
    </VariantContainer>
  );
}
