import { Spinner } from '@chakra-ui/react'

const SpinnerComponent = () => {
  return (
    <div data-testid="spinner-component" className="spinner">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </div>
  );
};


export default SpinnerComponent;
