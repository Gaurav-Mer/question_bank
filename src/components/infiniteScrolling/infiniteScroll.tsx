import { useEffect, useRef, useState } from "react";

const InfiniteScroll = (ref: React.MutableRefObject<any>): boolean => {
    const [isVisible, setIsVisible] = useState(false);
    const observeRef = useRef<IntersectionObserver | null>(null);

    // useEffect to set up the IntersectionObserver
    useEffect(() => {
        if (ref.current) {
            observeRef.current = new IntersectionObserver(([entry]) => {
                if (entry.intersectionRatio !== 1) {
                    setIsVisible(entry.isIntersecting);
                }
            }, {
                threshold: 0.5,
            });

            return () => {
                // Cleanup code
                observeRef.current?.disconnect();
            };
        }
    }, [ref]);

    // useEffect to start observing the element
    useEffect(() => {
        if (ref.current && observeRef.current) {
            observeRef.current.observe(ref.current);
        }

        return () => {
            // Cleanup when the component unmounts
            if (observeRef.current) {
                observeRef.current.disconnect();
            }
        };
    }, [ref]);

    return isVisible; // Return the isVisible state
};

export default InfiniteScroll;
