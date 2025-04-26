import { ReactNode, CSSProperties } from 'react';
import backgroundImage from '@/assets/background.jpg';

export const FullScreenContainer = (props: { children: ReactNode }) => {
  const { children } = props;

  const style: CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1
  };


  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  return (
    <>
      <div style={style}>
        <div style={overlayStyle}>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex:2 }}>{children}</div>
    </>
  );
};

export default FullScreenContainer;