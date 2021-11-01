// import React from 'react'
// import s from './Music.module.css'

// const Music = () => {
//     return (
//         <div>
//             Some awesome music
//             <div>The Best of The Killers!!!!</div>
//         </div>
//     )
// }

// export default Music

import * as React from 'react';

type PropsType = {
  name: string;
  enthusiasmLevel?: number;
}

const Music: React.FC<PropsType> = ({ name='Alex', enthusiasmLevel = 2 }) => {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
}
// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

 export default Music