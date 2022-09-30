import { useEffect, useState } from "react";

const Test = () => {
    const [number, setNumber] = useState(null);
    // let number = 0;

    useEffect(() => {
        setTimeout(() => {
            setNumber(2);
        }, 2000);
    }, []);

    const changeNumber = () => setNumber(number + 1);

    if (number == null) return <div>Loading...</div>;

    return (
        <div>
            <p>mon numero = {number}</p>
            <button onClick={changeNumber}>change</button>
        </div>
    );
};

export default Test;
