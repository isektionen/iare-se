import { useCallback, useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Committee } from "types/strapi";

const committeeState = atom<Committee | null>({
    key: "ATOM/COMMITTEE",
    default: null,
});

export const useHydrateCommittee = (committee: Committee) => {
    const [state, setState] = useRecoilState(committeeState);

    useEffect(() => {
        setState(committee);
    }, [committee, setState]);
};

export const useCommittee = () => {
    const state = useRecoilValue(committeeState);
    return state;
};
