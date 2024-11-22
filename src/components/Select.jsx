import React, { useEffect } from 'react'
import PlayAgainButton from './PlayAgainButton';

const Select = (props) => {
    const { role, setRole, setOtherRole, otherRole, currentRole, setCurrentRole, gameProgress, setGameProgress } = props;
    function playAgain() {
        setRole("");
        setOtherRole("");
        setCurrentRole("");
        setGameProgress("start");
    }

    useEffect(() => {
        const handleSetRole = () => {
            setCurrentRole(role);
            role === "X" ? setOtherRole("O") : role === "O" ? setOtherRole("X") : role !== "X" || role !== "X" && role !== "O" ?
                console.error("Error in selecting players") : console.error("Functional Error")
            console.log("role", role, " ", otherRole)
            setGameProgress("pending")
        }
        handleSetRole()
    }, [role, otherRole])



    return (
        <>
            <div className='flex space-x-12 my-6'>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <button className={'border-solid  border-cyan-700 border-2 px-4 py-2 rounded-md shadow-md hover:bg-cyan-700 hover:bg-opacity-20 transition-all duration-200' + (role.length > 0 ? ' hidden ' : " animate-pulse ")} value={"X"}
                        onClick={() => { setRole("X"); }}
                        disabled={role.length > 0}
                    >
                        <p>X</p>
                    </button>
                    <i className={role.length > 0 ? "hidden" : "fa-solid fa-caret-up animate-bounce"}></i>
                </div>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <button className={'border-solid  border-cyan-700 border-2 px-4 py-2 rounded-md shadow-md hover:bg-cyan-700 hover:bg-opacity-20 transition-all duration-200' + (role.length > 0 ? ' hidden ' : " animate-pulse ")} value={"O"}
                        onClick={() => { setRole("O"); }}
                        disabled={role.length > 0}
                    >
                        <p>O</p>
                    </button>
                    <i className={role.length > 0 ? "hidden" : "fa-solid fa-caret-up animate-bounce"}></i>
                </div>

            </div>

            {
                gameProgress === "pending" ?
                    (<div className={role.length > 0 ? 'flex flex-col justify-center items-center space-y-4' : 'hidden'}>
                        <p className={currentRole === role ? 'animate-bounce' : ''}>First player is {role}</p>
                        <p className={currentRole === otherRole ? 'animate-bounce' : ''}>Second player is {otherRole}</p>
                    </div>) :
                    gameProgress === "done" ?
                        (
                            <div className={'flex flex-col justify-center items-center space-y-4'}>
                                <p className={'animate-bounce'}> {currentRole} is winner</p>
                                <PlayAgainButton playAgain={playAgain} />
                            </div>
                        )
                        :
                        gameProgress === "tied" ?
                            (
                                <div className={'flex flex-col justify-center items-center space-y-4'}>
                                    <p className={'animate-pulse'}> Game is tied</p>
                                    <PlayAgainButton playAgain={playAgain} />
                                </div>
                            )
                            :
                            (
                                <div className={'flex flex-col justify-center items-center space-y-4'}>
                                    <p className={'animate-pulse text-red-500'}> Something happened.</p>
                                    <PlayAgainButton playAgain={playAgain} />
                                </div>
                            )
            }
        </>

    )
}

export default Select
