

import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} -  `;
        } else {
            document.title = '';
        }
    }, [title]);

    return null;
};

export default useDocTitle;





