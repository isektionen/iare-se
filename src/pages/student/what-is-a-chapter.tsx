import chapterModel from "models/chapter";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import _ from "underscore";
import { conformLocale } from "utils/lang";
import View from "views/WhatIsAChapter";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    locale = conformLocale(locale);
    const { chapter, error } = await chapterModel.getChapter(locale);
    const { board } = await chapterModel.getBoard(locale, chapter);
    const mdxSource = chapter?.content
        ? await serialize(chapter.content as string)
        : null;

    return {
        props: {
            error,
            mdx: mdxSource,
            title: chapter?.title ?? "",
            images: chapter?.images ?? [],
            board,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
