import React from 'react'

const PlayAgainButton = (props) => {

    const { playAgain } = props;

    return (
        <button onClick={() => {playAgain()}} className='border-[1px] border-cyan-500 rounded-md py-2 px-4 hover:bg-cyan-700 hover:bg-opacity-20 transition-all duration-200'>
            <p>Play Again!</p>
        </button>
    )
}

export default PlayAgainButton
