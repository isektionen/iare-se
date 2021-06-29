import React, { Props, PropsWithChildren, ReactNode } from "react";
import { RecoilValue, useRecoilValueLoadable } from "recoil";

interface ValueProps<T> {
    children: (contents: T) => ReactNode;
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
