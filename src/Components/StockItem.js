import React, { Component } from 'react'
import styled from "styled-components";
import { Li } from '../APIs/Landin2';

const StockItem = (props) => (<div>{props.data.name}: {props.data.symbol}</div>);

export default StockItem;