import React, { Props, PropsWithChildren, ReactNode } from "react";
import {
    RecoilState,
    RecoilValue,
    SetterOrUpdater,
    useRecoilStateLoadable,
    useRecoilValueLoadable,
    useSetRecoilState,
} from "recoil";

type children<T> = (contents: T) => ReactNode;

interface ValueProps<T> {
    children: children<T>;
    recoilValue: RecoilValue<T>;
    fallback: ReactNode;
}

/**
 *
 * @example
 * ```ts
 * <RecoilSSRValue
        recoilValue={T}
        fallback={<div>loading...</div>}
        >
            {({a,b}) => (
                <>
                    <p>{a}</p>
                    <p>{b}</p>
                </>
            )}
        </RecoilSSRValue>
    ```
 *
 */

export const RecoilSSRValue = <T,>({
    children,
    recoilValue,
    fallback,
}: ValueProps<T>) => {
    const data = useRecoilValueLoadable(recoilValue);
    switch (data.state) {
        case "hasValue":
            return <>{children(data.contents)}</>;
        case "loading":
            return <>{fallback}</>;
        case "hasError":
            throw data.contents;
    }
};

interface StateProps<T> {
    children: children<T>;
    recoilState: RecoilState<T>;
    fallback: ReactNode;
}

export const RecoilSSRState = <T,>({
    children,
    recoilState,
    fallback,
}: StateProps<T>) => {
    const [stateLoadable, setState] = useRecoilStateLoadable(recoilState);
    switch (stateLoadable.state) {
        case "hasValue":
            return <>{children(stateLoadable.contents)}</>;
        case "loading":
            return <>{fallback}</>;
        case "hasError":
            throw stateLoadable.contents;
    }
};

export const useRecoilSSRValue = <T,>(
    recoilValue: RecoilValue<T>
): [T | undefined, boolean, undefined | T] => {
    const data = useRecoilValueLoadable(recoilValue);
    switch (data.state) {
        case "hasValue":
            return [data.contents, false, undefined];
        case "loading":
            return [undefined, true, undefined];
        case "hasError":
            return [undefined, false, data.contents];
    }
};

export const useRecoilSSRState = <T,>(
    recoilState: RecoilState<T>
): [
    [T, SetterOrUpdater<T>] | [undefined, undefined],
    boolean,
    undefined | T
] => {
    const [data, setData] = useRecoilStateLoadable(recoilState);
    switch (data.state) {
        case "hasValue":
            return [[data.contents, setData], false, undefined];
        case "loading":
            return [[undefined, undefined], true, undefined];
        case "hasError":
            return [[undefined, undefined], false, data.contents];
    }
};

export const useSetRecoilSSRState = <T,>(
    recoilState: RecoilState<T>
): SetterOrUpdater<T> => {
    return useSetRecoilState(recoilState);
};
