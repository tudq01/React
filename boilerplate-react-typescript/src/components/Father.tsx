import React from 'react';

type Props = {
  children: JSX.Element;
};
const Father = ({children}:Props) => {

    return (
      <div className="father">
        {children}
        <h1>Father</h1>
      </div>
    );

}

export default Father;