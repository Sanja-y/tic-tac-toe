import React, { useEffect, useState } from 'react'

const Board = (props) => {

    const { rows, currentRole, role, otherRole, setCurrentRole, setRows, gameProgress, setGameProgress } = props
    const [selectedTacs, setSelectedTacs] = useState([]);
    const [noOfClicks, setNoOfClicks] = useState(1);


    const winningRows = [
        ["1a" + currentRole, "1b" + currentRole, "1c" + currentRole],
        ["2a" + currentRole, "2b" + currentRole, "2c" + currentRole],
        ["3a" + currentRole, "3b" + currentRole, "3c" + currentRole],
        ["1a" + currentRole, "2a" + currentRole, "3a" + currentRole],
        ["1b" + currentRole, "2b" + currentRole, "3b" + currentRole],
        ["1c" + currentRole, "2c" + currentRole, "3c" + currentRole],
        ["1a" + currentRole, "2b" + currentRole, "3c" + currentRole],
        ["1c" + currentRole, "2b" + currentRole, "3a" + currentRole],
    ];

    console.log(rows);

    function clearGame() {
        setSelectedTacs([]);
        setNoOfClicks(1);
    }

    useEffect(() => {

        const checkGameStatus = () => {
            if (gameProgress === "start") {
                setSelectedTacs([]);
                setNoOfClicks(1);
                setRows(["1a", "1b", "1c",
                    "2a", "2b", "2c",
                    "3a", "3b", "3c"])

            }
        }
        checkGameStatus();

    }, [gameProgress])

    const handleClick = (selectedTac, oldIdx) => {

        setNoOfClicks(prev => prev + 1);
        console.log("noOf", noOfClicks)

        // if(noOfClicks === 9) {
        //     console.log("Tied");
        // }

        let newItem = selectedTac + currentRole;
        console.log(newItem);

        setSelectedTacs((prevItems) => {
            const updatedTacs = [...prevItems, newItem];

            const isWinning = winningRows.some((winningRow) =>
                winningRow.every((item) => updatedTacs.includes(item)))

            if (isWinning) {
                console.log(`${currentRole} wins`)
                setGameProgress("done");
                return updatedTacs;
            }

            return updatedTacs;
        });

        setRows((prev) => {
            if (!prev) return []; // Handle undefined state
            return prev.map((oldItem, index) =>
                index === oldIdx ? newItem : oldItem
            );
        })

        let isWinning = winningRows.some((winningRow) =>
            winningRow.every((item) => [...selectedTacs, newItem].includes(item))
        );

        if (isWinning) {
            // clearGame();
            return; // Exit handleClick function if there's a winner
        }
        if (noOfClicks === 9 && !isWinning) {
            console.log("tied")
            setGameProgress("tied");
            // clearGame();
            return
        }
        console.log(selectedTacs, "selectedtacs")

        setCurrentRole((prev) =>
            prev === role ? otherRole : role
        );

    }

    return (
        <div className='text-center flex flex-col space-y-6'>
            <h1 className='text-xl '>Tic-Tac-Toe</h1>
            <ul className={currentRole ? 'grid grid-rows-3 grid-cols-3 gap-9' : 'hidden'}>
                {
                    rows.map((items, idx) => {
                        return (
                            <li key={idx}>
                                <button className='border-solid border-cyan-700 border-2 px-4 py-2 rounded-md shadow-md h-[4rem] w-[4rem] hover:bg-cyan-700 hover:bg-opacity-20 transition-all duration-200'
                                    onClick={(e) => { handleClick(e.currentTarget.name, idx) }} name={items} value={items}
                                    disabled={items.includes("X") || items.includes("O") || gameProgress === "done" || gameProgress === "tied" ? true : false}>
                                    <p>{items.includes("X") && "X" || items.includes("O") && "O"}</p>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Board
