import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type CallbackProps = ({
    prevProps,
    prevState,
}: {
    prevProps?: any;
    prevState?: any;
}) => void;

type SnapshotProps = {
    props?: any;
    state?: any;
};

const useMemory = (props: any, state: any) => {
    const ref = useRef({ props: null, state: null });

    const prevProps = ref.current.props;
    const prevState = ref.current.state;

    useEffect(() => {
        ref.current = { props, state };
    });
    return { prevProps, prevState };
};

export const useSnapshot = ({ props, state }: SnapshotProps) => {
    const { prevProps, prevState } = useMemory(props, state);

    const mounted = useRef(false);

    const [snapshot, setSnapshot] = useState<any>();

    return (callback: CallbackProps) => callback({ prevProps, prevState });
};
