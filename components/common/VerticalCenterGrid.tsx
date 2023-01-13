import React from 'react'
import {Grid, GridProps} from '@mui/material'
import styled from "@emotion/styled";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

export default function VerticalCenterGrid(props: GridProps) {
  return (
    <StyledGrid {...props} />
  )
};

