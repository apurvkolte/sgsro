

import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} -  Best water purifier in Pune | copper ro water purifier | copper water purifier | best copper ro water purifier`;
        } else {
            document.title = ' Best water purifier in Pune | copper ro water purifier | copper water purifier | best copper ro water purifier';
        }
    }, [title]);

    return null;
};

export default useDocTitle;





