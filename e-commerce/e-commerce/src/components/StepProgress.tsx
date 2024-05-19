import { Steps } from 'rsuite';
import 'rsuite/Steps/styles/index.css';

import React from 'react'

const StepProgress = () => {
  return (
    <div>
       <Steps current={1} >
    <Steps.Item title="Order Confirmed"  description=" 19 May 2024" />
    <Steps.Item title="order Packed"  />
    <Steps.Item title="Order Dispatched"/>
    <Steps.Item title="Delivered"  />
  </Steps>
    </div>
  )
}

export default StepProgress
