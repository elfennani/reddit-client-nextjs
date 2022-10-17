import { createContext } from "react";

export default createContext<{ isOpened: boolean; toggle(): void }>({
    isOpened: false,
    toggle: () => {},
});
