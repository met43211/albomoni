import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
      <Spinner />
    </div>
  );
}
