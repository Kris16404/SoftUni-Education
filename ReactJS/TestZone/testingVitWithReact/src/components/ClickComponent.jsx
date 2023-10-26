import { useState } from 'react';

export default function () {
  const [click, setClick] = useState(0);

  function useClick() {
    setClick(click + 1);
  }

  return (
    <button onClick={useClick}>
      You have clikced this button {click} times
    </button>
  );
}
