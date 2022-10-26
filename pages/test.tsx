import { NextPage } from "next";

interface Props {}

const Test: NextPage<Props> = ({}) => {
    const dosomething = () => {
        let a = 0;
        let b = 1;
        let c = 1;

        // for (let i = 0; i <= 4; i++) {
        //     a++;
        // }

        let i = 0;
        do {
            a++;
            i++;
        } while (i <= 4);

        console.log(a);

        /**
         * som <- 0;
         * TantQue (i<=4) faire
         *     // *code* //
         *     i <- i+1;
         * FinTantQue
         */
    };
    return <button onClick={dosomething}>do something</button>;
};

export default Test;
