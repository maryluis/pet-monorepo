import { Vortex } from 'react-loader-spinner';

export const Loader = () => {
  return (<Vortex
    visible={true}
    height="45"
    width="45"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />);
};

export const BigLoader = () => {
  return (<Vortex
    visible={true}
    height="85"
    width="85"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />);
};

export default Loader;
