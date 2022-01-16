import * as React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.i`
  color: #fff;
  cursor: pointer;
`;

const loginFooter = () => {
  return (
    <div
      className='d-flex justify-content-between align-items-center p-3 px-5 text-white'
      style={{ backgroundColor: '#193498' }}>
      <div>Copyright © 2021. All rights reserved</div>
      <div
        className='d-flex w-25 justify-content-between'
        style={{ fontSize: '2.3rem' }}>
        <div>
          <StyledIcon className='fab fa-facebook' />
        </div>
        <div>
          <StyledIcon className='fab fa-google-plus-g' />
        </div>
        <div>
          <StyledIcon className='fab fa-linkedin' />
        </div>
        <div>
          <StyledIcon className='fab fa-twitter' />
        </div>
      </div>
    </div>
  );
};

export default loginFooter;
